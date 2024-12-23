import * as fs from "fs";

export default function code() {
    const filename = "input.txt";
    const file = fs.readFileSync(filename).toString();
    const lines = file.split("\n");

    const left_list = new Uint32Array(lines.length);
    const right_list = new Uint32Array(lines.length);
    const map = new Map<number, number>();
    let result = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const parts = line.split("  ");
        const left = parseInt(parts[0]);
        const right = parseInt(parts[1]);
        left_list[i] = left;
        right_list[i] = right;
    }

    for (let i = 0; i < left_list.length; i++) {
        for (let j = 0; j < right_list.length; j++) {
            if (left_list[i] === right_list[j]) {
                if (map.has(left_list[i])) {
                    map.set(left_list[i], map.get(left_list[i])! + 1);
                } else {
                    map.set(left_list[i], 1);
                }
            }
        }
    }

    for (const [key, value] of map) {
        result += key * value;
    }

    return result;
}