import express from "express";
import { mockUsers } from "./constants.mjs";
import resolveIndexByUserId from "./MiddleWare/middlewares.mjs";
import router from "./Routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser("Hello World"));
app.use(router)


const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.cookie("Hello","World",{maxAge:10000 , signed: true})
  res.status(200).send("Kya hall hai bhai Kaisa hai launde");
});


app.listen(3000, () => {
  console.log(`Server is running at ${PORT}`);
});

/////  PUT REQUESTS /////////  used for updating the whole user data

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

////////////    PATCH REQUESTS /////////  used for updating the one part of a user not whole user data

app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.status(404).send("User not found");
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

/////   DELETE REQUESTS /////////

app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.status(404).send("User not found");
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});
