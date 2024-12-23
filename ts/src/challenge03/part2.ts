import { getInput } from "..";

const NUMBERS = "1234567890";

export default function code() {
    const input = getInput();

    let allowed = true;
    let sum = 0;
    let i = 0;

    main: while (i < input.length) {
        if (input[i] === "d") {
            if (input[++i] === "o") {
                i++;
                if (input[i] === "(" && input[++i] === ")") {
                    allowed = true;
                } else if (input[i] === "n" && input[++i] === "'" && input[++i] === "t" && input[++i] === "(" && input[++i] === ")") {
                    allowed = false;
                }
            }
        } else if (allowed) {
            if (input[i] === "m") {
                if (input[++i] === "u" && input[++i] === "l" && input[++i] === "(") {
                    i++;
                    let a = "";
                    let b = "";
                    while (i < input.length && input[i] !== ",") {
                        if (!NUMBERS.includes(input[i])) {
                            continue main;
                        }
                        a += input[i];
                        i++;
                    }
                    if (a && input[i] === ",") {
                        i++;
                        while (i < input.length && input[i] !== ")" && NUMBERS.includes(input[i])) {
                            b += input[i++];
                        }
                        if (b && input[i] === ")") {
                            const nA = parseInt(a);
                            const nB = parseInt(b);
                            if (!isNaN(nA) && !isNaN(nB)) {
                                sum += nA * nB;
                            }
                        }
                    }
                }
            }
        }
        i++;
    }

    return sum;
}