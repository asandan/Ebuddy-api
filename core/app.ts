import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as functions from 'firebase-functions';
import * as service from "../ebuddy-426311-88ddef1e2d32.json"

import admin from 'firebase-admin';

import { userRoute } from '../routes/userRoute';
import { authRoute } from '../routes/auth';
import { dataRoute } from '../routes/data';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors({ origin: true, credentials: true }))

app.use(cookieParser())

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/data", dataRoute);
app.use("/api/auth", authRoute)

app.get('/api', async (_, res) => {
  const db = getFirestore() as any;
  const userData = (await db.collection("user").get()).docs.map((doc) => doc.data());

  res.status(200).send(userData);
})

app.listen(port, () => {
  admin.initializeApp({
    credential: admin.credential.cert(service as any),
    databaseURL: "http://127.0.0.1:9091/firestore",
  });

  console.log(`Firestore database is working! 🔥`);

  console.log(`Server is running on port ${port} 🚀`);
});

exports.app = functions.https.onRequest(app);