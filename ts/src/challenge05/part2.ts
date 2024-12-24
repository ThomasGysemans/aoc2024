import { getInput } from "..";

type Rule = {
    a: number,
    b: number,
}

type Update = number[];

type Error = {
    rule: Rule,
    update: Update,
}

export default function code() {
    const { rules, updates } = getData();

    const invalidUpdates: Error[] = [];

    for (const update of updates) {
        const breakingRule = findBreakingRule(update, rules);
        if (breakingRule) {
            invalidUpdates.push({
                update,
                rule: breakingRule,
            });
        }
    }

    const correctedUpdates = invalidUpdates.map(u => correctUpdate(u.update, u.rule, rules));
    return correctedUpdates.map(getMiddleNumber).reduce((p, c) => p += c, 0);
}

function findBreakingRule(update: Update, rules: Rule[]): Rule | undefined {
    for (const rule of rules) {
        if (!doesUpdateRespectRule(update, rule)) {
            return rule;
        }
    }
}

function doesUpdateRespectRule(update: Update, rule: Rule): boolean {
    if (!update.includes(rule.a) && !update.includes(rule.b)) return true;
    if (update.includes(rule.a) && !update.includes(rule.b)) return true;
    if (!update.includes(rule.a) && update.includes(rule.b)) return true;
    const idxA = update.indexOf(rule.a);
    const idxB = update.indexOf(rule.b);
    return idxA < idxB;
}

function correctUpdate(update: Update, breakingRule: Rule, rules: Rule[]): Update {
    const idxA = update.indexOf(breakingRule.a);
    const idxB = update.indexOf(breakingRule.b);
    
    // Since the update is breaking the rule,
    // it means that "a" is after "b",
    // so switch their position.

    update[idxB] = breakingRule.a;
    update[idxA] = breakingRule.b;

    const newBreakingRule = findBreakingRule(update, rules);
    if (newBreakingRule) {
        return correctUpdate(update, newBreakingRule, rules);
    }

    return update;
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