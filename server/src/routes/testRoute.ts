import { Router } from "express";

export const route = Router();
route.get("/", async (req, res, next) => {
  //   let { username, password } = req.body;
  let { username, password } = { username: "an", password: "1" };

  return res
    .status(200)
    .send(
      JSON.stringify({ username, password, message: "success get route test" })
    );
});

route.post("/post", async (req, res, next) => {
  console.log("body data", req.body);
  let { username, password } = req.body;
  return res
    .status(201)
    .send(
      JSON.stringify({ username, password, message: "success post route test" })
    );
});
