import crypto from "crypto";
import Hashids from "hashids";

const hasher = new Hashids();

const randomHex = (bytes = 16) => {
  return crypto.randomBytes(bytes).toString("hex");
};

const hashID = id => hasher.encodeHex(id);

const decodeID = hex => hasher.decodeHex(hex);

const hashHex = hex => hasher.encodeHex(hex);

const decodeHex = hex => hasher.decodeHex(hex);

export default { randomHex, hashID, decodeID, hashHex, decodeHex };
