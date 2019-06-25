import express from "express";
import passport from "passport";
import * as authService from "../services/authService";
import { to, ResponseError, ResponseSuccess } from "../utils";
import path from "path";

import { ExtractJwt, Strategy } from "passport-jwt";
import CONFIG from "../config/config";

import passMiddleware from "../middleware/passport-rest";
passMiddleware(passport);

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "Slone Clone API",
    data: { version_number: "v1.0.0" }
  });
});

router.post("/users/login", async (req, res) => {
  const { body } = req;
  const [err, auth] = await to(authService.authUser(body));
  if (err) return ResponseError(res, err, 422);

  return ResponseSuccess(res, auth);
});

router.post("/users/signup", async (req, res) => {
  const { body } = req;
  const [err, auth] = await to(authService.createUser(body));
  if (err) return ResponseError(res, err, 422);

  return ResponseSuccess(res, auth);
});

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user } = req;

    return ResponseSuccess(res, { user });
  }
);

/*
router.put(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.update
);
*/

export default router;
