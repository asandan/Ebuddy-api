import admin from 'firebase-admin';
import firebase from "firebase/app";
import "firebase/auth";
import * as service from "../ebuddy-426311-88ddef1e2d32.json";

const firebaseConfig = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(service as admin.ServiceAccount),
      databaseURL: process.env.DATABASE_URL,
    });

    if (process.env.FIRESTORE_EMULATOR_HOST) {
      const firestore = admin.firestore();
      firestore.settings({
        host: process.env.FIRESTORE_EMULATOR_HOST,
        ssl: false,
      });
      console.log(`Connected to Firestore emulator at ${process.env.FIRESTORE_EMULATOR_HOST}`);
    }

    if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
      const auth = (firebase as any).auth();
      auth.useEmulator(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`);
      console.log(`Connected to Firebase Auth emulator at ${process.env.FIREBASE_AUTH_EMULATOR_HOST}`);
    }
  }
};

export default firebaseConfig;