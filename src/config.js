const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-17bjcsdlxu27n"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://1h91vrguq9.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_soqX497YT",
    APP_CLIENT_ID: "3lufce9gmpjmr34ukbjdbteu2o",
    IDENTITY_POOL_ID: "us-east-1:7f12d7d5-e5b6-45a5-9368-5094d6573b14"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-12chu1a8pmvna"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://zugjb85vai.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_odVe8y4ha",
    APP_CLIENT_ID: "7u4rb2uq761qk1eu12mprj30d1",
    IDENTITY_POOL_ID: "us-east-1:0ba4a198-3d63-4f9e-b607-b5d46323ebda"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
