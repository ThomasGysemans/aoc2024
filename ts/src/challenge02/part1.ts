import { getInput } from "..";

export default function code() {
    const lines = getInput().split("\n");

    let safeReports = 0;
    
    main: for (let i = 0; i < lines.length; i++) {
        const numbers = lines[i].split(" ").map(e => parseInt(e));
        const isIncreasing = numbers[1] > numbers[0];
        for (let j = 0; j < numbers.length - 1; j++) {
            const delta = numbers[j] - numbers[j + 1];
            if (isIncreasing) {
                if (numbers[j] >= numbers[j + 1] || !(delta <= -1 && delta >= -3)) {
                    continue main;
                }
            } else {
                if (numbers[j] <= numbers[j + 1] || !(delta >= 1 && delta <= 3)) {
                    continue main;
                }
            }
        }
        safeReports++;
    }

    return safeReports;
}