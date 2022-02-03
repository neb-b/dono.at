import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import db from "./firebase";

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

export const getDataFromAuthToken = (authToken) => {
  if (!authToken) {
    return;
  }

  let decodedAuthToken;
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    }

    decodedAuthToken = decoded;
  });

  return decodedAuthToken;
};

export async function createOrUpdateUser({
  access_token,
  streamlabs: { username, display_name, thumbnail, primary },
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
          date_joined: Date.now(),
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
  { strikeUsername, tipAmount, profileColor, coverUrl }
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
        ...(tipAmount ? { tip_min: tipAmount } : {}),
        ...(strikeUsername ? { strike_username: strikeUsername } : {}),
        ...(profileColor ? { color: profileColor } : {}),
        ...(coverUrl ? { cover_url: coverUrl } : {}),
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

export async function getUserFromAuthToken(authToken) {
  return new Promise(async (resolve, reject) => {
    try {
      const { username } = getDataFromAuthToken(authToken);
      const userRef = db.ref(`users/${username}`);
      const dbUserSnapShot = await userRef.once("value");
      const dbUser = dbUserSnapShot.val();

      if (dbUser) {
        resolve({ ...dbUser, username });
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

export async function logTx({ amount, username, message, date, from }) {
  return new Promise(async (resolve, reject) => {
    try {
      const txRef = db.ref(`txs/${uuidv4()}`);
      await txRef.set({
        amount,
        message,
        date,
        username,
        from,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export async function getStats() {
  return new Promise(async (resolve, reject) => {
    try {
      const txsRef = db.ref(`txs`);
      const txsSnapShot = await txsRef.once("value");
      const txsMap = txsSnapShot.val();

      const usersRef = db.ref(`users`);
      const usersSnapShot = await usersRef.once("value");
      const usersMap = usersSnapShot.val();
      let users = [];
      Object.keys(usersMap).forEach((key) => {
        const user = { username: key, ...usersMap[key] };
        users.push(user);
      });

      users = users.sort((a, b) => b.date_joined - a.date_joined);

      let txs = [];
      Object.keys(txsMap).forEach((key) => {
        const tx = txsMap[key];
        txs.push({ ...tx, id: key });
      });

      const sortedTxs = txs.sort((a, b) => b.date - a.date);
      const totalAmount = sortedTxs.reduce((acc, tx) => {
        return acc + Number(tx.amount);
      }, 0);

      const data = {
        txs: sortedTxs,
        totalTxs: txs.length,
        totalAmount: totalAmount.toFixed(2),
        users,
      };

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
