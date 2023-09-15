import { print } from "./helpers"
import { dlopen, FFIType, suffix } from "bun:ffi";

export default {}

const path = `libglfw.${suffix}`;

print(`GLFW3: ${path}`)

// Let's load that library.
const VERBOSE_LIB = dlopen( path,{
  glfwGetVersionString: {
    args: [],
    returns: FFIType.cstring,
  },
  glfwInit: {
    args: [],
    returns: FFIType.bool,
  },
  glfwTerminate: {
    args: [],
    returns: FFIType.bool,
  },
});

// Now we create an internal ref so I don't have to keep typing out lib.symbols.
const lib = VERBOSE_LIB.symbols

// Everything is wrapped for safety and so I don't have to tear my hair out.

export {
  path as GFLW_PATH
}

export function glfwGetVersionString(): string {
  return lib.glfwGetVersionString()
}

export function glfwInit(): boolean {
  return lib.glfwInit()
}

export function glfwTerminate(): boolean {
  return lib.glfwTerminate()
}