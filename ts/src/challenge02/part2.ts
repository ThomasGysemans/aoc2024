import { getInput } from "..";

function isUnsafe(delta: number, isIncreasing: boolean): boolean {
    return (
        (isIncreasing && (!(delta <= -1 && delta >= -3)))) ||
        (!isIncreasing && (!(delta >= 1 && delta <= 3))
    );
}

function isValidReport(numbers: number[], retried = false): boolean {
    const isIncreasing = numbers[1] > numbers[0];
    for (let j = 0; j < numbers.length - 1; j++) {
        const delta = numbers[j] - numbers[j + 1];
        if (isUnsafe(delta, isIncreasing)) {
            if (retried) {
                return false;
            } else {
                return isValidReport(numbers.filter((_,i) => i !== j - 1), true) ||
                    isValidReport(numbers.filter((_,i) => i !== j), true) ||
                    isValidReport(numbers.filter((_,i) => i !== j + 1), true);
            }
        }
    }
    return true;
}

export default function code() {
    const lines = getInput().split("\n");

    let safeReports = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const numbers = lines[i].split(" ").map(e => parseInt(e));
        if (isValidReport(numbers)) {
            safeReports++;
        }
    }

    return safeReports;
}