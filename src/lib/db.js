import { v4 as uuidv4 } from "uuid";
import { getDatabase } from "firebase-admin/database";
import db from "./firebase-admin";

const usersRef = db.ref("users");
const authRef = db.ref("auth");

// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function (snapshot) {
//   console.log(snapshot.val());
// });
//
//
// User
//
//
export async function createOrUpdateUser({
  access_token,
  username,
  display_name,
  thumbnail,
}) {
  const userRef = db.ref(`users/${username}`);

  try {
    usersRef.set(
      {
        [username]: {
          access_token,
          thumbnail,
          display_name,
        },
      },
      (error) => {
        if (error) {
          console.log("error?", error);
        }
      }
    );
  } catch (error) {
    console.log("here?\n\n", error, "\n\n");
  }
}
export async function addAuthToken({ authToken, username }) {
  const authRef = db.ref(`auth/${username}`);

  try {
    await authRef.set(
      {
        [username]: {
          auth_token: authToken,
        },
      },
      (error) => {
        if (error) {
          console.log("error?", error);
        }
      }
    );
  } catch (error) {
    console.log("here?\n\n", error, "\n\n");
  }
}

export async function getProfileData(username) {
  return new Promise((resolve, reject) => {
    try {
      const userRef = db.ref(`users`);
      userRef.on(
        "value",
        (snapshot) => {
          //
          // How to get the single item from the db instead of all of them
          //
          const users = snapshot.val();
          const data = users.cheese__omelette;

          if (data) {
            const { access_token, strike_username, ...user } = data;
            resolve(user);
          } else {
            reject();
          }
        },
        (error) => {
          console.log("The read failed: " + error.name);
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export async function getUser(username) {
  return new Promise((resolve, reject) => {
    try {
      const userRef = db.ref(`users`);
      userRef.on(
        "value",
        (snapshot) => {
          //
          // How to get the single item from the db instead of all of them
          //
          const users = snapshot.val();
          const data = users.cheese__omelette;

          if (data) {
            resolve(data);
          } else {
            reject();
          }
        },
        (error) => {
          console.log("The read failed: " + error.name);
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
