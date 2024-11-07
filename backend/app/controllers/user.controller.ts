import { Family, User } from "../models";
import {Op} from "sequelize"
import * as bcrypt from "bcrypt";
import {Request, Response} from "express";
import { AuthJwt } from "../middleware/authJwt";
import { FamilyController } from "./family.controller";

export class UserController {
  static saltRounds = 10;
  static pepper = "salt'N'Peppa'Heeeea";

  static findAll(req: Request, res: Response) {
    const title = req.query.title;
    const condition = title ? { username: { [Op.like]: `%${title}%` } } : null;

    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
      });
    });
  }

  // Find a single User with an id
  static findOne(req: Request, res: Response){
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find user with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
  }

  // Update a User by the id in the request
  // static update(req: Request, res: Response){
  //   const id = req.params.id;
  //   const user = AuthJwt.getUser(req);

  //   if (user.id !== id && !user.admin) {
  //     res.status(403).send({message: "Unauthorised"})
  //   }

  //   User.update(req.body, {
  //     where: { id }
  //   }).then(num => {
  //     if (num[0] === 1) {
  //       res.send({
  //         message: "User was updated successfully."
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
  //       });
  //     }
  //   }).catch(err => {
  //     res.status(500).send({
  //       message: "Error updating User with id=" + id
  //     });
  //   });
  // }

  // Delete a User with the specified id in the request
  static delete(req: Request, res: Response) {
    const id = req.params.id;

    User.destroy({
      where: { id }
    }).then(num => {
      if (num === 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
  };

  // Delete all Users from the database.
  static deleteAll(req: Request, res: Response){
    User.destroy({
      where: {},
      truncate: false
    }).then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
  };

  static getRelatives(req: Request, res: Response){
    const members: User[] = [];

    User.findByPk(AuthJwt.getUser(req).id, { include: [{model: Family, as: 'families', include: ['users']}]}).then(user => {
      user.families.forEach(family => {
        family.users.forEach(member => {
          if (member.id !== user.id && !members.find(u => u.id === member.id)) members.push(member)
        });
      });
      res.send(members);
    });
  }
}