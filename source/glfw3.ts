import { print } from "./helpers"
import { read, ptr, dlopen, FFIType, suffix, CString, JSCallback } from "bun:ffi";

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

  glfwCreateWindow: {
    //*    width      , height     , title      , monitor    , share (null = false)   
    args: [FFIType.int, FFIType.int, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },
  glfwMakeContextCurrent: {
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
  glfwSwapBuffers: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },
  glfwPollEvents: {
    args: [],
    returns: FFIType.void
  },
  //! End yelling area, AHHH

  //? BEGIN: https://www.glfw.org/docs/latest/group__window.html#ga3555a418df92ad53f917597fe2f64aeb
   

  //note: A callback is a pointer. See line 14613 of types.d.ts!

  glfwSetWindowPosCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  }

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
export function glfwCreateWindow(width: number, height: number, title: string, monitor: FFIType.ptr | null, share: FFIType.ptr | null): FFIType.ptr | null {
  const blah = Buffer.from(title + '\0')
  return lib.glfwCreateWindow(width, height, blah, monitor, share)

}

export function glfwMakeContextCurrent(window: FFIType.ptr) {
  lib.glfwMakeContextCurrent(window)
}

export function glfwWindowShouldClose(window: FFIType.ptr): boolean {
  //! FIXME: this might not only be 0 false 1 true!
  return lib.glfwWindowShouldClose(window) != 0
}

export function glfwSetWindowShouldClose(window: FFIType.ptr, shouldClose: boolean) {
  lib.glfwSetWindowShouldClose(window, shouldClose ? 1 : 0)
}

export function glfwSwapBuffers(window: FFIType.ptr) {
  lib.glfwSwapBuffers(window)
}

export function glfwPollEvents() {
  lib.glfwPollEvents()
}


//! End yelling again WOOOOOOOOOOOO






// You pass this a lambda and you get a nice safe object you can wait until the end to free. 
// TODO: Document this like a normal person.
export function glfwSetWindowPosCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, xpos: number, ypos: number) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.ptr],
      returns: FFIType.void,
    }
  )

  lib.glfwSetWindowPosCallback(window, callbackObject.ptr)

  // And now you can keep it safe until you want to free it. :)
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