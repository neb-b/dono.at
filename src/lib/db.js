import { v4 as uuidv4 } from "uuid";
import { getDatabase } from "firebase-admin/database";
import jwt from "jsonwebtoken";
import db from "./firebase-admin";

const usersRef = db.ref("users");

const verifyAuthToken = (authToken, accessToken) => {
  if (!authToken) {
    return false;
  }

  let decodedAuthToken;
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    }

    decodedAuthToken = decoded;
  });

  return decodedAuthToken
    ? decodedAuthToken.access_token === accessToken
    : false;
};

export async function createOrUpdateUser({
  access_token,
  streamlabs: {
    username = "cheese__omelette",
    display_name,
    thumbnail,
    primary,
  },
  youtube,
}) {
  const userRef = db.ref(`users/${username}`);
  let youtubeId;
  if (primary === "youtube") {
    youtubeId = youtube.id;
  }

  try {
    let dbUserSnapshot = await userRef.once("value");
    const dbUser = dbUserSnapshot.val();
    const newUser = dbUser === null;
    const userSetPayload = newUser
      ? {
          access_token,
          thumbnail,
          display_name,
          tip_min: 0.1,
          primary,
          ...(youtubeId ? { youtube_id: youtubeId } : {}),
        }
      : {
          ...dbUser,
          access_token,
        };

    await userRef.set(userSetPayload, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserData(
  username,
  authToken,
  { strikeUsername, tipAmount, profileColor }
) {
  return new Promise(async (resolve, reject) => {
    const userRef = db.ref(`users/${username}`);

    try {
      const dbUserSnapShot = await userRef.once("value");
      const dbUser = dbUserSnapShot.val();

      if (!dbUser) {
        reject("User not found");
      }

      const { access_token, strike_username, ...user } = dbUser;

      const isLoggedIn = verifyAuthToken(authToken, access_token);

      if (!isLoggedIn) {
        reject("User not authorized");
      }

      const newUser = {
        ...dbUser,
        tip_min: tipAmount,
        strike_username: strikeUsername,
        color: profileColor,
      };

      await userRef.set(newUser, (err) => {
        if (err) {
          throw err;
        }
      });

      newUser.isLoggedIn = true;

      resolve(newUser);
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
}

export async function getProfileData(username, authToken) {
  return new Promise(async (resolve, reject) => {
    const userRef = db.ref(`users/${username}`);

    try {
      const dbUserSnapShot = await userRef.once("value");
      const dbUser = dbUserSnapShot.val();

      if (dbUser) {
        const { access_token, ...user } = dbUser;

        const isLoggedIn = verifyAuthToken(authToken, access_token);
        user.isLoggedIn = isLoggedIn;

        resolve(user);
      } else {
        reject("user_not_found");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function getUser(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = db.ref(`users/${username}`);
      const dbUserSnapShot = await userRef.once("value");
      const dbUser = dbUserSnapShot.val();

      resolve(dbUser);
    } catch (error) {
      reject(error);
    }
  });
}

export async function logTx({ amount, username, message, date }) {
  return new Promise(async (resolve, reject) => {
    try {
      const txRef = db.ref(`txs/${uuidv4()}`);
      await txRef.set({
        amount,
        message,
        date,
        username,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
