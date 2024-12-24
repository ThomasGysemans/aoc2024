import { getInput } from "..";

type Vec = {
    x: number,
    y: number
}

export default function code() {
    const input = getInput();
    const lines = input.split("\n");
    const width = lines[0].length;
    const height = lines.length;

    const exploredPositions = new Set<string>();
    let currentPos = findGuard(lines, width, height)!;
    let movement: Vec = { y: -1, x: 0 };

    while (true) {
        exploredPositions.add(posToString(currentPos));
        const nextPos = applyMovement(currentPos, movement);
        if (nextPos.y < 0 || nextPos.y >= height || nextPos.x < 0 || nextPos.x >= width) {
            break;
        } else if (lines[nextPos.y]?.[nextPos.x] === "#") {
            movement = turnMovement(movement);
        } else {
            currentPos = nextPos;
        }
    }
    
    return exploredPositions.size;
}

function applyMovement(position: Vec, movement: Vec): Vec {
    return {
        x: position.x + movement.x,
        y: position.y + movement.y,
    };
}

function turnMovement(movement: Vec): Vec {
    if (movement.y === -1) return { y: 0, x: 1 };
    if (movement.x === 1) return { y: 1, x: 0 };
    if (movement.y === 1) return { y: 0, x: -1 };
    else return { y: -1, x: 0 };
}

function findGuard(lines: string[], w: number, h: number): Vec | undefined {
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (lines[y][x] === "^") {
                return {
                    x,
                    y
                };
            }
        }
    }
}

function posToString(pos: Vec): string {
    return `${pos.x};${pos.y}`;
}