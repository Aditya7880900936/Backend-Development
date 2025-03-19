import { Router } from "express";

const productRouter = Router();

productRouter.get("/api/products", (req, res) => {
  console.log(req.signedCookies); // Log signed cookies
  if (req.signedCookies.Hello && req.signedCookies.Hello === "World") {
    return res.send([
      {
        id: 1,
        name: "Laptop",
        price: "50000",
      },
      {
        id: 2,
        name: "Mobile",
        price: "10000",
      },
    ]);
  } else {
    return res.status(403).send({ msg: "Sorry Brother You have A Wrong Cookie" });
  }
});

export default productRouter;