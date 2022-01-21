import admin from "firebase-admin";
console.log("INTIALIZING ADMIN");
const config = {
  type: "service_account",
  project_id: "ln-streamlabs-do",
  private_key_id: "70dd14c086d84fa6ab72cc0cd5f4406cbba536ab",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnyMcfgy6LDs48\nEv/mHFGYx10q62hY4l+tx5E2SQ15ucS3W7oRU0jrZXIuHeZK67/WPkbQuc9j4WXk\nmydiZM7LiWEJHUPBcEGYo0cZzm8C6TBxuklqAHWZhcXb3Zz7+6KXAIi8E2oir5GI\nNYpY3rtUmiFcaG4JmrhZ+fZZjmAkPGla5qmxKeSjl4kQF0WQj+dLwAd3Q/h7pbeS\nDb4Rodbjfdk2KHImTglH5j/3W9tAGxhekuAKW/MflrgEceA8eU4lzCG2UMxwtQRC\nFWdIgibjZIqCOQ3DAlW6dJW9frrs9Nei/LIs0sttOtHyP95pyh416+vk+LZFCLuI\nr6J9DleZAgMBAAECggEAD/XURDoAMcvmIBaOF1tzAxmW0hv7zHW3NIKO/IcZNC6w\nyODdu6NspLC9GmgvdYnEsTpyFc2RDe8dWFBOgCh29+tQ6tMo9HQLV1vTyf+GNZSN\nTkoyTNYvmZudKUek1N74Vc0gFKTzpApHqZlvODoyv27cdMv9yKXaOrvhfF4j5Npf\nSeDmbS+HbjS1mpWmZhknWuH6orR0/q+ZdY5ehD8RNnC0gmPFTtX1VauigeDwzXcF\ntsRD5l5UuF/f0bfDkL28WQinPLqQr0RpjC9JUGaEGi2hL8ehTKBuXEYYPc2b52wX\nSBoFDl48tL/ptVbiaknmBfeZxqAJcyEwQSloALKyMQKBgQDcVMjsTccnZDBigeKV\npj8X9HDTzVGu4T9Z9AGI5cgu6kQSdxab/i3IfJ/kp1C4jRnoO188SF9URmaYVuKu\nXi1JEkkTYsBjU3SmsG1sdZ5mNmJcS8dZ2W6r8sFbHaoeXOpt07/6FC+SBnRF3SKi\nj4A8nktZsMW6Y7RlJQlj63xEcQKBgQDC8kjdhcymSxhq6QzXD1aOQ01vb4dWbLoz\n6QHh1jj6dL1/T6VFEnqzU838GsJzDPFR0aN7UxAI/w4/fR7fTvB6jNTMeXGbDNo/\nBf43AZDzlRrN2pdAug0CPVSloxC58WDxXXoIK812AK4Asyq5Je561EodmlGAevIA\n46aGbUg5qQKBgQCNyUnbN1oXsVOpsKfdYbRsd/M7eX89KNqZynpKXIRsHHld4KD+\nFZ3kzL4gaMN7X+HyHnL02iXul7diBVeumhBOW6QHA5+Gy6fftN1V1ILwh8LYXjOV\nUGT15iwjtH1LOMPrlT6PcfoC4IBmjR3CutHtMHiQ6T706UCnbiQS1vGLIQKBgGg8\naF2aRzy7dojjp6vuVZenwOXOuoypgj5zXkBE7R5uAUzrZzExmk38h20/Wa1uxDG9\naC5u0WoeBp5H5pP8f3TnjHjwjqAbFS8Ro0YCHmE/3p8nPCytznreFD6knDLwL6ef\nFbr8wNVRs7hIFJX/BC7FCAQgGWgbVP7IuqeyEyZRAoGAZuyHBYhhP1Q4ZrRRlzWb\nuUO+J6Cx6J8yR1vjFitrmz0waLm60g1IFk+IzgGEzGoEmSjzV3v+iEsT7ZHZbvek\nu3svHmvQTACxKCM0W9VlSR01B9RKdhBM66LbAdum5MUpkzhboBta2UpRtch8/efV\n7QZiRHgFYwgPuZcUNhQS0oY=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-a4q47@ln-streamlabs-do.iam.gserviceaccount.com",
  client_id: "105559493402441493095",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-a4q47%40ln-streamlabs-do.iam.gserviceaccount.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: "https://ln-streamlabs-do-default-rtdb.firebaseio.com",
  });
}

const db = admin.database();

export default db;
