/**
 * Syntax: No Tabs Or Spaces Other Than Between Keywords.
 **/
require("module-alias/register");
import * as fs from "fs";
const chalk = require("chalk");
import * as registerKeywords from "./functions/registerKeywords";

class Compiler {
  code: any;
  filename: any;
  constructor(file: string) {
    this.code = fs.readFileSync(file, "utf-8").split("\n");
    this.filename = file.slice(0, -2);
  }

  warn(text: string) {
    return console.log(chalk.red(`${text}\n`));
  }

  compile() {
    const output: any[] = [];
    const variables: any = {};

    for (const line of this.code) {
      registerKeywords.run(line, output, this.warn, variables, this.code, this.filename);
    }

    return output;
  }

  run() {
    this.warn(
      "GScript is currently in beta! Not suitable for production. Use at your own risk!"
    );
    const output = this.compile();
    for (const line of output) {
      console.log(line);
    }
  }
}

export { Compiler };
