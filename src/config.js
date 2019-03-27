export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "mynotes-react-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://tm2p3h0upi.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_cDxg2g1Ln",
    APP_CLIENT_ID: "1c3m4p1itate0srbg69slnmnre",
    IDENTITY_POOL_ID: "us-east-1:c6052f06-2289-4176-87a5-164ff014d1c7"
  }
};
