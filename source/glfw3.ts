import { print } from "./helpers"
import { read, ptr, dlopen, FFIType, suffix, CString, JSCallback } from "bun:ffi";

// These are hand crafted bindings made with love. But not love2d.
// Might be little mistakes, please let me know if so.
// Some functions work slightly differently than C.
// Like, destructuring assignments in TS leverage array returns.

/*
Checklist:
1.) window reference  - DONE
2.) monitor reference -
*/

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

//* This is a helper function to automatically null (\0) terminate a string.
function toBuffer(input: string) {
  return Buffer.from(input + '\0')
}

const GLFW_FOCUSED                  = 0x00020001
const GLFW_ICONIFIED                = 0x00020002
const GLFW_RESIZABLE                = 0x00020003
const GLFW_VISIBLE                  = 0x00020004
const GLFW_DECORATED                = 0x00020005
const GLFW_AUTO_ICONIFY             = 0x00020006
const GLFW_FLOATING                 = 0x00020007
const GLFW_MAXIMIZED                = 0x00020008
const GLFW_CENTER_CURSOR            = 0x00020009
const GLFW_TRANSPARENT_FRAMEBUFFER  = 0x0002000A
const GLFW_HOVERED                  = 0x0002000B
const GLFW_FOCUS_ON_SHOW            = 0x0002000C
const GLFW_RED_BITS                 = 0x00021001
const GLFW_GREEN_BITS               = 0x00021002
const GLFW_BLUE_BITS                = 0x00021003
const GLFW_ALPHA_BITS               = 0x00021004
const GLFW_DEPTH_BITS               = 0x00021005
const GLFW_STENCIL_BITS             = 0x00021006
const GLFW_ACCUM_RED_BITS           = 0x00021007
const GLFW_ACCUM_GREEN_BITS         = 0x00021008
const GLFW_ACCUM_BLUE_BITS          = 0x00021009
const GLFW_ACCUM_ALPHA_BITS         = 0x0002100A
const GLFW_AUX_BUFFERS              = 0x0002100B
const GLFW_STEREO                   = 0x0002100C
const GLFW_SAMPLES                  = 0x0002100D
const GLFW_SRGB_CAPABLE             = 0x0002100E
const GLFW_REFRESH_RATE             = 0x0002100F
const GLFW_DOUBLEBUFFER             = 0x00021010
const GLFW_CLIENT_API               = 0x00022001
const GLFW_CONTEXT_VERSION_MAJOR    = 0x00022002
const GLFW_CONTEXT_VERSION_MINOR    = 0x00022003
const GLFW_CONTEXT_REVISION         = 0x00022004
const GLFW_CONTEXT_ROBUSTNESS       = 0x00022005
const GLFW_OPENGL_FORWARD_COMPAT    = 0x00022006
const GLFW_OPENGL_DEBUG_CONTEXT     = 0x00022007
const GLFW_OPENGL_PROFILE           = 0x00022008
const GLFW_CONTEXT_RELEASE_BEHAVIOR = 0x00022009
const GLFW_CONTEXT_NO_ERROR         = 0x0002200A
const GLFW_CONTEXT_CREATION_API     = 0x0002200B
const GLFW_SCALE_TO_MONITOR         = 0x0002200C
const GLFW_COCOA_RETINA_FRAMEBUFFER = 0x00023001
const GLFW_COCOA_FRAME_NAME         = 0x00023002
const GLFW_COCOA_GRAPHICS_SWITCHING = 0x00023003
const GLFW_X11_CLASS_NAME           = 0x00024001
const GLFW_X11_INSTANCE_NAME        = 0x00024002



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
    returns: FFIType.void,
  },
  glfwGetVersionString: {
    args: [],
    returns: FFIType.cstring,
  },

  //* From this point on the documentation just kinda falls apart.
  //* So I just made up ordering as I read through.
  

  //! Please move this to wherever it will belong when the rest of this is laid out.
  //! It is here because I need to test if this thing actually works without crashing.

  glfwMakeContextCurrent: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },
  
  
  
  
  //! End yelling area, AHHH

  //? BEGIN: https://www.glfw.org/docs/latest/group__window.html#ga3555a418df92ad53f917597fe2f64aeb
   
  glfwDefaultWindowHints: {
    args: [],
    returns: FFIType.void
  },

  glfwWindowHint: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwWindowHintString: {
    args: [FFIType.int, FFIType.cstring],
    returns: FFIType.void
  },

  glfwCreateWindow: {
    //*    width      , height     , title      , monitor    , share (null = false)   
    args: [FFIType.int, FFIType.int, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwDestroyWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwWindowShouldClose: {
    args: [FFIType.ptr],
    returns: FFIType.int
  },

  glfwSetWindowShouldClose: {
    args: [FFIType.ptr, FFIType.int],
    returns: FFIType.void
  },

  glfwSetWindowTitle: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.void
  },

  glfwSetWindowIcon: {
    //*    window     , count      , GLFWimage*
    args: [FFIType.ptr, FFIType.int, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetWindowPos: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowPos: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwGetWindowSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowSizeLimits: {
    args: [FFIType.ptr, FFIType.int, FFIType.int, FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwSetWindowAspectRatio: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwSetWindowSize: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwGetFramebufferSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetWindowFrameSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetWindowContentScale: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetWindowOpacity: {
    args: [FFIType.ptr],
    returns: FFIType.float
  },

  glfwSetWindowOpacity: {
    args: [FFIType.ptr, FFIType.float],
    returns: FFIType.void
  },

  glfwIconifyWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwRestoreWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwMaximizeWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwShowWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwHideWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwFocusWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwRequestWindowAttention: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetWindowMonitor: {
    args: [FFIType.ptr],
    //* Returning a GLFWmonitor pointer.
    returns: FFIType.ptr
  },

  glfwSetWindowMonitor: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.int, FFIType.int, FFIType.int, FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwGetWindowAttrib: {
    args: [FFIType.ptr, FFIType.int],
    returns: FFIType.int
  },

  glfwSetWindowAttrib: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwSetWindowUserPointer: {
    //! This function is very dangerous.
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetWindowUserPointer: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },

  //! BEGIN CALLBACKS!

  //* note: A callback is a pointer. See line 14613 of types.d.ts!

  //? Void returns instead of function pointers
  //? because bun has a different style of memory
  //? management.

  glfwSetWindowPosCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowSizeCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowCloseCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowRefreshCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowFocusCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowIconifyCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowMaximizeCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetFramebufferSizeCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetWindowContentScaleCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  //! END CALLBACKS

  glfwPollEvents: {
    args: [],
    returns: FFIType.void
  },

  glfwWaitEvents: {
    args: [],
    returns: FFIType.void
  },

  glfwWaitEventsTimeout: {
    args: [FFIType.double],
    returns: FFIType.void
  },

  glfwPostEmptyEvent: {
    args: [],
    returns: FFIType.void
  },

  glfwSwapBuffers: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  //* Begin https://www.glfw.org/docs/latest/group__monitor.html

  glfwGetMonitors: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwGetPrimaryMonitor: {
    args: [],
    returns: FFIType.ptr
  },

  glfwGetMonitorPos: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetMonitorWorkarea: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetMonitorPhysicalSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetMonitorContentScale: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetMonitorName: {
    args: [FFIType.ptr],
    returns: FFIType.cstring
  },

  glfwSetMonitorUserPointer: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetMonitorUserPointer: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetMonitorCallback: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetVideoModes: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetVideoMode: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetGamma: {
    args: [FFIType.ptr, FFIType.float],
    returns: FFIType.void
  },

  glfwGetGammaRamp: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetGammaRamp: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },




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









//! Please move this to wherever it will belong when the rest of this is laid out.
//! It is here because I need to test if this thing actually works without crashing.
// This will give you back the pointer of the window, very nice. Or nullptr. Not nice.

export function glfwMakeContextCurrent(window: FFIType.ptr) {
  lib.glfwMakeContextCurrent(window)
}










//! End yelling again WOOOOOOOOOOOO




export function glfwDefaultWindowHints() {
  lib.glfwDefaultWindowHints()
}


export function glfwWindowHint(hint: number, value: number) {
  lib.glfwWindowHint(hint, value)
}

export function glfwWindowHintString(hint: number, value: string) {
  const hintBuffer = toBuffer(value)
  lib.glfwWindowHintString(hint, hintBuffer)
}

export function glfwCreateWindow(width: number, height: number, title: string, monitor: FFIType.ptr | null, share: FFIType.ptr | null): FFIType.ptr | null {
  const titleBuffer = toBuffer(title)
  return lib.glfwCreateWindow(width, height, titleBuffer, monitor, share)
}

export function glfwDestroyWindow(window: FFIType.ptr) {
  lib.glfwDestroyWindow(window)
}

export function glfwWindowShouldClose(window: FFIType.ptr): boolean {
  //! FIXME: this might not only be 0 false 1 true!
  return lib.glfwWindowShouldClose(window) != 0
}

export function glfwSetWindowShouldClose(window: FFIType.ptr, shouldClose: boolean) {
  lib.glfwSetWindowShouldClose(window, shouldClose ? 1 : 0)
}

export function glfwSetWindowTitle(window: FFIType.ptr, title: string) {
  const titleBuffer = toBuffer(title)
  lib.glfwSetWindowTitle(window, titleBuffer)
}

export function glfwSetWindowIcon(window: FFIType.ptr, count: number, images: FFIType.ptr) {
  lib.glfwSetWindowIcon(window, count, images)
}

export function glfwGetWindowPos(window: FFIType.ptr): number[] {
  let xpos = new Int32Array(1)
  let ypos = new Int32Array(1)
  lib.glfwGetWindowPos(window, xpos, ypos)
  return [xpos[0], ypos[0]]
}

export function glfwSetWindowPos(window: FFIType.ptr, xpos: number, ypos: number) {
  lib.glfwSetWindowPos(window, xpos, ypos)
}

export function glfwGetWindowSize(window: FFIType.ptr): number[] {
  let width  = new Int32Array(1)
  let height = new Int32Array(1)
  lib.glfwGetWindowSize(window, width, height)
  return [width[0], height[0]]
}

export function glfwSetWindowSizeLimits(window: FFIType.ptr, minwidth: number, minheight: number, maxwidth: number, maxheight: number) {
  lib.glfwSetWindowSizeLimits(window, minwidth, minheight, maxwidth, maxheight)
}

export function glfwSetWindowAspectRatio(window: FFIType.ptr, numer: number, denom: number) {
  lib.glfwSetWindowAspectRatio(window, numer, denom)
}

export function glfwSetWindowSize(window: FFIType.ptr, width: number, height: number) {
  lib.glfwSetWindowSize(window, width, height)
}

export function glfwGetFramebufferSize(window: FFIType.ptr): number[] {
  let width  = new Int32Array(1)
  let height = new Int32Array(1)
  lib.glfwGetFramebufferSize(window, width, height)
  return [width[0], height[0]]
}

export function glfwGetWindowFrameSize(window: FFIType.ptr): number[] {
  let left   = new Int32Array(1)
  let top    = new Int32Array(1)
  let right  = new Int32Array(1)
  let bottom = new Int32Array(1)
  lib.glfwGetWindowFrameSize(window, left, top, right, bottom)
  return [left[0], top[0], right[0], bottom[0]]
} 

export function glfwGetWindowContentScale(window: FFIType.ptr): number[] {
  let xscale = new Int32Array(1)
  let yscale = new Int32Array(1)
  lib.glfwGetWindowContentScale(window, xscale, yscale)
  return [xscale[0], yscale[0]]
}

export function glfwGetWindowOpacity(window: FFIType.ptr): number {
  return lib.glfwGetWindowOpacity(window)
}

export function glfwSetWindowOpacity(window: FFIType, opacity: number) {
  lib.glfwSetWindowOpacity(window, opacity)
}

export function glfwIconifyWindow(window: FFIType.ptr) {
  lib.glfwIconifyWindow(window)
}

export function glfwRestoreWindow(window: FFIType.ptr) {
  lib.glfwRestoreWindow(window)
}

export function glfwMaximizeWindow(window: FFIType.ptr) {
  lib.glfwMaximizeWindow(window)
}

export function glfwShowWindow(window: FFIType.ptr) {
  lib.glfwShowWindow(window)
}

export function glfwHideWindow(window: FFIType.ptr) {
  lib.glfwHideWindow(window)
}

export function glfwFocusWindow(window: FFIType.ptr) {
  lib.glfwFocusWindow(window)
}

export function glfwRequestWindowAttention(window: FFIType.ptr) {
  lib.glfwRequestWindowAttention(window)
}

//* Returns a GLFWmonitor pointer. Or null. Very dramatic.
export function glfwGetWindowMonitor(window: FFIType.ptr): FFIType.ptr | null {
  return lib.glfwGetWindowMonitor(window)
}

export function glfwSetWindowMonitor(window: FFIType.ptr, monitor: FFIType.ptr, xpos: number, ypos: number, width: number, height: number, refreshRate: number) {
  lib.glfwSetWindowMonitor(window, monitor, xpos, ypos, width, height, refreshRate)
}

export function glfwGetWindowAttrib(window: FFIType.ptr, attrib: number): number {
  return lib.glfwGetWindowAttrib(window, attrib)
}

export function glfwSetWindowAttrib(window: FFIType.ptr, attrib: number, value: number) {
  lib.glfwSetWindowAttrib(window, attrib, value)
}

export function glfwSetWindowUserPointer(window: FFIType.ptr, pointer: FFIType.ptr) {
  //! This function is very dangerous.
  lib.glfwSetWindowUserPointer(window, pointer)
}

export function glfwGetWindowUserPointer(window: FFIType.ptr): FFIType.ptr | null {
  return lib.glfwGetWindowUserPointer(window)
}

//! BEGIN CALLBACKS!

//* note: A callback is a pointer. See line 14613 of types.d.ts!



// You pass this a lambda and you get a nice safe object you can wait until the end to free. 
// TODO: Document this like a normal person.

export function glfwSetWindowPosCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, xpos: number, ypos: number) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowPosCallback(window, callbackObject.ptr)

  // And now you can keep it safe until you want to free it. :)
  //! Make sure you free (close()) the old callback before you set a new one
  //! or else, you'll have a memory leak.
  return callbackObject
}
//* That's all the documentation I'm going to do for an example.
//* This will be redocumented with JSDoc or TSDoc or whatever it's called.

export function glfwSetWindowSizeCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, width: number, height: number) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowSizeCallback(window, callbackObject.ptr)

  return callbackObject
}

export function glfwSetWindowCloseCallback(window: FFIType.ptr, callback: (window: FFIType.ptr) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowCloseCallback(window, callbackObject.ptr)

  return callbackObject
}

export function glfwSetWindowRefreshCallback(window: FFIType.ptr, callback: (window: FFIType.ptr) => void): JSCallback {
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowRefreshCallback(window, callbackObject.ptr)

  return callbackObject
}

export function glfwSetWindowFocusCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, focused: FFIType.int) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowFocusCallback(window, callbackObject.ptr)

  return callbackObject
}

export function glfwSetWindowIconifyCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, iconified: FFIType.int) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowIconifyCallback(window, callbackObject.ptr)
  
  return callbackObject
}

export function glfwSetWindowMaximizeCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, maximized: FFIType.int) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowMaximizeCallback(window, callbackObject.ptr)

  return callbackObject
}

export function glfwSetFramebufferSizeCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, width: FFIType.int, height: FFIType.int) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  lib.glfwSetFramebufferSizeCallback(window, callbackObject.ptr)

  return callbackObject
}

export function glfwSetWindowContentScaleCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, xscale: FFIType.float, yscale: FFIType.float) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.float, FFIType.float],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowContentScaleCallback(window, callbackObject.ptr)

  return callbackObject
}

//! END CALLBACKS

export function glfwPollEvents() {
  lib.glfwPollEvents()
}

export function glfwWaitEvents() {
  lib.glfwWaitEvents()
}

export function glfwWaitEventsTimeout(timeout: number) {
  lib.glfwWaitEventsTimeout(timeout)
}

export function glfwPostEmptyEvent() {
  lib.glfwPostEmptyEvent()
}

export function glfwSwapBuffers(window: FFIType.ptr) {
  lib.glfwSwapBuffers(window)
}

export function glfwGetMonitors(): FFIType.ptr[] | null {
  //TODO: test this thing. Make a safety wrapper! This is too raw!
  //FIXME: https://media.tenor.com/YHKWHhNCDOsAAAAC/ramsay-raw.gif
  let count = new Int32Array(1)
  let pointerArrayPointer = lib.glfwGetMonitors(count)

  // I have no idea if this works.
  //TODO: test this garbage!
  if (count[0] == 0 || pointerArrayPointer == null) {
    // You don't have any monitors?!
    return null
  }
  
  let pointerArray = new Array(count[0])

  for (let i = 0; i < count[0]; i++) {
    // I heard you like to just pile on unsafeness, here you go.
    //* Assume 64 bit operating system because it's 2023
    pointerArray[i] = read.ptr(pointerArrayPointer, 8 * i)
  }
  
  // You use this by indexing into the table, and it 
  //...hopefully gives you a monitor pointer
  return pointerArray
}

// See this is a bit more sane, just a normal monitor pointer
export function glfwGetPrimaryMonitor(): FFIType.ptr | null {
  return lib.glfwGetPrimaryMonitor()
}

export function glfwGetMonitorPos(monitor: FFIType.ptr): number[] {
  let xpos = new Int32Array(1)
  let ypos = new Int32Array(1)

  lib.glfwGetMonitorPos(monitor, xpos, ypos)

  return [xpos[0], ypos[0]]
}

export function glfwGetMonitorWorkarea(monitor: FFIType.ptr): number[] {
  let xpos   = new Int32Array(1)
  let ypos   = new Int32Array(1)
  let width  = new Int32Array(1)
  let height = new Int32Array(1)

  lib.glfwGetMonitorWorkarea(monitor, xpos, ypos, width, height)

  return [xpos[0], ypos[0], width[0], height[0]]
}

export function glfwGetMonitorPhysicalSize(monitor: FFIType.ptr): number[] {
  let widthMM = new Int32Array(1)
  let heightMM = new Int32Array(1)
  lib.glfwGetMonitorPhysicalSize(monitor, widthMM, heightMM)

  return [widthMM[0], heightMM[0]]
}

export function glfwGetMonitorContentScale(monitor: FFIType.ptr): number[] {
  let xscale = new Int32Array(1)
  let yscale = new Int32Array(1)
  lib.glfwGetMonitorContentScale(monitor, xscale, yscale)

  return [xscale[0], yscale[0]]
}

export function glfwGetMonitorName(monitor: FFIType.ptr): CString | null {
  return lib.glfwGetMonitorName(monitor)
}

export function glfwSetMonitorUserPointer(monitor: FFIType.ptr, pointer: FFIType.ptr) {
  lib.glfwSetMonitorUserPointer(monitor, pointer)
}

export function glfwGetMonitorUserPointer(monitor: FFIType.ptr): FFIType.ptr | null {
  return lib.glfwGetMonitorUserPointer(monitor)
}

export function glfwSetMonitorCallback(callback: (monitor: FFIType.ptr, event: number) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  lib.glfwSetMonitorCallback(callbackObject.ptr)

  return callbackObject
}

const [GLFW_VERSION_MAJOR,
       GLFW_VERSION_MINOR,
       GLFW_VERSION_REVISION] = glfwGetVersion()

export {
  path as GFLW_PATH,
  GLFW_VERSION_MAJOR,
  GLFW_VERSION_MINOR,
  GLFW_VERSION_REVISION,
  GLFW_FOCUSED,
  GLFW_ICONIFIED,
  GLFW_RESIZABLE,
  GLFW_VISIBLE,
  GLFW_DECORATED,
  GLFW_AUTO_ICONIFY,
  GLFW_FLOATING,
  GLFW_MAXIMIZED,
  GLFW_CENTER_CURSOR,
  GLFW_TRANSPARENT_FRAMEBUFFER,
  GLFW_HOVERED,
  GLFW_FOCUS_ON_SHOW,
  GLFW_RED_BITS,
  GLFW_GREEN_BITS,
  GLFW_BLUE_BITS,
  GLFW_ALPHA_BITS,
  GLFW_DEPTH_BITS,
  GLFW_STENCIL_BITS,
  GLFW_ACCUM_RED_BITS,
  GLFW_ACCUM_GREEN_BITS,
  GLFW_ACCUM_BLUE_BITS,
  GLFW_ACCUM_ALPHA_BITS,
  GLFW_AUX_BUFFERS,
  GLFW_STEREO,
  GLFW_SAMPLES,
  GLFW_SRGB_CAPABLE,
  GLFW_REFRESH_RATE,
  GLFW_DOUBLEBUFFER,
  GLFW_CLIENT_API,
  GLFW_CONTEXT_VERSION_MAJOR,
  GLFW_CONTEXT_VERSION_MINOR,
  GLFW_CONTEXT_REVISION,
  GLFW_CONTEXT_ROBUSTNESS,
  GLFW_OPENGL_FORWARD_COMPAT,
  GLFW_OPENGL_DEBUG_CONTEXT,
  GLFW_OPENGL_PROFILE,
  GLFW_CONTEXT_RELEASE_BEHAVIOR,
  GLFW_CONTEXT_NO_ERROR,
  GLFW_CONTEXT_CREATION_API,
  GLFW_SCALE_TO_MONITOR,
  GLFW_COCOA_RETINA_FRAMEBUFFER,
  GLFW_COCOA_FRAME_NAME,
  GLFW_COCOA_GRAPHICS_SWITCHING,
  GLFW_X11_CLASS_NAME,
  GLFW_X11_INSTANCE_NAME,
}