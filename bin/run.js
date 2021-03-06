import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { octoherd } from "../index.js";
import runCommand from "./commands/run.js";

/**
 * Function is used by Octoherd Script modules to provide a dedicated CLI binary
 *
 *     import { script } from "./script.js";
 *     import { run } from "@octoherd/cli/run";
 *     run(script);
 *
 * @param {function} script Octoherd Script function
 */
export async function run(script) {
  const argv = await yargs(["run", ...hideBin(process.argv)])
    .command(runCommand)
    .default("octoherd-script", () => script).argv;

  try {
    await octoherd(argv);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
