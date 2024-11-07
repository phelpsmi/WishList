import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export class VerifySignUp {
  static checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: NextFunction) => {
    // Username
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }

      // Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user2 => {
        if (user2) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }

        next();
      });
    });
  };
}