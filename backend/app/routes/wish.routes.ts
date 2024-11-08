import {Router} from "express";
import { WishController } from "../controllers/wish.controller";
import { AuthJwt } from "../middleware/authJwt";


export let wishRouter = Router();

// Create a new Tutorial
wishRouter.post("/", [AuthJwt.verifyToken], WishController.create);

// Retrieve own wishes
wishRouter.get("/", [AuthJwt.verifyToken], WishController.userWishes);

// Retrieve own wishes
wishRouter.get("/user/:userId", [AuthJwt.verifyToken], WishController.findByUser);

// Retrieve all published Tutorials
wishRouter.get("/published", WishController.findAllPublished);

wishRouter.get("/gifts", WishController.findGifts);

// Retrieve a single Tutorial with id
wishRouter.get("/:id", WishController.findOne);

// Update a Tutorial with id
wishRouter.put("/:id", WishController.update);

// Delete a Tutorial with id
wishRouter.delete("/:id", WishController.delete);

// Delete all Tutorials
wishRouter.delete("/", WishController.deleteAll);