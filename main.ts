import { print } from "./source/helpers"

// print("Hello via Bun!");

// I have no idea why I did this but I love it.
// Spells banana
// print(((('b' + "a") + ([['\b'] + 'b' + 'b\n'] ["ba"] + 'ba' + + + [""] - "a" + 'a') * 1 || -1) + "a").toLocaleLowerCase() + "!");

// print("hi")

var test = [];

for (let i = 0; i < 10; i++) {
  test.push(i)
}

test.forEach((i)=>(print(i)))
// print(test)
// print("anything")