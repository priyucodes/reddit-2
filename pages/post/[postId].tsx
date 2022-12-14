import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Post from '../../components/Post';
import { toast } from 'react-hot-toast';
import { ADD_COMMENT } from '../../graphql/mutation';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago';
import { Jelly, JellyTriangle } from '@uiball/loaders';
type FormData = {
  comment: string;
};
const PostPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const { data: session } = useSession();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
  });
  const { loading, error, data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    console.log(data); // Form Data

    const notifs = toast.loading('Posting your comment...');

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });
    setValue('comment', '');

    toast.success('Commented Successfully!', {
      id: notifs,
    });
  };
  const post: Post = data?.getPostListByPostId;

  // ONLY this loader will show as we returned this component before reaching to Post component
  // if (loading) {
  //   return (
  //     <div className="flex w-full items-center justify-center p-10 text-xl">
  //       <JellyTriangle size={50} color="#ff4501" speed={0.5} />
  //     </div>
  //   );
  // }
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      {loading ? (
        <div className="flex w-full items-center justify-center p-10 text-xl">
          <JellyTriangle size={50} color="#ff4501" speed={0.5} />
        </div>
      ) : (
        <>
          <div className="-mt-1 rounded-b-md border-t-0 border-gray-300 bg-white p-5 pl-16">
            <p className="text-sm">
              Comment as{' '}
              <span className="text-red-500">{session?.user?.name}</span>
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2"
            >
              <textarea
                {...register('comment')}
                disabled={!session}
                className="h-24 rounded-md border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                placeholder={
                  session
                    ? 'What are your thoughts?'
                    : 'Please Sign in to comment'
                }
              />
              <button
                disabled={!session}
                type="submit"
                className="rounded-full bg-red-500 font-semibold p-3 text-white disabled:bg-gray-300 disabled:text-red-500"
              >
                Comment
              </button>
            </form>
          </div>

          <div className="-my-5 rounded-b-md border-t-0 border-gray-300 bg-white py-5 px-10">
            <hr className="py-2" />

            {post?.comments.map(comment => (
              <div
                key={comment.id}
                className="relative flex items-center space-x-2 space-y-5"
              >
                <hr className="absolute top-10 h-16 border left-7 z-0" />
                <div className="z-50">
                  <Avatar seed={comment.username} />
                </div>

                <div className="flex flex-col">
                  <p className="py-2 text-xs text-gray-400">
                    <span className="font-semibold text-gray-600">
                      {comment.username}
                    </span>{' '}
                    <TimeAgo date={comment.created_at} />
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default PostPage;
