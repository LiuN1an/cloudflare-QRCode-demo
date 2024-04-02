import { StatusError, error } from "itty-router";
import { findById } from "../utils";

export default async function (id, db) {
  try {
    const result = await findById(id, db);
    if (result) {
      const { url, count } = result;
      await db.put(url, JSON.stringify({ url, count: parseInt(count) + 1 }));
      return Response.redirect(url, 302);
    } else {
      return error(400, "NOT FOUND");
    }
  } catch {
    throw new StatusError(500, "INTERNAL ERROR");
  }
}
