import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const question = functions.https.onRequest((request, response) => {
  const {name, question} = request.body;
  const db = admin.database();
  const questions = db.ref("questions");

  questions.push({"name": name, "question": question}, (err) =>{
    if (err == null) {
      response.send("Question saved!");
    } else {
      functions.logger.error("Error saving question", err);
      response.status(500).send();
    }
  });
});
