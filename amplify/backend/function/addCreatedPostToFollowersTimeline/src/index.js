/* Amplify Params - DO NOT EDIT
	API_VOICES_GRAPHQLAPIENDPOINTOUTPUT
	API_VOICES_GRAPHQLAPIIDOUTPUT
	API_VOICES_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      type
      id
      userId
      title
      text
      photos
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;

const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $followeeId: ID
    $followerId: ModelIDKeyConditionInput
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollowRelationships(
      followeeId: $followeeId
      followerId: $followerId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        followeeId
        followerId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;

const createPersonalTimeline = /* GraphQL */ `
  mutation CreatePersonalTimeline(
    $input: CreateTimelineInput!
    $condition: ModelPersonalTimelineConditionInput
  ) {
    createPersonalTimeline(input: $input, condition: $condition) {
      id
      userId
      createdAt
      postId
      _version
      _deleted
      _lastChangedAt
      updatedAt
      post {
        type
        id
        userId
        title
        text
        photos
        createdAt
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
    }
  }
`;

// hopefull id is automatically generated   CHECK
const createPersonalTimelineForUser = async ({ follower, post }) => {
  const timelineInput = {
    mutation: gql(createPersonalTimeline),
    variables: {
      input: {
        userId: follower.followerId,
        postId: post.id,
        post: post,
      },
    },
  };
  const res = await graphqlClient.mutate(timelineInput);
  console.log(res);
};

exports.handler = async (event) => {
  // set up authentication
  //   if (
  //     "AWS_EXECUTION_ENV" in process.env &&
  //     process.env.AWS_EXECUTION_ENV.startsWith("AWS_Lambda_")
  //   ) {
  //for cloud env
  // env = process.env;
  // graphql_auth = {
  //   type: "AWS_IAM",
  //   credentials: {
  //     accessKeyId: env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  //     sessionToken: env.AWS_SESSION_TOKEN,
  //   },
  // };
  //   } else {
  //     // for local mock
  //     env = {
  //       API_GRAPHQLAPIENDPOINTOUTPUT: "http://192.168.1.2:20002/graphql",
  //       REGION: "us-east-1",
  //     };
  //     graphql_auth = {
  //       type: "AWS_IAM",
  //       credentials: {
  //         accessKeyId: "mock",
  //         secretAccessKey: "mock",
  //         sessionToken: "mock",
  //       },
  //     };
  //   }

  // GRAPHQLCLIENT

  //   let graphqlClient;
  //   if (!graphqlClient) {
  //     graphqlClient = new AWSAppSyncClient({
  //       url: env.API_BOYAKIGQL_GRAPHQLAPIENDPOINTOUTPUT,
  //       region: "us-east-1"",
  //       auth: graphql_auth,
  //       disableOffline: true,
  //     });
  //   }

  // const awsmobile = {
  //     "aws_project_region": "us-east-1",
  //     "aws_appsync_graphqlEndpoint": "http://10.8.3.101:20002/graphql",
  //     "aws_appsync_region": "us-east-1",
  //     "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  //     "aws_appsync_apiKey": "da2-fakeApiId123456",
  //     "aws_appsync_dangerously_connect_to_http_endpoint_for_testing": true,
  //     "aws_cognito_identity_pool_id": "us-east-1:869122d1-253d-4e45-8454-be97787e7472",
  //     "aws_cognito_region": "us-east-1",
  //     "aws_user_pools_id": "us-east-1_TWLGoPmTz",
  //     "aws_user_pools_web_client_id": "7t0n5r1rhd1jso0ttj7hl1e732",
  //     "oauth": {},
  //     "aws_user_files_s3_bucket": "voicesstoragebucket83555-dev",
  //     "aws_user_files_s3_bucket_region": "us-east-1"
  // };

  console.log(event);
  let postId = event.arguments.postId;
  console.log("postId is", postId);

  // Step 0: Get Post
  const getPostInput = {
    id: postId,
  };
  const post = await graphqlClient.query({
    query: gqp(getPost),
    fetchPolicy: "network-only",
    variables: getPostInput,
  });
  console.log("post is", post);

  // Step 1: Get List of Followers
  const queryInput = {
    followeeId: event.identity.username, // event.identity is Cognito user who called the function
    limit: 100000,
  };
  console.log("queryInput", queryInput);
  const listFollowRelationshipsResult = await graphqlClient.query({
    query: gql(listFollowRelationships),
    fetchPolicy: "network-only",
    variables: queryInput,
  });
  console.log(
    "Result of lisFollowersRelationships",
    listFollowRelationshipsResult
  );
  const followers =
    listFollowRelationshipsResult.data.listFollowRelationships.items;
  console.log("Followers are:", followers);

  // add post author to followers so post is displayed on their timeline
  followers.push({
    followerId: post.userId,
  });
  console.log("added owner", post.userId, "to followers");

  // Step 2: Add Post to each Follower's Timeline
  const results = await Promise.all(
    followers.map((follower) =>
      createPersonalTimelineForUser({ follower: follower, post: post })
    )
  );
  console.log("Result of creating timeline for each follower", results);

  return Post;
};

// COPIED CODE

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiGraphqlapiGraphQLAPIIdOutput = process.env.API_BOYAKIGQL_GRAPHQLAPIIDOUTPUT
var apiGraphqlapiGraphQLAPIEndpointOutput = process.env.API_BOYAKIGQL_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

// const AWSAppSyncClient = require("aws-appsync").default;
// const gql = require("graphql-tag");
// global.fetch = require("node-fetch");

// let graphqlClient;

// exports.handler = async (event) => {
//   let env;
//   let graphql_auth;

//   if (
//     "AWS_EXECUTION_ENV" in process.env &&
//     process.env.AWS_EXECUTION_ENV.startsWith("AWS_Lambda_")
//   ) {
//     //for cloud env
//     env = process.env;
//     graphql_auth = {
//       type: "AWS_IAM",
//       credentials: {
//         accessKeyId: env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
//         sessionToken: env.AWS_SESSION_TOKEN,
//       },
//     };
//   } else {
//     // for local mock
//     env = {
//       API_GRAPHQLAPIENDPOINTOUTPUT: "http://192.168.1.2:20002/graphql",
//       REGION: "us-east-1",
//     };
//     graphql_auth = {
//       type: "AWS_IAM",
//       credentials: {
//         accessKeyId: "mock",
//         secretAccessKey: "mock",
//         sessionToken: "mock",
//       },
//     };
//   }
//   console.log(env);
//   console.log(graphql_auth);

//   if (!graphqlClient) {
//     graphqlClient = new AWSAppSyncClient({
//       url: env.API_BOYAKIGQL_GRAPHQLAPIENDPOINTOUTPUT,
//       region: env.REGION,
//       auth: graphql_auth,
//       disableOffline: true,
//     });
//   }

//   //post to the origin
//   const postInput = {
//     mutation: gql(createPost),
//     variables: {
//       input: {
//         type: "post",
//         timestamp: Math.floor(Date.now() / 1000),
//         owner: event.identity.username,
//         content: event.arguments.content,
//       },
//     },
//   };
//   const res = await graphqlClient.mutate(postInput);
//   console.log(res);
//   const post = res.data.createPost;

//   // list followers
//   const queryInput = {
//     followeeId: event.identity.username,
//     limit: 100000,
//   };
//   console.log(queryInput);
//   const listFollowRelationshipsResult = await graphqlClient.query({
//     query: gql(listFollowRelationships),
//     fetchPolicy: "network-only",
//     variables: queryInput,
//   });
//   console.log(listFollowRelationshipsResult);
//   const followers =
//     listFollowRelationshipsResult.data.listFollowRelationships.items;
//   console.log(followers);

//   //post to timeline
//   followers.push({
//     followerId: post.owner,
//   });
//   const results = await Promise.all(
//     followers.map((follower) =>
//       createTimelineForAUser({ follower: follower, post: post })
//     )
//   );
//   console.log(results);

//   return post;
// };

// const createTimelineForAUser = async ({ follower, post }) => {
//   const timelineInput = {
//     mutation: gql(createTimeline),
//     variables: {
//       input: {
//         userId: follower.followerId,
//         timestamp: post.timestamp,
//         postId: post.id,
//       },
//     },
//   };
//   const res = await graphqlClient.mutate(timelineInput);
//   console.log(res);
// };

// const createPost = /* GraphQL */ `
//   mutation CreatePost(
//     $input: CreatePostInput!
//     $condition: ModelPostConditionInput
//   ) {
//     createPost(input: $input, condition: $condition) {
//       type
//       id
//       content
//       owner
//       timestamp
//     }
//   }
// `;

// const createTimeline = /* GraphQL */ `
//   mutation CreateTimeline(
//     $input: CreateTimelineInput!
//     $condition: ModelTimelineConditionInput
//   ) {
//     createTimeline(input: $input, condition: $condition) {
//       userId
//       timestamp
//       postId
//       post {
//         id
//         content
//         type
//         owner
//         timestamp
//       }
//     }
//   }
// `;
