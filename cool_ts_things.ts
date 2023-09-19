let print = console.log;

/**
 * This function will automate globalization of vars.
 * See: https://stackoverflow.com/a/45156405, thanks Saravana!
 * Consider this, a mini macro.
 * This utilizes the TS system for static checking but it IS in JS. (I think)
 * @param state let, var, const.
 * @param name Var or const name.
 * @param assignment A nice default value.
 * @param override If you want bun to override this value every time it reloads. (hot and watch) Defaults to false.
 */
function createGlobal(state: string, name: string, type: string, assignment: any, override?: boolean) {
  // Typechecking in JS, hmm, I feel like there's an easier way to do this.
  let typeChecked = typeof(assignment)

  let miniMacro = `
  if ("${typeChecked}" !== "${type}") {
    throw new Error("createGlobal: FAILED type check! " +
      "Wanted: ${type} | " +
      "Received: ${typeChecked}")
  }

  if (${override}) {
    console.log("OVERRIDING!")
    globalThis.${name} = ${assignment}
  } else {
    console.log("Not overriding")
    globalThis.${name} ??= ${assignment}
  }

  console.log("hi")
  `
  // You can turn this on if you want to see it in action. :D
  // print(miniMacro)

  eval(miniMacro)

  if (assignment) {
    print("Assigned!")
  }

}

createGlobal("var", "test", "number", "hi")

// This is silly
function functionalWhile(condition: (...args: any) => any, execution: (...args: any) => any) {
  if (!condition()) {return}
  execution()
  return functionalWhile(condition, execution)
}

let y = 0
functionalWhile(
  _=>{ return y < 10 },
  _=>{
    print(y)
    y++
  }
)

print("Done")