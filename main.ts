import { print } from "./source/helpers"
import { reloadInfo } from "./source/reload_info"


import { dlopen, FFIType, suffix } from "bun:ffi";

let global = globalThis

const path = `libglfw.${suffix}`;

print(`GLFW3: ${path}`)

const {
  symbols: {
    glfwGetVersionString,
  }
} = dlopen(
  path, // a library name or file path
  {
    glfwGetVersionString: {
      // no arguments, returns a string
      args: [],
      returns: FFIType.cstring,
    },
  },
);




function main() {
  reloadInfo()
}

let running = true

let count = 0

while (running) {
  main()
  count++
  if (count > 0) {
    running = false
  }
}

failedReloads -= 1