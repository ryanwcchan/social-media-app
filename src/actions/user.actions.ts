"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser(); // POST

    if (!userId || !user) return;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;

    // Create user
    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        posts: true,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in getUserByClerkId", error);
  }
}

export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);

  if (!user || !user.id) throw new Error("User not found");

  return user.id;
}

export async function getRandomUsers() {
  try {
    const userId = await getDbUserId();

    if (!userId) return [];

    const randomUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
        AND: {
          NOT: {
            followers: {
              some: {
                followerId: userId,
              },
            },
          },
        },
      },
      take: 5,
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    return randomUsers;
  } catch (error) {
    console.log("Error in getRandomUsers", error);
    return [];
  }
}

export async function toggleFollowUser(targetUserId: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    if (userId === targetUserId) {
      throw new Error("You can't follow yourself");
    }

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      // unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      });
    } else {
      // follow
      await prisma.$transaction([
        prisma.follows.create({
          data: {
            followerId: userId,
            followingId: targetUserId,
          },
        }),

        prisma.notification.create({
          data: {
            type: "FOLLOW",
            userId: targetUserId, // User being followed
            creatorId: userId, // User who is following
          },
        }),
      ]);
    }

    revalidatePath(`/`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to toggle follow on user" };
  }
}
