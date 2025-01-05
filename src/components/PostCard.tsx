"use client";

import getPosts from "@/actions/posts.actions";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

export default function PostCard({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) {
  const user = useUser();

  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLike, setHasLike] = useState(
    post.likes.some((like) => like.userId === dbUserId)
  );
  const [optimisisticLikes, setOptimisisticLikes] = useState(post._count.likes);

  const handleLike = async () => {
    try {
      setIsLiking(true);
      setHasLike((prev) => !prev);
      setOptimisisticLikes((prev) => prev + (hasLike ? -1 : 1));
      await toggleUserLike(post.id);
    } catch (error) {
      setOptimisisticLikes(post._count.likes);
      setHasLike(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  };
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div>
              <img
                src={post.author.image || "/avatar.png"}
                alt="profile pic"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.author.username}
              </p>
            </div>
          </div>
          <p>{post.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
function toggleUserLike(id: string) {
  throw new Error("Function not implemented.");
}
