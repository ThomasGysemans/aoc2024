import { getInput } from "..";

export default function code() {
    const input = getInput();
    const lines = input.split("\n");
    const width = lines[0].length;
    const height = lines.length;
    let occurrences = 0;

    for (const line of lines) {
        occurrences += ltr(line);
        occurrences += ltr(reverseStr(line));
    }

    for (let x = 0, j = 0; x < width; x++) {
        const col = lines.reduce((p, c) => p += c[j], "");
        occurrences += ltr(col);
        occurrences += ltr(reverseStr(col));
        j++;
    }

    const diagonals = [...readDiagonalsFromLeftCorner(lines, width, height), ...readDiagonalsFromRightCorner(lines, width, height)];
    for (const diagonal of diagonals) {
        occurrences += ltr(diagonal);
        occurrences += ltr(reverseStr(diagonal));
    }

    return occurrences;
}

function reverseStr(str: string): string { 
    return str.split("").reverse().join("");
}

function readDiagonalsFromLeftCorner(lines: string[], w: number, h: number): string[] {
    const diagonals: string[] = [];
    let y = 3;
    while (y < h) {
        let diagonal = "";
        for (let i = y, x = 0; i >= 0 && x <= y; i--, x++) {
            diagonal += lines[i][x];
        }
        diagonals.push(diagonal);
        y++;
    }
    y = h - 1;
    let x = 1;
    while (x < w - 3) {
        let diagonal = "";
        for (let i = y, j = x; j < w; i--, j++) {
            diagonal += lines[i][j];
        }
        diagonals.push(diagonal);
        x++;
    }
    return diagonals;
}

function readDiagonalsFromRightCorner(lines: string[], w: number, h: number): string[] {
    const diagonals: string[] = [];
    let y = 3;
    while (y < h) {
        let diagonal = "";
        for (let i = y, x = w - 1; i >= 0 && x >= 0; i--, x--) {
            diagonal += lines[i][x];
        }
        diagonals.push(diagonal);
        y++;
    }
    y = h - 1;
    let x = w - 2; // start at penultimate column
    while (x >= 3) {
        let diagonal = "";
        for (let i = y, j = x; i >= 0 && j >= 0; i--, j--) {
            diagonal += lines[i][j];
        }
        diagonals.push(diagonal);
        x--;
    }
    return diagonals;
}

function ltr(line: string): number {
    let occurrences = 0;
    let i = 0;
    let j = 4;
    
    while (j <= line.length) {
        if (line.substring(i, j) === "XMAS") {
            occurrences++;
            i += 4;
            j += 4;
        } else {
            i++;
            j++;
        }
    }

    return occurrences;
}

// function N(x: number, y: number, lines: string[]): boolean {
//     if (y - 3 < 0) return false;
//     return "MAS" === [lines[y - 1][x], lines[y - 2][x], lines[y - 3][x]].join("");
// }

// function NE(x: number, y: number, w: number, h: number, lines: string[]) {
//     return "MAS" === [lines[y - 1][x - 1]].join("");
// }

// function E(x: number, y: number, lines: string[]): boolean {
//     return "MAS" === [lines[y][x + 1], lines[y][x + 2], lines[y][x + 3]].join("");
// }

// function S(x: number, y: number, h: number, lines: string[]): boolean {
//     if (y + 3 >= h) return false;
//     return "MAS" === [lines[y + 1][x], lines[y + 2][x], lines[y + 3][x]].join("");
// }

// function W(x: number, y: number, lines: string[]): boolean {
//     return "MAS" === [lines[y][x - 1], lines[y][x - 2], lines[y][x - 3]].join("");
// }

// export default function code() {
//     const input = getInput();
//     const lines = input.split("\n");
//     const w = lines[0].length;
//     const h = lines.length;
//     let sum = 0;

//     for (let y = 0; y < h; y++) {
//         for (let x = 0; x < w; x++) {
//             const char = lines[y][x]; // "X", "M", "A" or "S"
//             if (char === "X") {
//                 if (E(x, y, lines)) sum++;
//                 if (S(x, y, h, lines)) sum++;
//                 if (N(x, y, lines)) sum++;
//                 if (W(x, y, lines)) sum++;
//             }
//         }
//     }

//     return sum;
// }