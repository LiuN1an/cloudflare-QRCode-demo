import { StatusError, json, error } from "itty-router";
import { findById } from "../utils";

export default async function (id, db) {
  try {
    const result = await findById(id, db);
    if (result) {
      const { url, count } = result;
      return json({ url, clicks: count });
    } else {
      return error(400, "NOT FOUND");
    }
  } catch {
    throw new StatusError(500, "INTERNAL ERROR");
  }
}
