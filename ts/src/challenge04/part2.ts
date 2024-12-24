import { getInput } from "..";

export default function code() {
    const input = getInput();
    const lines = input.split("\n");
    const w = lines[0].length;
    const h = lines.length;
    let sum = 0;

    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            const char = lines[y][x]; // "X", "M", "A" or "S"
            if (char === "A") {
                const ltr = [lines[y-1][x-1], lines[y][x], lines[y+1][x+1]].join("");
                const rtl = [lines[y-1][x+1], lines[y][x], lines[y+1][x-1]].join("");
                if (isMAS(ltr) && isMAS(rtl)) {
                    sum++;
                }
            }
        }
    }

    return sum;
}

function isMAS(str: string): boolean {
    return str === "MAS" || str === "SAM";
}