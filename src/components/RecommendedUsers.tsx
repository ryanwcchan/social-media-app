import { getRandomUsers } from "@/actions/user.actions";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";

export default async function RecommendedUsers() {
  const users = await getRandomUsers();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 justify-between"
            >
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.username}`}>
                  <Avatar className="w-20 h-20 border-2">
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>

                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium cursor-pointer"
                  >
                    @{user.name}
                  </Link>
                  <p className="text-muted-foreground">{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
