import { print } from "./source/helpers"
import { CString, FFIType } from "bun:ffi"
import * as reload from "./source/reload_info"
import * as glfw from "./source/glfw3"

declare global {
  var window: FFIType.ptr
}

const global = globalThis


//? So this is so the game doesn't spawn 50 different GLFW contexts
if (!reload.isReload()) {
  print ("entering")

  if (!glfw.init()) {
    throw new Error("FAILED TO INITIALIZE GLFW3!")
  } else {
    print("GLFW3 initialized successfully.")
  }

  print(glfw.getVersion())
  print(glfw.getVersionString())


  // Typescript is pretty cool :)
  global.window = (() => {
     let gottenPointer = glfw.createWindow(500, 500, "hi there", null, null)
     if (gottenPointer == null) {
      throw new Error("Failed to initialize glfw window!")
     }
     return gottenPointer
  })()

  print(`Window pointer: ${window}`)

  if (global.window == null) {
    glfw.terminate()
    throw new Error("FAILED TO INITIALIZE WINDOW!")
  } else {
    print(`Window pointer is: ${window}`)
  }

  glfw.makeContextCurrent(global.window)

} else {
  //* We want the hot reload to reset the window close state!
  glfw.setWindowShouldClose(window, false)
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

if (global.window == null) {
  throw new Error("Error: Window is null!")
}

while (!glfw.windowShouldClose(global.window)) {

  let i = Math.random()
  print(`refreshing GLFW: ${i}`)
  print("another test")
  glfw.swapBuffers(global.window)
  glfw.pollEvents()

  if (glfw.getKey(window, glfw.KEY_F1) == glfw.TRUE) {
    break;
  }
}

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

print("exiting")