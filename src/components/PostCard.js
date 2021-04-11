import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

var randomImage = [];  
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



function PostCard({
  post: { body, createdAt, id, username,secretname, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);
  var profile_pic = Math.floor(Math.random()*randomImage.length); 
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={randomImage[profile_pic]}
        />
        <Card.Header>{secretname}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="violet">
              <Icon name="comments" />
            </Button>
            <Label color="violet" basic pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
