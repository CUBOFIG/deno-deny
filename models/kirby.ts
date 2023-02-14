import client from "../db/client.ts";
import { TABLE } from "../db/config.ts";
import Kirby from "../interfaces/ServerKirby.ts";

export default {
  getAll: async () => {
    return await client.query(`SELECT * FROM ${TABLE.KIRBY}`);
  },
  add: async ({ event, isCompleted, date}: Kirby,) => {
    return await client.query
    ( `INSERT INTO ${TABLE.KIRBY}(event, isCompleted, date) values(?, ?, ?)`,
      [
        event,
        isCompleted,
        date
      ],
    );
  },
  deleteById: async ({ id }: Kirby) => {},
  doesExistById: async ({ id }: Kirby) => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE.KIRBY} WHERE id = ? LIMIT 1`,
      [id],
    );
    return result.count > 0;
  },
  getById: async ({ id }: Kirby) => {
    return await client.query(
      `SELECT * FROM ${TABLE.KIRBY} WHERE id = ?`,
      [id],
    );
  },
  updateById: async ({ id, event, isCompleted, date }: Kirby) => {
    const result = await client.query(
      `UPDATE ${TABLE.KIRBY} SET todo=?, isCompleted=? WHERE id=?`,
      [
        event, isCompleted, date, id,
      ]
    )
    return result.affectedRows;
  },
}
