import { print } from "./helpers"
import { read, ptr, dlopen, FFIType, suffix } from "bun:ffi";

export default {}

const path = `libglfw.${suffix}`;

print(`GLFW3: ${path}`)

// I'm trying to keep this in the same order as it's listed on GLFW.

// Let's load that library.
const VERBOSE_LIB = dlopen( path,{
  glfwInit: {
    args: [],
    returns: FFIType.bool,
  },
  glfwTerminate: {
    args: [],
    returns: FFIType.bool,
  },
  glfwGetVersion: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    // returns: FFIType.bool,
  },
  glfwGetVersionString: {
    args: [],
    returns: FFIType.cstring,
  },
});

// Now we create an internal ref so I don't have to keep typing out lib.symbols.
const lib = VERBOSE_LIB.symbols

// Everything is wrapped for safety and so I don't have to tear my hair out.

export {
  path as GFLW_PATH
}

export function glfwInit(): boolean {
  return lib.glfwInit()
}

export function glfwTerminate(): boolean {
  return lib.glfwTerminate()
}

export function glfwGetVersion(): number[] {
  // Have internal pointers, auto referenced into C function.
  let major    = new Int32Array(1)
  let minor    = new Int32Array(1)
  let revision = new Int32Array(1)
  lib.glfwGetVersion(major, minor, revision)
  return [major[0], minor[0], revision[0]]
}


export function glfwGetVersionString(): string {
  return lib.glfwGetVersionString()
}
