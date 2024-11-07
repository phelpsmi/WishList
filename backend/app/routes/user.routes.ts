import {Router} from "express";
import { UserController } from "../controllers/user.controller";


export let userRouter = Router();

// Retrieve all Tutorials
userRouter.get("/", UserController.findAll);

// gets all users who share a family with the active user
userRouter.get("/relatives", UserController.getRelatives);

// Retrieve a single Tutorial with id
userRouter.get("/:id", UserController.findOne);

// Update a Tutorial with id
// userRouter.put("/:id", UserController.update);

// Delete a Tutorial with id
userRouter.delete("/:id", UserController.delete);

// Delete all Tutorials
userRouter.delete("/", UserController.deleteAll);