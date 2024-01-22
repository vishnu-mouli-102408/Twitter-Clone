import Link from "next/link";
import ProfileImage from "./ProfileImage";
import { Tweet } from "./InfiniteTweetList";
import HeartButton from "./HeartButton";

function TweetCard({
  id,
  content,
  user,
  createdAt,
  likesCount,
  isLiked,
}: Tweet) {
  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });
  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton isLiked={isLiked} likesCount={likesCount} />
      </div>
    </li>
  );
}

export default TweetCard;
