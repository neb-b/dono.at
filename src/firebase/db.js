import { v4 as uuidv4 } from "uuid";
import { getDatabase } from "firebase-admin/database";
import db from "./admin";

const usersRef = db.ref("users");

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

// export function getUser(userID: string): Promise<User> {
//   return db(`users/${userID}`)
//     .once("value")
//     .then(function (snapshot) {
//       const user = snapshot.val();
//       if (user) {
//         return { ...user, id: userID };
//       }

//       return createUser(userID);
//     });
// }

// //
// //
// // Games
// //
// //
// export function createGame(userID: string, name: string): Promise<Game> {
//   const gameID = uuidv4();

//   const game: GameLessID = {
//     creator_id: userID,
//     join_id: gameID.slice(0, 4),
//     score_events: [],
//     players: [
//       {
//         id: userID,
//         name,
//       },
//     ],
//   };

//   return new Promise((resolve, reject) => {
//     db(`games/${gameID}`).set(game, (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve({ ...game, id: gameID });
//       }
//     });
//   });
// }

// export function updateGameScore(
//   gameID: string,
//   userID: string,
//   hitValue: number
// ) {
//   return new Promise((resolve, reject) => {
//     db(`games/${gameID}`)
//       .once("value")
//       .then((snapshot) => {
//         const game = snapshot.val();
//         let newGame: Game = { ...game };

//         if (!newGame.score_events) {
//           newGame.score_events = [];
//         }

//         newGame.score_events.push({
//           user_id: userID,
//           hit_value: hitValue,
//         });
//         db("games/" + gameID).set(newGame, (error) => {
//           if (error) {
//             console.error("error", error);
//           }
//         });
//       });
//   });
// }

// export function getGame(
//   gameID: string,
//   userID: string,
//   onUpdate: any
// ): Promise<Game> {
//   return new Promise((resolve, reject) => {
//     db(`/games/${gameID}`).on("value", (snapshot) => {
//       const game = snapshot.val();
//       onUpdate(game);
//     });
//   });
// }

// export function getGameId(join_id: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     db("games")
//       .orderByChild("join_id")
//       .equalTo(join_id)
//       .on("value", function (snapshot) {
//         snapshot.forEach(function (data) {
//           const id = data.key;
//           if (!id) {
//             reject("Game not found.");
//           } else {
//             resolve(id);
//           }
//         });
//       });
//   });
// }

// export function addPlayerToGame(gameID, userID, name) {
//   db(`games/${gameID}`)
//     .once("value")
//     .then((snapshot) => {
//       const game = snapshot.val();
//       const newGame = {
//         ...game,
//         players: game.players.concat({
//           id: userID,
//           name,
//         }),
//       };
//       db("games/" + gameID).update(newGame, (error) => {
//         if (error) {
//           console.error("error", error);
//         }
//       });
//     });
// }

// export function gameReset(gameID, userID) {
//   return new Promise((resolve, reject) => {
//     db(`games/${gameID}`)
//       .once("value")
//       .then((snapshot) => {
//         const game = snapshot.val();
//         const newGame = { ...game };
//         newGame.score_events = [];

//         db("games/" + gameID).set(newGame, (error) => {
//           if (error) {
//             console.error("error", error);
//           }
//         });
//       });
//   });
// }
// export function gameUndoLastMove(gameID) {
//   return new Promise((resolve, reject) => {
//     db(`games/${gameID}`)
//       .once("value")
//       .then((snapshot) => {
//         const game = snapshot.val();
//         const newGame = { ...game };
//         let newScoreEvents = newGame.score_events;
//         newScoreEvents.pop();
//         newGame.score_events = newScoreEvents;

//         db("games/" + gameID).set(newGame, (error) => {
//           if (error) {
//             console.error("error", error);
//           }
//         });
//       });
//   });
// }

// export function newGame(gameID) {
//   return new Promise((resolve, reject) => {
//     db("games/" + gameID)
//       .once("value")
//       .then((snapshot) => {
//         const game = snapshot.val();
//         const newGame = { ...game };
//         newGame.score_events = [];

//         db("games/" + gameID).set(newGame, (error) => {
//           if (error) {
//             console.error("error", error);
//           }
//         });
//       });
//   });
// }
