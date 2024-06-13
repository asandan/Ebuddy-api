import * as express from 'express';
import * as dotenv from 'dotenv';

import { userRoute } from '../routes/userRoute';
import ApiError from '../entities/ApiError';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/users", userRoute);

app.get('/', (_, res) => {
  res.send('Hello World! 🌍');
})

app.get("/api/get-label", async (_, res) => {
  try {
    res.status(200).send({ label: "Label from the backend! 🗄️" });
  } catch (e) {
    res.status(500).send(new ApiError(500, "Error fetching data!"));
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});