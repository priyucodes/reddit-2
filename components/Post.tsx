import {
  ArrowDownOutline,
  ArrowUpOutline,
  BookmarkOutline,
  ChatAltOutline,
  DotsHorizontalOutline,
  GiftOutline,
  ShareOutline,
} from 'heroicons-react';
import Avatar from './Avatar';
import TimeAgo from 'react-timeago';
import Link from 'next/link';
import { Jelly } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries';
import { ADD_VOTE } from '../graphql/mutation';
type Props = {
  post: Post;
};
const Post = ({ post }: Props) => {
  const [vote, setVote] = useState<boolean>();
  const { data: session } = useSession();
  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVoteUsingPostId'],
  });
  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("❗❗❗You'll need to sign in to Vote!");
      return;
    }

    if (vote && isUpvote) return;

    // need to do vote===false as we defined it as undefined before
    if (vote === false && !isUpvote) return;

    console.log('Voting...', isUpvote);

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
  };
  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVoteUsingPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }
    return displayNumber;
  };
  useEffect(() => {
    const votes: Vote[] = data?.getVoteUsingPostId;

    // You can improve it by moving it to original query
    const vote = votes?.find(
      vote => vote.username === session?.user?.name
    )?.upvote;
    setVote(vote);
  }, [data, session]);
  // alternatively can add serverSide Rendering for better seo and performance
  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#ff4501" speed={0.5} />
      </div>
    );
  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpOutline
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && 'text-red-400 hover:text-gray-400'
            }`}
          />
          <p className={`text-black font-bold text-xs`}>{displayVotes(data)}</p>
          <ArrowDownOutline
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400  ${
              vote === false && 'text-blue-400 hover:text-gray-400'
            } `}
          />
        </div>

        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit?.topic}
                </span>
                {/* {' '} even this counts as a second child*/}
              </Link>
              • Posted by u/{post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body/Content */}
          <div className="py-4 ">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light ">{post.body}</p>
          </div>
          {/* Image */}
          {/* you can use img tag if you dont know the source where its cming from */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="" className="w-full object-contain" />
          {/* Footer */}

          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltOutline className="h-6 w-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftOutline className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareOutline className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkOutline className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalOutline className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Post;
