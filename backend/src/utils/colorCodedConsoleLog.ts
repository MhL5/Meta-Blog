/**
 * Logs messages to the console with color coding based on the status.
 *
 * @param {("success" | "fail")} status - The status of the message, which determines the color of the output.
 * @param {...string} text - One or more messages to be logged. Each message is logged on a new line.
 */
export function colorCodedConsoleLog(
  status: "success" | "fail",
  ...text: string[]
) {
  const blue = "\x1b[34m";
  const red = "\x1b[31m";
  const resetColor = "\x1b[0m";

  text.forEach((t) =>
    console.log(status === "success" ? blue : red, t, resetColor)
  );
}
