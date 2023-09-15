import { print } from "./source/helpers"
import { reloadInfo } from "./source/reload_info"
import * as glfw from "./source/glfw3"
import { CString, FFIType, ptr } from "bun:ffi"

let global = globalThis


if (!glfw.glfwInit()) {
  throw new Error("FAILED TO INITIALIZE GLFW3!")
} else {
  print("GLFW3 initialized successfully.")
}

print(glfw.glfwGetVersion())
print(glfw.glfwGetVersionString())

let window = glfw.glfwCreateWindow(500, 500, "hi there", null, null)

print(`Window pointer: ${window}`)

if (!window) {
  glfw.glfwTerminate()
  throw new Error("FAILED TO INITIALIZE WINDOW!")
} else {
  print(`Window pointer is: ${window}`)
}

glfw.glfwSetWindowPosCallback(window, (_, x, y) => {
  print(`hi I'm now at: ${x} and ${y}`)
})

glfw.glfwMakeContextCurrent(window)


let count = 0
while (!glfw.glfwWindowShouldClose(window)) {

  glfw.glfwSwapBuffers(window)
  count++
  // print(count)

  if (count > 1_000_000) {
    // print("ahhhh")
    // glfw.glfwSetWindowShouldClose(window, true)
  }
  glfw.glfwPollEvents()
}

glfw.glfwTerminate()
print("GLFW: Terminated.")