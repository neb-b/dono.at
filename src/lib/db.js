import { v4 as uuidv4 } from "uuid";
import { getDatabase } from "firebase-admin/database";
import jwt from "jsonwebtoken";
import db from "./firebase-admin";

const usersRef = db.ref("users");
const authRef = db.ref("auth");

export async function createOrUpdateUser({
  access_token,
  username = "cheese__omelette",
  display_name,
  thumbnail,
}) {
  const userRef = db.ref(`users/${username}`);

  try {
    await usersRef.set(
      {
        [username]: {
          access_token,
          thumbnail,
          display_name,
        },
      },
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    await userRef.on(
      "value",
      (snapshot) => {
        console.log("snapshot", snapshot.val());
        const user = snapshot.val();

        if (user && !user.tip_min) {
          await usersRef.set(
            {
              [username]: {
                tip_min: 0.1,
              },
            },
            (err) => {
              if (err) {
                throw err;
              }
            }
          );
        }
      },
      (err) => {
        throw err;
      }
    );
  } catch (error) {
    console.log("here?\n\n", error, "\n\n");
  }
}
export async function addAuthToken({ authToken, username }) {
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

export async function getProfileData(username, authToken) {
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
          const data = users[username];

          if (data) {
            const { access_token, strike_username, ...user } = data;

            let decodedAuthToken;
            if (authToken) {
              jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                  throw err;
                }

                decodedAuthToken = decoded;
                console.log("decoded", decoded);
              });

              if (decodedAuthToken.access_token === access_token) {
                user.isLoggedIn = true;
              } else {
                user.isLoggedIn = false;
              }
            }

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
