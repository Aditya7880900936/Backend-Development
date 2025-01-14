import express from "express";
import userRouter from "./Routes/users.mjs";
import { mockUsers } from "./constants.mjs";
import resolveIndexByUserId from "./MiddleWare/middlewares.mjs";
const app = express();

app.use(express.json());
app.use(userRouter)


app.use(loggingMiddleware);



const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("hey gpt  ");
  res.status(200).send("hedas");
});

// app.get(
//   "/api/users",
//   query("filter")
//     .isString()
//     .notEmpty()
//     .withMessage("Must not be Empty")
//     .isLength({ min: 3, max: 10 })
//     .withMessage("Must be at least 3-10 Characters"),
//   (req, res) => {
//     // console.log(req['express-validator#contexts'])
//     // console.log(req.query);
//     const result = validationResult(req);
//     console.log(result);
//     const {
//       query: { filter, value },
//     } = req;
//     // When Filter and Value are Undefined
//     // if(!filter && !value) return res.send(mockUsers)

//     if (filter && value)
//       return res.send(mockUsers.filter((user) => user[filter] === value));
//     return res.send(mockUsers);

//     // res.send(mockUsers);
//   }
// );

////////     ROUTE PARAMS ///////



app.get("/api/products", (req, res) => {
  res.send([
    {
      id: 1,
      name: "Chicken Breast",
      price: "299",
    },
    {
      id: 2,
      name: "Soya Chunks ",
      price: "399",
    },
  ]);
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
