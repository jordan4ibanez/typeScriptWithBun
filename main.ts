import { print } from "./source/helpers"
import * as reload from "./source/reload_info"
import * as glfw from "./source/glfw3"
import { CString, FFIType } from "bun:ffi"

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


  let windowPrototypePointer = glfw.createWindow(500, 500, "hi there", null, null)

  if (windowPrototypePointer == null){
    throw new Error("FAILED TO INITIALIZE WINDOW!")
  }

  global.window = windowPrototypePointer

  //! Fixme: change the logic below to use the protoype pointer
  print(`Window pointer: ${window}`)

  if (!global.window) {
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

//! This is commented out to test if anything segfaults
// let count = 0
while (!glfw.windowShouldClose(global.window)) {

  let i = Math.random()
  print(`refreshing GLFW: ${i}`)
  glfw.swapBuffers(global.window)
  glfw.pollEvents()
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