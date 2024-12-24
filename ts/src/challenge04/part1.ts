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