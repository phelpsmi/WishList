import { VerifySignUp } from "../middleware/verifySignUp";
import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";
import { AuthJwt } from "../middleware/authJwt";

export let authRouter = Router();

authRouter.post("/signup", [VerifySignUp.checkDuplicateUsernameOrEmail], AuthController.signup);

authRouter.post("/signin", AuthController.signin);

authRouter.put("/:id", [AuthJwt.verifyToken], AuthController.update);

authRouter.get("/verify", AuthController.verify);