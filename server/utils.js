import { createHash } from "crypto";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 18);

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function hash(string) {
  return createHash("sha256").update(string).digest("hex");
}

export function getId() {
  return nanoid();
}
