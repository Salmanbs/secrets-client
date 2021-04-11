import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      secretname
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        secretname
        createdAt
        body
      }
    }
  }
`;
