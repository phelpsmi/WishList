import { Wish, Family, User, sequelize } from "../models";
import {Op} from "sequelize"
import {Request, Response} from "express";
import { AuthJwt } from "../middleware/authJwt";

export class FamilyController {
  static create(req: Request, res: Response) {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: JSON.stringify(req.body)
      });
      return;
    }

    const user = AuthJwt.getUser(req);

    const family = new Family({
      name: req.body.name,
      ownerId: user.id
    });

    family.save().then(f => {
      user._addFamily(f);
      res.send(f);
    })
  }

  static ownFamilies(req: Request, res: Response) {
    AuthJwt.getUser(req)._getFamilies().then(families => {
      res.send(families);
    });
  }

  static findAll(req: Request, res: Response) {
    const name = req.query.name;
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Family.findAll({ where: condition, include: ['users', 'owner'] })
      .then(families => {
        res.send(families);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving families."
      });
    });
  }

  static findOne(req: Request, res: Response){
    const id = req.params.id;

    Family.findByPk(id, {include: ['users', 'owner']})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Family with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Family with id=" + id
        });
      });
  }

  static join(req: Request, res: Response){
    const id = req.params.id;
    const user = AuthJwt.getUser(req);

    user._addFamily(id).then(() => res.send({})).catch(err => res.status(500).send({message: err.message}));
  }

  static leave(req: Request, res: Response){
    const id = req.params.id;
    const user = AuthJwt.getUser(req);

    user._removeFamily(id).then(() => res.send({})).catch(err => res.status(500).send({message: err.message}));
  }

  // Update a Wish by the id in the request
  static update(req: Request, res: Response){
    const id = req.params.id;

    Family.update(req.body, {
      where: { id }
    }).then(num => {
      if (num[0] === 1) {
        res.send({
          message: "Family was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Family with id=${id}. Maybe Family was not found or req.body is empty!`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error updating Family with id=" + id
      });
    });
  }

  // Delete a Wish with the specified id in the request
  static delete(req: Request, res: Response) {
    const id = req.params.id;

    Family.destroy({
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

  // Delete all Wishes from the database.
  static deleteAll(req: Request, res: Response){
    Family.destroy({
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
}