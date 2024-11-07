import {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import {config} from "../config/auth.config"
import { User } from "../models";

export class AuthJwt{
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"]?.toString();
    jwt.verify(token, config.secret, (err, decoded) => {
      // @ts-ignore
      req.userId = decoded.id;

      // @ts-ignore
      User.findByPk(decoded.id).then(user => {
        // @ts-ignore
        req.user = user;
        next();
      });
    });
  };

  static getUser(req: Request): User {
    // @ts-ignore
    return req.user as User;
  }

  static isAdmin(req: Request, res: Response, next: NextFunction) {
    let user: User;
    if (this.getUser(req)) user = this.getUser(req);
    // @ts-ignore
    User.findByPk(req.userId).then(u => {
      if (u.admin) {
        next();
      } else {
        res.status(403).send({
          message: "Require Admin Role!"
        })
      }
      return;
    });
  }
}