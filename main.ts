//? I have no idea if you have to import ffi here before other libs that use ffi
import { print } from "./source/helpers"
import * as reload from "./source/reload_info"
import * as glfw from "./source/glfw3"
import * as gl from "./source/opengl"

import { CString, FFIType, JSCallback } from "bun:ffi"


declare global {
  var window: FFIType.ptr
  var glfwErrorCallback: JSCallback
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

  // This will help me figure out what the *@#) is wrong with this
  global.glfwErrorCallback = glfw.setErrorCallback((error_code, description) => {
    let descString = new CString(description)
    print("GLFW ERROR!!")
    print(error_code)
    print(descString)
  })

  glfw.windowHint(glfw.OPENGL_DEBUG_CONTEXT, glfw.TRUE)

  // Typescript is pretty cool :)
  global.window = (() => {
     let gottenPointer = glfw.createWindow(500, 500, "hi there", null, null)
     if (gottenPointer == null) {
      throw new Error("Failed to initialize glfw window!")
     }
     return gottenPointer
  })()


  if (global.window == null) {
    glfw.terminate()
    throw new Error("FAILED TO INITIALIZE WINDOW!")
  } else {
    print(`Window pointer is: ${window}`)
  }

  glfw.makeContextCurrent(global.window)
  print(glfw.getCurrentContext())


  let test = gl.getString(gl.GL_VERSION)
  print("OpenGL version: " + test)


} else {
  print("resetting the window close flag")
  //* We want the hot reload to reset the window close state!
  glfw.setWindowShouldClose(global.window, false)
}

if (global.window != null) {
  // print("hi")
  glfw.setWindowPosCallback(global.window, (_, x, y) => {
    // print(`hi I'm now at: ${x} and ${y}`)
  })


  glfw.setErrorCallback((error_code, description) => {
    print("GLFW ERROR!!!")
    print(error_code)
    const debugError = new CString(description)
    print(debugError.toString())
    print("END GLFW ERROR!!!")
  })
}



// while (!glfw.windowShouldClose(global.window)) {

  gl.clearColor(0.1,0.1,0.5,1)
  gl.clear(gl.GL_COLOR_BUFFER_BIT)
  
  let i = Math.random()
  print(`refreshing GLFW: ${i}`)
  print("another test")
  glfw.swapBuffers(global.window)
  glfw.pollEvents()

  if (glfw.getKey(window, glfw.KEY_F1) == glfw.TRUE) {
    print("cool")
    // break;
  }
// }

// reload.reloadInfo()


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

// print("exiting")

