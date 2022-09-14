import { gql } from '@apollo/client';
export const ADD_POST = gql`
  mutation MyMutation(
    $body: string!
    $image: string!
    $subreddit_id: string!
    $title: string!
    $username: string!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      image
      subreddit_id
      title
      username
    }
  }
`;
export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
