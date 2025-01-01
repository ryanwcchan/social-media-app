import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import UnauthenticatedSidebar from "./UnauthenticatedSidebar";
import { getUserByClerkId } from "@/actions/user.actions";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";

export default async function Sidebar() {
  const authUser = await currentUser();

  if (!authUser) return <UnauthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  console.log({ user });
  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link href={`/profile/${user.username}`}>
              <Avatar className="w-20 h-20 border-2">
                <AvatarImage src={user.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
            </Link>

            <p className="mt-3 text-sm text-muted-foreground">
              {user.bio ? user.bio : "No bio"}
            </p>

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between px-6">
                <div>
                  <div className="font-medium">{user._count.following}</div>
                  <div className="text-xs text-muted-foreground">Following</div>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <div className="font-medium">{user._count.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {user.location ? user.location : "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="mr-2 h-4 w-4 shrink-0" />
                {user.website ? (
                  <a
                    href={user.website}
                    target="_blank"
                    className="hover:underline truncate"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
