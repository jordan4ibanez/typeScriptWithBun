import { print } from "./source/helpers"
import * as reload from "./source/reload_info"
import * as glfw from "./source/glfw3"
import { CString, FFIType, ptr } from "bun:ffi"

declare global {
  var window: FFIType.ptr | null
}

const global = globalThis



if (!reload.isReload()) {
  print ("entering")
  if (!glfw.init()) {
    throw new Error("FAILED TO INITIALIZE GLFW3!")
  } else {
    print("GLFW3 initialized successfully.")
  }

  print(glfw.getVersion())
  print(glfw.getVersionString())

  global.window = glfw.createWindow(500, 500, "hi there", null, null)

  print(`Window pointer: ${window}`)

  if (!global.window) {
    glfw.terminate()
    throw new Error("FAILED TO INITIALIZE WINDOW!")
  } else {
    print(`Window pointer is: ${window}`)
  }

  glfw.makeContextCurrent(global.window)
}

if (global.window != null) {
  // print("hi")
  glfw.setWindowPosCallback(global.window, (_, x, y) => {
    print(`hi I'm now at: ${x} and ${y}`)
  })

  glfw.setErrorCallback((error_code, description) => {
    print("GLFW ERROR!!!")
    print(error_code)
    const debugError = new CString(description)
    print(debugError.toString())
    print("END GLFW ERROR!!!")
  })
}

//! This is commented out to test if anything segfaults
// let count = 0
// while (!glfw.windowShouldClose(window)) {

if (global.window != null) {
  print("refreshing GLFW")
  glfw.swapBuffers(global.window)
  glfw.pollEvents()
}


//   count++
//   // print(`loop: ${count} `)

//   if (count > 1_000_000) {
//     // print("ahhhh")
//     // glfw.glfwSetWindowShouldClose(window, true)
//   }
  // glfw.pollEvents()
// }

reload.reloadInfo()


let readyToExit = false

if (readyToExit) {
  if (global.window != null) {
    print("destroyed window")
    glfw.destroyWindow(global.window)
  }
  glfw.terminate()
  print("GLFW: Terminated.")
}

reload.successfulRun()