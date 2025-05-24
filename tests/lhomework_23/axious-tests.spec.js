import axios from 'axios';
import { expect } from 'chai';

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function runTests() {

  console.log('Sending GET request to /posts');
  const getPost = await axios.get(`${BASE_URL}/posts`);
  console.log(`Received response for /posts/1 with status ${getPost.status}`);
  expect(getPost.status).to.equal(200);
  expect(getPost.data).to.be.an('array');
  expect(getPost.data.length).to.be.greaterThan(0);

  console.log('Sending GET request to /users/1');
  const getUser = await axios.get(`${BASE_URL}/users/1`);
  console.log(`Received response for /users/1 with status ${getUser.status}`);
  expect(getUser.status).to.equal(200);
  expect(getUser.data).to.have.property('username');

  const requestBody = {
    title: 'title',
    body: 'body',
    userId: 1,
  };
  console.log('Sending POST request to /posts with data:', requestBody);
  const postPost = await axios.post(`${BASE_URL}/posts`, requestBody);
  console.log(`Received response for POST /posts with status ${postPost.status}`);
  expect(postPost.status).to.equal(201);
  expect(postPost.data).to.include(requestBody);


  console.log('Sending GET request to /comments?postId=1');
  const getComments = await axios.get(`${BASE_URL}/comments`, {
    params: { postId: 1 },
  });
  console.log(`Received response for /comments?postId=1 with status ${getComments.status}`);
  expect(getComments.status).to.equal(200);
  expect(getComments.data).to.be.an('array');
  expect(getComments.data[0]).to.have.property('postId', 1);

  const commentBody = {
    name: 'Name',
    email: 'test@example.com',
    body: 'Test comment',
    postId: 1,
  };
  console.log('Sending POST request to /comments with data:', commentBody);
  const postComment = await axios.post(`${BASE_URL}/comments`, commentBody);
  console.log(`Received response for POST /comments with status ${postComment.status}`);
  expect(postComment.status).to.equal(201);
  expect(postComment.data).to.include(commentBody);

}

runTests().catch(error => {
  console.error('Error:', error.message);
});