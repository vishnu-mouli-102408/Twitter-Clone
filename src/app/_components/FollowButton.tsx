import { getServerAuthSession } from "~/server/auth";
import CustomButton from "./CustomButton";

export default async function FollowButton({
  userId,
  isFollowing,
  isLoading,
  onClick,
}: {
  userId: string;
  isFollowing: boolean;
  isLoading: boolean;
  onClick: () => void;
}) {
  const session = await getServerAuthSession();
  console.log("SESSION", session);

  if (!session || session.user.id === userId) {
    return null;
  }

  return (
    <CustomButton
      disabled={isLoading}
      onClick={onClick}
      small
      gray={isFollowing}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </CustomButton>
  );
}
