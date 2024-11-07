import { User, Wish } from "../models";
import {Op} from "sequelize"
import {Request, Response} from "express";
import { AuthJwt } from "../middleware/authJwt";

export class WishController {
  static create(req: Request, res: Response) {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: JSON.stringify(req.body)
      });
      return;
    }

    const user = AuthJwt.getUser(req);


    const wish = new Wish({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ?? false,
      ownerId: user.id
    });

    wish.save().then(w => {
      res.send(w);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial."
      })
    });
  }

  static userWishes(req: Request, res: Response) {
    const userId = +req.query.userId;
    const curUser = AuthJwt.getUser(req);
    if (userId && curUser.id !== userId) {
      User.findByPk(userId).then(user => {
        user._getWishes({where: {published: true}}).then(wishes => res.send(wishes.sort((a, b) => a.title > b.title ? 1 : -1)));
      })
    } else {
      curUser._getWishes({attributes: ['id', 'title', 'description', 'published', 'ownerId', 'updatedAt']}).then(wishes => {
        wishes.forEach(wish => wish.gifter = null);
        res.send(wishes.sort((a, b) => a.title > b.title ? 1 : -1));
      });
    }
  }

  static findByUser(req: Request, res: Response) {
    const userId = req.params.userId;

    User.findByPk(userId).then(user => {
      user._getWishes().then(wishes => res.send(wishes));
    })
  }

  static findAll(req: Request, res: Response) {
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Wish.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
      });
    });
  }

  // Find a single Wish with an id
  static findOne(req: Request, res: Response){
    const id = req.params.id;

    Wish.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  }

  // Update a Wish by the id in the request
  static update(req: Request, res: Response){
    const id = req.params.id;

    Wish.update(req.body, {
      where: { id }
    }).then(num => {
      if (num[0] === 1) {
        res.send({
          message: "Wish was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
  }

  // Delete a Wish with the specified id in the request
  static delete(req: Request, res: Response) {
    const id = req.params.id;

    Wish.destroy({
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
    Wish.destroy({
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

  // find all published Wishes
  static findAllPublished(req: Request, res: Response){
    Wish.findAll({ where: { published: true } }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  };

}