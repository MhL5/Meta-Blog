import crypto from "crypto";

/**
 * Utility class for generating and handling hashed tokens using crypto.
 * @description you can generate, hash, and read the hashed tokens using this class.
 */
class GenerateReadHashedToken {
  constructor() {}

  /**
   * Generate a token using crypto
   */
  generate = () => crypto.randomBytes(32).toString("hex");

  /**
   * hash your token
   */
  toHash = (token: string) =>
    crypto.createHash("sha256").update(token).digest("hex");

  /**
   * Read your hashed token
   */
  readHash = (token: string) =>
    crypto.createHash("sha256").update(token).digest("hex");
}

const generateReadHashedToken = new GenerateReadHashedToken();

export { generateReadHashedToken };
