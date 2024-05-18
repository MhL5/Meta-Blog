import crypto from "crypto";

class GenerateReadHashedToken {
  constructor() {}

  /**
   * Generate a token using crypto
   * @returns
   */
  generate = () => crypto.randomBytes(32).toString("hex");

  /**
   * hash your token
   * @param token
   * @returns
   */
  toHash = (token: string) =>
    crypto.createHash("sha256").update(token).digest("hex");

  /**
   * Read your hashed token
   * @param token
   * @returns
   */
  readHash = (token: string) =>
    crypto.createHash("sha256").update(token).digest("hex");
}

const generateReadHashedToken = new GenerateReadHashedToken();

export { generateReadHashedToken };
