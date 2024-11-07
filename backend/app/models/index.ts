import {Sequelize} from "sequelize-typescript";
import {config} from "../config/db.config";
import { User } from "./user.model";
import { Wish } from "./wish.model";
import { Family } from "./family.model";
import { FamilyUser } from "./family-user.model";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

sequelize.addModels([User, Wish, Family, FamilyUser]);

export { sequelize, User, Wish, Family };
