import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";
import { DATABASE, TABLE } from "./config.ts";

const client = await new Client();

client.connect({
  hostname: "containers-us-west-164.railway.app",
  username: "root",
  password: "864dN5YrynTvDStdy6KD",
  db: "railway",
  port: 7047
});

const run = async () => {
  //  await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);
  await client.execute(`USE ${DATABASE}`);
  //await client.execute(`DROP TABLE IF EXISTS ${TABLE.KIRBY}`);

  // await client.execute(`
  //   CREATE TABLE ${TABLE.KIRBY} (
  //       id int(11) NOT NULL AUTO_INCREMENT,
  //       event varchar(100) NOT NULL,
  //       isCompleted boolean NOT NULL default false,
  //       date varchar(100) NOT NULL,
  //       PRIMARY KEY (id)
  //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  // `);
};

run();

export default client;
