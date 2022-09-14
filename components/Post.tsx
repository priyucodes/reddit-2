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
type Props = {
  post: Post;
};
const Post = ({ post }: Props) => {
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
          <ArrowUpOutline className="voteButtons hover:text-red-400" />
          <p className="text-black font-bold text-xs">0</p>
          <ArrowDownOutline className="voteButtons hover:text-blue-400" />
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
