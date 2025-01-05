import getPosts from "@/actions/posts.actions";
import { getDbUserId } from "@/actions/user.actions";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import RecommendedUsers from "@/components/RecommendedUsers";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  console.log({ posts });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6 space">
        {user ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 hidden lg:block sticky top-20">
        <RecommendedUsers />
      </div>
    </div>
  );
}
