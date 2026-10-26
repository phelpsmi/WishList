import express from "express"
import cors from "cors"
import {sequelize} from "./app/models"
import { addRoutes } from "./app/routes";
import path from "path";

const app: express.Application = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sync regularly
sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

addRoutes(app);

app.use('/**/*', express.static(path.join(__dirname, 'client')));
app.use('/', express.static(path.join(__dirname, 'client')));

// app.use('/*.js', express.static(path.join(__dirname, 'client')));
// app.use('/*.css', express.static(path.join(__dirname, 'client')));
// app.all('/*', (req, res) => {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('index.html', { root: path.join(__dirname, 'client') });
// });

// set port, listen for requests
const PORT = +process.env.PORT || 8080 as number;
app.listen(PORT, '192.168.0.185', () => {
  console.log(`Server is running on port ${PORT}.`);
});
