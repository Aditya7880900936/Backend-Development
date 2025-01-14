import { Router } from "express";
import { query, validationResult, matchedData , checkSchema } from "express-validator";
import { mockUsers } from "../constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import resolveIndexByUserId from "../MiddleWare/middlewares.mjs";

const userRouter = Router();

userRouter.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be Empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 Characters"),
  (req, res) => {
    // console.log(req['express-validator#contexts'])
    // console.log(req.query);
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;
    // When Filter and Value are Undefined
    // if(!filter && !value) return res.send(mockUsers)

    if (filter && value)
      return res.send(mockUsers.filter((user) => user[filter] === value));
    return res.send(mockUsers);

    // res.send(mockUsers);
  }
);

userRouter.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) {
    return res.status(404).send("User not found");
  }
  return res.send(findUser);
})

userRouter.post("/api/users",checkSchema(createUserValidationSchema),(req,res)=>{
        // console.log(req.body);
        const result = validationResult(req)
        console.log(result);
    
        if(!result.isEmpty()){
          return res.status(400).send({errors : result.array() })
        }
    
        const data = matchedData(req)
        // console.log(data);
    
        const newUser = {
          id: mockUsers[mockUsers.length - 1].id + 1,
          ...req.body,
        };
        mockUsers.push(newUser);
        return res.status(201).send(newUser);
})

export default userRouter