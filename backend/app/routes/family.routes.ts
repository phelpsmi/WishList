import {Router} from "express";
import { FamilyController } from "../controllers/family.controller";
import { AuthJwt } from "../middleware/authJwt";


export const familyRouter = Router();

// Create a new Tutorial
familyRouter.post("/", [AuthJwt.verifyToken], FamilyController.create);

// Retrieve own wishes
familyRouter.get("/", [AuthJwt.verifyToken], FamilyController.ownFamilies);

// Retrieve all published Tutorials
familyRouter.get("/all", FamilyController.findAll);

// Add current user to family
familyRouter.get("/join/:id", [AuthJwt.verifyToken], FamilyController.join);

// Remove current user from family
familyRouter.get("/leave/:id", [AuthJwt.verifyToken], FamilyController.leave);

// Retrieve a single family with id
familyRouter.get("/:id", FamilyController.findOne);

// Update a Tutorial with id
familyRouter.put("/:id", FamilyController.update);

// Delete a Tutorial with id
familyRouter.delete("/:id", FamilyController.delete);

// Delete all Tutorials
familyRouter.delete("/", FamilyController.deleteAll);