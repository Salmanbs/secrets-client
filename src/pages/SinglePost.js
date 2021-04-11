import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

var randomImage = new Array();  
randomImage[0] = "https://semantic-ui.com/images/avatar2/large/elyse.png"; 
randomImage[1] = "https://semantic-ui.com/images/avatar2/large/kristy.png";
randomImage[2] = "https://semantic-ui.com/images/avatar2/large/lena.png";
randomImage[3] = "https://semantic-ui.com/images/avatar2/large/lindsay.png";
randomImage[4] = "https://semantic-ui.com/images/avatar2/large/mark.png";
randomImage[5] = "https://semantic-ui.com/images/avatar2/large/matthew.png";
randomImage[6] = "https://semantic-ui.com/images/avatar2/large/molly.png";
randomImage[7] = "https://semantic-ui.com/images/avatar2/large/patrick.png";
randomImage[8] = "https://semantic-ui.com/images/avatar2/large/rachel.png"; 
randomImage[9] = "https://semantic-ui.com/images/avatar/large/ade.jpg"; 
randomImage[10] = "https://semantic-ui.com/images/avatar/large/chris.jpg"; 
randomImage[11] = "https://semantic-ui.com/images/avatar/large/christian.jpg"; 
randomImage[12] = "https://semantic-ui.com/images/avatar/large/daniel.jpg"; 
randomImage[13] = "https://semantic-ui.com/images/avatar/large/elliot.jpg"; 
randomImage[14] = "https://semantic-ui.com/images/avatar/large/helen.jpg";
randomImage[15] = "https://semantic-ui.com/images/avatar/large/jenny.jpg"; 
randomImage[16] = "https://semantic-ui.com/images/avatar/large/joe.jpg"; 
randomImage[17] = "https://semantic-ui.com/images/avatar/large/justen.jpg"; 
randomImage[18] = "https://semantic-ui.com/images/avatar/large/laura.jpg"; 
randomImage[19] = "https://semantic-ui.com/images/avatar/large/matt.jpg"; 
randomImage[20] = "https://semantic-ui.com/images/avatar/large/nan.jpg"; 
randomImage[21] = "https://semantic-ui.com/images/avatar/large/steve.jpg"; 
randomImage[22] = "https://semantic-ui.com/images/avatar/large/stevie.jpg"; 
randomImage[23] = "https://semantic-ui.com/images/avatar/large/veronika.jpg"; 

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      secretname,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;

    var profile_pic = Math.floor(Math.random()*randomImage.length); 
    
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src={randomImage[profile_pic]}
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{secretname}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <MyPopup content="Comment on post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button color="violet">
                      <Icon name="comments" />
                    </Button>
                    <Label color="violet" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button violet"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.secretname}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
        secretname
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
