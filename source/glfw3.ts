import { print } from "./helpers"
import { dlopen, FFIType, suffix } from "bun:ffi";


const path = `libglfw.${suffix}`;

print(`GLFW3: ${path}`)

// Let's load that library.
const VERBOSE_LIB = dlopen( path,{
  glfwGetVersionString: {
    args: [],
    returns: FFIType.cstring,
  },
});

// Now we create an internal ref so I don't have to keep typing out lib.symbols.
let lib = VERBOSE_LIB.symbols

// Everything is wrapped for safety and so I don't have to tear my hair out.

export {
  path as GFLW_PATH
}

export function glfwGetVersionString() {
  return lib.glfwGetVersionString()
}