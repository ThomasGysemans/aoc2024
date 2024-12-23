import { getInput } from "..";

export default function code() {
    return Array.from(getInput().matchAll(/mul\(\d+,\d+\)/g)).reduce((p, [mul]) => p += parseInt(mul.substring("mul(".length, mul.indexOf(","))) * parseInt(mul.substring(mul.indexOf(",") + 1, mul.indexOf(")"))), 0);
}