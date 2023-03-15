import process from "process";
import { DataSource } from "typeorm";
import { allProblems } from "./entities/allProblems";
import { duelists } from "./entities/duelists";
import { duels } from "./entities/duels";
import { config } from "dotenv"
config()
export const Data = new DataSource({
  type: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
  host: process.env.HOSTDB,
  port: Number(process.env.PORTDB),
  username: process.env.USERDB,
  password: process.env.PASSDB,
  database: process.env.DBNAME,
  url: process.env.URL,
  synchronize: true,
  logging: true,
  entities: [allProblems,duels,duelists],
});

