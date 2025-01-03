"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/posts.actions";
import toast from "react-hot-toast";

export default function CreatePost() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imgUrl) return;

    setIsPosting(true);

    try {
      const result = await createPost(content, imgUrl);

      if (result.success) {
        setContent("");
        setImgUrl("");
        setShowImageUpload(false);

        toast.success("Post created successfully");
      }
    } catch (error) {
      console.log("Error in submitting post", error);
      toast.error("Error creating post");
    } finally {
      setIsPosting(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.imageUrl || "/avatar.png"} />
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              disabled={isPosting}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex justify-between space-x-2">
              <Button
                onClick={handleSubmit}
                type="button"
                variant={"ghost"}
                disabled={isPosting}
                size={"sm"}
                className="text-muted-foreground hover:text-primary"
              >
                <ImageIcon className="w-4 h-4" />
                Photo
              </Button>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isPosting || (!content.trim() && !imgUrl)}
              className="flex items-center"
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="siez-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
