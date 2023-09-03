let count = 0;
let prev: number;

export function getRuntimeId() {
    const now = Date.now();
    if (now === prev) {
        count++;
    } else {
        count = 0;
        prev = now;
    }
    return `${now}_${count}`;
}
