import * as fs from "fs";

export default function code() {
    const filename = "input.txt";
    const file = fs.readFileSync(filename).toString();
    const lines = file.split("\n");

    let left_list = new Uint32Array(lines.length);
    let right_list = new Uint32Array(lines.length);
    let result = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const parts = line.split("  ");
        const left = parseInt(parts[0]);
        const right = parseInt(parts[1]);
        left_list[i] = left;
        right_list[i] = right;
    }

    left_list.sort();
    right_list.sort();

    for (let i = 0; i < left_list.length; i++) {
        const delta = Math.abs(left_list[i] - right_list[i]);
        result += delta;
    }

    return result;
}