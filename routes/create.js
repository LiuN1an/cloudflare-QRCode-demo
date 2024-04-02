import { StatusError, json, error } from "itty-router";
import { checkUrl, random, toQRCode } from "../utils";

export default async function (query, db) {
  try {
    const query_url = decodeURIComponent(query.url);
    if (checkUrl(query_url)) {
      return error(400, "INVALID URL");
    }

    const id = random();
    await db.put(id, JSON.stringify({ url: query_url, count: 0 }));
    const buffer = toQRCode(query_url);
    const base64 = btoa(
      String.fromCharCode.apply(null, new Uint8Array(buffer))
    );
    return json({ code: id, image: base64 });
  } catch {
    throw new StatusError(500, "INTERNAL ERROR");
  }
}
