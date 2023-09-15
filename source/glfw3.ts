import { print } from "./helpers"
import { read, ptr, dlopen, FFIType, suffix, CString } from "bun:ffi";

// These are hand crafted bindings made with love. But not love2d.

export default {}

const path = `libglfw.${suffix}`;

print(`GLFW3: ${path}`)

const libcPath = `libc.${suffix}.6`

print(libcPath)

const TESTING = dlopen(libcPath, {
  free: {
    args: [FFIType.ptr],
    return: FFIType.void
  }
})

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
  // From this point on the documentation just kinda falls apart.
  // So I just made up ordering as I read through.
});

// Now we create an internal ref so I don't have to keep typing out lib.symbols.
const lib = VERBOSE_LIB.symbols

// Everything is wrapped for safety and so I don't have to tear my hair out.

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

export function glfwGetVersionString(): CString {
  return lib.glfwGetVersionString()
}


const [GLFW_VERSION_MAJOR,
       GLFW_VERSION_MINOR,
       GLFW_VERSION_REVISION] = glfwGetVersion()

export {
  path as GFLW_PATH,
  GLFW_VERSION_MAJOR,
  GLFW_VERSION_MINOR,
  GLFW_VERSION_REVISION
}