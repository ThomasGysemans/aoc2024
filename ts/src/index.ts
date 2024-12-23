import code from "./challenge01/part2";

console.time("Runtime");
try {
    console.log(code());
} finally {
    console.timeEnd("Runtime");
}