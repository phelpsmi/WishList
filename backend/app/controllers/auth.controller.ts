import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {User} from "../models"
import {config} from "../config/auth.config";
import {Request, Response} from "express";
import { AuthJwt } from "../middleware/authJwt";

const SALT_ROUNDS = 8;

export class AuthController {
  static signup(req: Request, res: Response) {
    // Save User to Database
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      admin: false
    })
      .then(user => {
        res.send({ message: "User registered successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  static update(req: Request, res: Response){
    const id = +req.params.id;
    const user = AuthJwt.getUser(req);

    if (user?.id !== id && !user?.admin) {
      res.status(403).send({message: "Unauthorised"});
      return;
    }

    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, SALT_ROUNDS)
    else delete req.body.password

    User.update(req.body, {
      where: { id }
    }).then(num => {
      if (num[0] === 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
  }

  static signin(req: Request, res: Response) {
    User.scope('auth').findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          user,
          accessToken: token
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }

  static verify(req: Request, res: Response) {
    const token = req.headers["x-access-token"]?.toString();
    if (!token) {
      res.send(false);
      return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      // @ts-ignore
      if (decoded?.id) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  }
}
