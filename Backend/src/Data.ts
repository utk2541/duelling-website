import { DataSource } from "typeorm";
import { allProblems } from "./entities/allProblems";
export const Data = new DataSource({
  type: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
  username: "postgres",
  password: "utk",
  database: "dueling",
  synchronize: true,
  logging: true,
  entities: [allProblems],
});
