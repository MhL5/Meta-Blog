import crypto from "crypto";

function generateReadHashedToken() {
  const generate = () => crypto.randomBytes(32).toString("hex");
  const readHash = (read: string) =>
    crypto
      .createHash("sha256")
      .update(read || "")
      .digest("hex");

  return { generate, readHash };
}

export { generateReadHashedToken };
