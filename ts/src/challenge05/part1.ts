import { getInput } from "..";

type Rule = {
    a: number,
    b: number,
}

type Update = number[];

export default function code() {
    const { rules, updates } = getData();

    const validUpdates: Update[] = [];

    main: for (const update of updates) {
        for (const rule of rules) {
            if (!doesUpdateRespectRule(update, rule)) {
                continue main;
            }
        }
        validUpdates.push(update);
    }

    const middleNumbers = validUpdates.map(getMiddleNumber);
    return middleNumbers.reduce((p, c) => p += c, 0);
}

function doesUpdateRespectRule(update: Update, rule: Rule): boolean {
    if (!update.includes(rule.a) && !update.includes(rule.b)) return true;
    if (update.includes(rule.a) && !update.includes(rule.b)) return true;
    if (!update.includes(rule.a) && update.includes(rule.b)) return true;
    const idxA = update.indexOf(rule.a);
    const idxB = update.indexOf(rule.b);
    return idxA < idxB;
}

function getMiddleNumber(update: Update): Update[number] {
    return update[Math.floor(update.length / 2)];
}

function getData(): { updates: Update[], rules: Rule[] } {
    const input = getInput();
    const lines = input.split("\n");
    const rules: Rule[] = [];
    const updates: Update[] = [];
    let lineIdx = 0;

    while (lineIdx < lines.length && lines[lineIdx].trim().length) {
        const parts = lines[lineIdx++].split("|");
        rules.push({
            a: parseInt(parts[0]),
            b: parseInt(parts[1]),
        });
    }

    for (let i = lineIdx + 1; i < lines.length; i++) {
        const numbers = lines[i].split(",").map(e => parseInt(e));
        updates.push(numbers);
    }

    return {
        rules,
        updates
    };
}