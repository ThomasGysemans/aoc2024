import code from "./challenge05/part2";
import * as fs from "fs";

export function getInput(): string {
    return fs.readFileSync("./input.txt").toString();
}

console.time("Runtime");
try {
    console.log(`Result is`, code());
} finally {
    console.timeEnd("Runtime");
}