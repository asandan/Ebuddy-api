import * as admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore';
import { cert } from "firebase-admin/app";

const service = require("../ebuddy-426311-88ddef1e2d32.json");

admin.initializeApp({
  credential: cert(service),
  databaseURL: process.env.DATABASE_URL
})

console.log(`Firestore database is working! 🔥`);

export const db = getFirestore();