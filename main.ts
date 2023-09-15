import { print } from "./source/helpers"
import { reloadInfo } from "./source/reload_info"
import * as glfw from "./source/glfw3"

let global = globalThis


if (!glfw.glfwInit()) {
  throw new Error("FAILED TO INITIALIZE GLFW3!!!")
} else {
  print("GLFW3 initialized successfully. Yay.")
}

// print(glfw.glfwGetVersion())
// print(glfw.glfwGetVersionString())

// print(glfw.glfwInit())
// print(glfw.glfwTerminate())



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