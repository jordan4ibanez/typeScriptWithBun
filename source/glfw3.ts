import { print } from "./helpers"
import { read, ptr, dlopen, FFIType, suffix, CString, JSCallback, Narrow, FFIFunction } from "bun:ffi";

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

//* https://www.glfw.org/docs/latest/group__window.html
export const GLFW_FOCUSED                  = 0x00020001
export const GLFW_ICONIFIED                = 0x00020002
export const GLFW_RESIZABLE                = 0x00020003
export const GLFW_VISIBLE                  = 0x00020004
export const GLFW_DECORATED                = 0x00020005
export const GLFW_AUTO_ICONIFY             = 0x00020006
export const GLFW_FLOATING                 = 0x00020007
export const GLFW_MAXIMIZED                = 0x00020008
export const GLFW_CENTER_CURSOR            = 0x00020009
export const GLFW_TRANSPARENT_FRAMEBUFFER  = 0x0002000A
export const GLFW_HOVERED                  = 0x0002000B
export const GLFW_FOCUS_ON_SHOW            = 0x0002000C
export const GLFW_RED_BITS                 = 0x00021001
export const GLFW_GREEN_BITS               = 0x00021002
export const GLFW_BLUE_BITS                = 0x00021003
export const GLFW_ALPHA_BITS               = 0x00021004
export const GLFW_DEPTH_BITS               = 0x00021005
export const GLFW_STENCIL_BITS             = 0x00021006
export const GLFW_ACCUM_RED_BITS           = 0x00021007
export const GLFW_ACCUM_GREEN_BITS         = 0x00021008
export const GLFW_ACCUM_BLUE_BITS          = 0x00021009
export const GLFW_ACCUM_ALPHA_BITS         = 0x0002100A
export const GLFW_AUX_BUFFERS              = 0x0002100B
export const GLFW_STEREO                   = 0x0002100C
export const GLFW_SAMPLES                  = 0x0002100D
export const GLFW_SRGB_CAPABLE             = 0x0002100E
export const GLFW_REFRESH_RATE             = 0x0002100F
export const GLFW_DOUBLEBUFFER             = 0x00021010
export const GLFW_CLIENT_API               = 0x00022001
export const GLFW_CONTEXT_VERSION_MAJOR    = 0x00022002
export const GLFW_CONTEXT_VERSION_MINOR    = 0x00022003
export const GLFW_CONTEXT_REVISION         = 0x00022004
export const GLFW_CONTEXT_ROBUSTNESS       = 0x00022005
export const GLFW_OPENGL_FORWARD_COMPAT    = 0x00022006
export const GLFW_OPENGL_DEBUG_CONTEXT     = 0x00022007
export const GLFW_OPENGL_PROFILE           = 0x00022008
export const GLFW_CONTEXT_RELEASE_BEHAVIOR = 0x00022009
export const GLFW_CONTEXT_NO_ERROR         = 0x0002200A
export const GLFW_CONTEXT_CREATION_API     = 0x0002200B
export const GLFW_SCALE_TO_MONITOR         = 0x0002200C
export const GLFW_COCOA_RETINA_FRAMEBUFFER = 0x00023001
export const GLFW_COCOA_FRAME_NAME         = 0x00023002
export const GLFW_COCOA_GRAPHICS_SWITCHING = 0x00023003
export const GLFW_X11_CLASS_NAME           = 0x00024001
export const GLFW_X11_INSTANCE_NAME        = 0x00024002

//* Error codes
export const GLFW_NO_ERROR            = 0
export const GLFW_NOT_INITIALIZED     = 0x00010001
export const GLFW_NO_CURRENT_CONTEXT  = 0x00010002
export const GLFW_INVALID_ENUM        = 0x00010003
export const GLFW_INVALID_VALUE       = 0x00010004
export const GLFW_OUT_OF_MEMORY       = 0x00010005
export const GLFW_API_UNAVAILABLE     = 0x00010006
export const GLFW_VERSION_UNAVAILABLE = 0x00010007
export const GLFW_PLATFORM_ERROR      = 0x00010008
export const GLFW_FORMAT_UNAVAILABLE  = 0x00010009
export const GLFW_NO_WINDOW_CONTEXT   = 0x0001000A

//* Whatever this is https://www.glfw.org/docs/latest/group__init.html
export const GLFW_TRUE                  = 1
export const GLFW_FALSE                 = 0
export const GLFW_JOYSTICK_HAT_BUTTONS  = 0x00050001
export const GLFW_COCOA_CHDIR_RESOURCES = 0x00051001
export const GLFW_COCOA_MENUBAR         = 0x00051002

//* https://www.glfw.org/docs/latest/group__gamepad__axes.html
export const GLFW_GAMEPAD_AXIS_LEFT_X        = 0
export const GLFW_GAMEPAD_AXIS_LEFT_Y        = 1
export const GLFW_GAMEPAD_AXIS_RIGHT_X       = 2
export const GLFW_GAMEPAD_AXIS_RIGHT_Y       = 3
export const GLFW_GAMEPAD_AXIS_LEFT_TRIGGER  = 4
export const GLFW_GAMEPAD_AXIS_RIGHT_TRIGGER = 5
export const GLFW_GAMEPAD_AXIS_LAST          = GLFW_GAMEPAD_AXIS_RIGHT_TRIGGER

//* https://www.glfw.org/docs/latest/group__gamepad__buttons.html
export const GLFW_GAMEPAD_BUTTON_A            = 0
export const GLFW_GAMEPAD_BUTTON_B            = 1
export const GLFW_GAMEPAD_BUTTON_X            = 2
export const GLFW_GAMEPAD_BUTTON_Y            = 3
export const GLFW_GAMEPAD_BUTTON_LEFT_BUMPER  = 4
export const GLFW_GAMEPAD_BUTTON_RIGHT_BUMPER = 5
export const GLFW_GAMEPAD_BUTTON_BACK         = 6
export const GLFW_GAMEPAD_BUTTON_START        = 7
export const GLFW_GAMEPAD_BUTTON_GUIDE        = 8
export const GLFW_GAMEPAD_BUTTON_LEFT_THUMB   = 9
export const GLFW_GAMEPAD_BUTTON_RIGHT_THUMB  = 10
export const GLFW_GAMEPAD_BUTTON_DPAD_UP      = 11
export const GLFW_GAMEPAD_BUTTON_DPAD_RIGHT   = 12
export const GLFW_GAMEPAD_BUTTON_DPAD_DOWN    = 13
export const GLFW_GAMEPAD_BUTTON_DPAD_LEFT    = 14
export const GLFW_GAMEPAD_BUTTON_LAST         = GLFW_GAMEPAD_BUTTON_DPAD_LEFT
export const GLFW_GAMEPAD_BUTTON_CROSS        = GLFW_GAMEPAD_BUTTON_A
export const GLFW_GAMEPAD_BUTTON_CIRCLE       = GLFW_GAMEPAD_BUTTON_B
export const GLFW_GAMEPAD_BUTTON_SQUARE       = GLFW_GAMEPAD_BUTTON_X
export const GLFW_GAMEPAD_BUTTON_TRIANGLE     = GLFW_GAMEPAD_BUTTON_Y

//* https://www.glfw.org/docs/latest/group__hat__state.html
export const GLFW_HAT_CENTERED   = 0
export const GLFW_HAT_UP         = 1
export const GLFW_HAT_RIGHT      = 2
export const GLFW_HAT_DOWN       = 4
export const GLFW_HAT_LEFT       = 8
export const GLFW_HAT_RIGHT_UP   = (GLFW_HAT_RIGHT | GLFW_HAT_UP)
export const GLFW_HAT_RIGHT_DOWN = (GLFW_HAT_RIGHT | GLFW_HAT_DOWN)
export const GLFW_HAT_LEFT_UP    = (GLFW_HAT_LEFT | GLFW_HAT_UP)
export const GLFW_HAT_LEFT_DOWN  = (GLFW_HAT_LEFT | GLFW_HAT_DOWN)

//* https://www.glfw.org/docs/latest/group__joysticks.html
export const GLFW_JOYSTICK_1    = 0
export const GLFW_JOYSTICK_2    = 1
export const GLFW_JOYSTICK_3    = 2
export const GLFW_JOYSTICK_4    = 3
export const GLFW_JOYSTICK_5    = 4
export const GLFW_JOYSTICK_6    = 5
export const GLFW_JOYSTICK_7    = 6
export const GLFW_JOYSTICK_8    = 7
export const GLFW_JOYSTICK_9    = 8
export const GLFW_JOYSTICK_10   = 9
export const GLFW_JOYSTICK_11   = 10
export const GLFW_JOYSTICK_12   = 11
export const GLFW_JOYSTICK_13   = 12
export const GLFW_JOYSTICK_14   = 13
export const GLFW_JOYSTICK_15   = 14
export const GLFW_JOYSTICK_16   = 15
export const GLFW_JOYSTICK_LAST = GLFW_JOYSTICK_16

//* https://www.glfw.org/docs/latest/group__keys.html
export const GLFW_KEY_UNKNOWN       = -1
export const GLFW_KEY_SPACE         = 32
export const GLFW_KEY_APOSTROPHE    = 39 /* ' */
export const GLFW_KEY_COMMA         = 44 /* , */
export const GLFW_KEY_MINUS         = 45 /* - */
export const GLFW_KEY_PERIOD        = 46 /* . */
export const GLFW_KEY_SLASH         = 47 /* / */
export const GLFW_KEY_0             = 48
export const GLFW_KEY_1             = 49
export const GLFW_KEY_2             = 50
export const GLFW_KEY_3             = 51
export const GLFW_KEY_4             = 52
export const GLFW_KEY_5             = 53
export const GLFW_KEY_6             = 54
export const GLFW_KEY_7             = 55
export const GLFW_KEY_8             = 56
export const GLFW_KEY_9             = 57
export const GLFW_KEY_SEMICOLON     = 59 /* ; */
export const GLFW_KEY_EQUAL         = 61 /* = */
export const GLFW_KEY_A             = 65
export const GLFW_KEY_B             = 66
export const GLFW_KEY_C             = 67
export const GLFW_KEY_D             = 68
export const GLFW_KEY_E             = 69
export const GLFW_KEY_F             = 70
export const GLFW_KEY_G             = 71
export const GLFW_KEY_H             = 72
export const GLFW_KEY_I             = 73
export const GLFW_KEY_J             = 74
export const GLFW_KEY_K             = 75
export const GLFW_KEY_L             = 76
export const GLFW_KEY_M             = 77
export const GLFW_KEY_N             = 78
export const GLFW_KEY_O             = 79
export const GLFW_KEY_P             = 80
export const GLFW_KEY_Q             = 81
export const GLFW_KEY_R             = 82
export const GLFW_KEY_S             = 83
export const GLFW_KEY_T             = 84
export const GLFW_KEY_U             = 85
export const GLFW_KEY_V             = 86
export const GLFW_KEY_W             = 87
export const GLFW_KEY_X             = 88
export const GLFW_KEY_Y             = 89
export const GLFW_KEY_Z             = 90
export const GLFW_KEY_LEFT_BRACKET  = 91 /* [ */
export const GLFW_KEY_BACKSLASH     = 92 /* \ */
export const GLFW_KEY_RIGHT_BRACKET = 93 /* ] */
export const GLFW_KEY_GRAVE_ACCENT  = 96 /* ` */
export const GLFW_KEY_WORLD_1       = 161 /* non-US #1 */
export const GLFW_KEY_WORLD_2       = 162 /* non-US #2 */
export const GLFW_KEY_ESCAPE        = 256
export const GLFW_KEY_ENTER         = 257
export const GLFW_KEY_TAB           = 258
export const GLFW_KEY_BACKSPACE     = 259
export const GLFW_KEY_INSERT        = 260
export const GLFW_KEY_DELETE        = 261
export const GLFW_KEY_RIGHT         = 262
export const GLFW_KEY_LEFT          = 263
export const GLFW_KEY_DOWN          = 264
export const GLFW_KEY_UP            = 265
export const GLFW_KEY_PAGE_UP       = 266
export const GLFW_KEY_PAGE_DOWN     = 267
export const GLFW_KEY_HOME          = 268
export const GLFW_KEY_END           = 269
export const GLFW_KEY_CAPS_LOCK     = 280
export const GLFW_KEY_SCROLL_LOCK   = 281
export const GLFW_KEY_NUM_LOCK      = 282
export const GLFW_KEY_PRINT_SCREEN  = 283
export const GLFW_KEY_PAUSE         = 284
export const GLFW_KEY_F1            = 290
export const GLFW_KEY_F2            = 291
export const GLFW_KEY_F3            = 292
export const GLFW_KEY_F4            = 293
export const GLFW_KEY_F5            = 294
export const GLFW_KEY_F6            = 295
export const GLFW_KEY_F7            = 296
export const GLFW_KEY_F8            = 297
export const GLFW_KEY_F9            = 298
export const GLFW_KEY_F10           = 299
export const GLFW_KEY_F11           = 300
export const GLFW_KEY_F12           = 301
export const GLFW_KEY_F13           = 302
export const GLFW_KEY_F14           = 303
export const GLFW_KEY_F15           = 304
export const GLFW_KEY_F16           = 305
export const GLFW_KEY_F17           = 306
export const GLFW_KEY_F18           = 307
export const GLFW_KEY_F19           = 308
export const GLFW_KEY_F20           = 309
export const GLFW_KEY_F21           = 310
export const GLFW_KEY_F22           = 311
export const GLFW_KEY_F23           = 312
export const GLFW_KEY_F24           = 313
export const GLFW_KEY_F25           = 314
export const GLFW_KEY_KP_0          = 320
export const GLFW_KEY_KP_1          = 321
export const GLFW_KEY_KP_2          = 322
export const GLFW_KEY_KP_3          = 323
export const GLFW_KEY_KP_4          = 324
export const GLFW_KEY_KP_5          = 325
export const GLFW_KEY_KP_6          = 326
export const GLFW_KEY_KP_7          = 327
export const GLFW_KEY_KP_8          = 328
export const GLFW_KEY_KP_9          = 329
export const GLFW_KEY_KP_DECIMAL    = 330
export const GLFW_KEY_KP_DIVIDE     = 331
export const GLFW_KEY_KP_MULTIPLY   = 332
export const GLFW_KEY_KP_SUBTRACT   = 333
export const GLFW_KEY_KP_ADD        = 334
export const GLFW_KEY_KP_ENTER      = 335
export const GLFW_KEY_KP_EQUAL      = 336
export const GLFW_KEY_LEFT_SHIFT    = 340
export const GLFW_KEY_LEFT_CONTROL  = 341
export const GLFW_KEY_LEFT_ALT      = 342
export const GLFW_KEY_LEFT_SUPER    = 343
export const GLFW_KEY_RIGHT_SHIFT   = 344
export const GLFW_KEY_RIGHT_CONTROL = 345
export const GLFW_KEY_RIGHT_ALT     = 346
export const GLFW_KEY_RIGHT_SUPER   = 347
export const GLFW_KEY_MENU          = 348
export const GLFW_KEY_LAST          = GLFW_KEY_MENU

//* https://www.glfw.org/docs/latest/group__mods.html
export const GLFW_MOD_SHIFT     = 0x0001
export const GLFW_MOD_CONTROL   = 0x0002
export const GLFW_MOD_ALT       = 0x0004
export const GLFW_MOD_SUPER     = 0x0008
export const GLFW_MOD_CAPS_LOCK = 0x0010
export const GLFW_MOD_NUM_LOCK  = 0x0020

//* https://www.glfw.org/docs/latest/group__buttons.html
export const GLFW_MOUSE_BUTTON_1      = 0
export const GLFW_MOUSE_BUTTON_2      = 1
export const GLFW_MOUSE_BUTTON_3      = 2
export const GLFW_MOUSE_BUTTON_4      = 3
export const GLFW_MOUSE_BUTTON_5      = 4
export const GLFW_MOUSE_BUTTON_6      = 5
export const GLFW_MOUSE_BUTTON_7      = 6
export const GLFW_MOUSE_BUTTON_8      = 7
export const GLFW_MOUSE_BUTTON_LAST   = GLFW_MOUSE_BUTTON_8
export const GLFW_MOUSE_BUTTON_LEFT   = GLFW_MOUSE_BUTTON_1
export const GLFW_MOUSE_BUTTON_RIGHT  = GLFW_MOUSE_BUTTON_2
export const GLFW_MOUSE_BUTTON_MIDDLE = GLFW_MOUSE_BUTTON_3

//* https://www.glfw.org/docs/latest/group__shapes.html
export const GLFW_ARROW_CURSOR     = 0x00036001
export const GLFW_IBEAM_CURSOR     = 0x00036002
export const GLFW_CROSSHAIR_CURSOR = 0x00036003
export const GLFW_HAND_CURSOR      = 0x00036004
export const GLFW_HRESIZE_CURSOR   = 0x00036005
export const GLFW_VRESIZE_CURSOR   = 0x00036006

//* https://www.glfw.org/docs/latest/group__input.html
export const GLFW_RELEASE = 0
export const GLFW_PRESS   = 1
export const GLFW_REPEAT  = 2

// Let's load that library.
const { 
  symbols: {
    glfwInit,
    glfwTerminate,
    glfwGetVersion,
    glfwGetVersionString,
    glfwDefaultWindowHints,
    glfwWindowHint,
    glfwWindowHintString,
    glfwCreateWindow,
    glfwDestroyWindow,
    glfwWindowShouldClose,
    glfwSetWindowShouldClose,
    glfwSetWindowTitle,
    glfwSetWindowIcon,
    glfwGetWindowPos,
    glfwSetWindowPos,
    glfwGetWindowSize,
    glfwSetWindowSizeLimits,
    glfwSetWindowAspectRatio,
    glfwSetWindowSize,
    glfwGetFramebufferSize,
    glfwGetWindowFrameSize,
    glfwGetWindowContentScale,
    glfwGetWindowOpacity,
    glfwSetWindowOpacity,
    glfwIconifyWindow,
    glfwRestoreWindow,
    glfwMaximizeWindow,
    glfwShowWindow,
    glfwHideWindow,
    glfwFocusWindow,
    glfwRequestWindowAttention,
    glfwGetWindowMonitor,
    glfwSetWindowMonitor,
    glfwGetWindowAttrib,
    glfwSetWindowAttrib,
    glfwSetWindowUserPointer,
    glfwGetWindowUserPointer,
    glfwSetWindowPosCallback,
    glfwSetWindowSizeCallback,
    glfwSetWindowCloseCallback,
    glfwSetWindowRefreshCallback,
    glfwSetWindowFocusCallback,
    glfwSetWindowIconifyCallback,
    glfwSetWindowMaximizeCallback,
    glfwSetFramebufferSizeCallback,
    glfwSetWindowContentScaleCallback,
    glfwPollEvents,
    glfwWaitEvents,
    glfwWaitEventsTimeout,
    glfwPostEmptyEvent,
    glfwSwapBuffers,
    glfwGetMonitors,
    glfwGetPrimaryMonitor,
    glfwGetMonitorPos,
    glfwGetMonitorWorkarea,
    glfwGetMonitorPhysicalSize,
    glfwGetMonitorContentScale,
    glfwGetMonitorName,
    glfwSetMonitorUserPointer,
    glfwGetMonitorUserPointer,
    glfwSetMonitorCallback,
    glfwGetVideoModes,
    glfwGetVideoMode
  },

} = dlopen(path, {

  //* Begin: https://www.glfw.org/docs/latest/group__init.html

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
    returns: FFIType.ptr,
  },

  //* BEGIN: https://www.glfw.org/docs/latest/group__window.html#ga3555a418df92ad53f917597fe2f64aeb
  
  //? BEGIN WINDOW
   
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

  //? BEGIN MONITOR

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
    returns: FFIType.ptr
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
    returns: FFIType.ptr
  },

  glfwGetVideoMode: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },
})

//* dlopen has a limit of 64 functions per call, so move into next scope.

const { 
  symbols: {
    glfwSetGamma,
    glfwGetGammaRamp,
    glfwSetGammaRamp,
    glfwMakeContextCurrent,
    glfwGetCurrentContext,
    glfwSwapInterval,
    glfwExtensionSupported,
    glfwGetProcAddress,
    glfwInitHint,
    glfwGetError,
    glfwSetErrorCallback,
    glfwGetInputMode,
    glfwSetInputMode,
    glfwRawMouseMotionSupported,
    glfwGetKeyName,
    glfwGetKeyScancode,
    glfwGetKey,
    glfwGetMouseButton,
    glfwGetCursorPos,
    glfwSetCursorPos,
    glfwCreateCursor,
    glfwCreateStandardCursor,
    glfwDestroyCursor,
    glfwSetCursor,
    glfwSetKeyCallback,
    glfwSetCharCallback,
    glfwSetCharModsCallback,
    glfwSetMouseButtonCallback,
    glfwSetCursorPosCallback,
    glfwSetCursorEnterCallback,
    glfwSetScrollCallback,
    glfwSetDropCallback,
    glfwJoystickPresent,
    glfwGetJoystickAxes,
    glfwGetJoystickButtons,
    glfwGetJoystickHats,
    glfwGetJoystickName,
    glfwGetJoystickGUID,
    glfwSetJoystickUserPointer,
    glfwGetJoystickUserPointer,
    glfwJoystickIsGamepad,
    glfwSetJoystickCallback,
    glfwUpdateGamepadMappings,
    glfwGetGamepadName,
    glfwGetGamepadState,
    glfwSetClipboardString,
    glfwGetClipboardString,
    glfwGetTime,
    glfwSetTime,
    glfwGetTimerValue,
    glfwGetTimerFrequency
  },

} = dlopen(path, {   
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

  //* Begin: https://www.glfw.org/docs/latest/group__context.html

  glfwMakeContextCurrent: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetCurrentContext: {
    args: [],
    returns: FFIType.ptr
  },

  glfwSwapInterval: {
    args: [FFIType.int],
    returns: FFIType.void
  },

  glfwExtensionSupported: {
    args: [FFIType.cstring],
    returns: FFIType.int
  },

  glfwGetProcAddress: {
    args: [FFIType.cstring],
    returns: FFIType.ptr
  },

  //* Begin: https://www.glfw.org/docs/latest/group__init.html

  glfwInitHint: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwGetError: {
    args: [FFIType.ptr],
    returns: FFIType.int
  },

  glfwSetErrorCallback: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },

  //* Begin: https://www.glfw.org/docs/latest/group__input.html
  
  glfwGetInputMode: {
    args: [FFIType.ptr, FFIType.int],
    returns: FFIType.int
  },

  glfwSetInputMode: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.void
  },

  glfwRawMouseMotionSupported: {
    args: [],
    returns: FFIType.int
  },

  glfwGetKeyName: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.ptr
  },

  glfwGetKeyScancode: {
    args: [FFIType.int],
    returns: FFIType.int
  },

  glfwGetKey: {
    args: [FFIType.ptr, FFIType.int],
    returns: FFIType.int
  },

  glfwGetMouseButton: {
    args: [FFIType.int, FFIType.int],
    returns: FFIType.int
  },

  glfwGetCursorPos: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetCursorPos: {
    args: [FFIType.ptr, FFIType.double, FFIType.double],
    returns: FFIType.void
  },

  glfwCreateCursor: {
    args: [FFIType.ptr, FFIType.int, FFIType.int],
    returns: FFIType.ptr
  },

  glfwCreateStandardCursor: {
    args: [FFIType.int],
    returns: FFIType.ptr
  },

  glfwDestroyCursor: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetCursor: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwSetKeyCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetCharCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetCharModsCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetMouseButtonCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetCursorPosCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetCursorEnterCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetScrollCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwSetDropCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwJoystickPresent: {
    args: [FFIType.int],
    returns: FFIType.int
  },

  glfwGetJoystickAxes: {
    args: [FFIType.int, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwGetJoystickButtons: {
    args: [FFIType.int, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwGetJoystickHats: {
    args: [FFIType.int, FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwGetJoystickName: {
    args: [FFIType.int],
    returns: FFIType.ptr
  },

  glfwGetJoystickGUID: {
    args: [FFIType.int],
    returns: FFIType.ptr
  },

  glfwSetJoystickUserPointer: {
    args: [FFIType.int, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetJoystickUserPointer: {
    args: [FFIType.int],
    returns: FFIType.ptr
  },

  glfwJoystickIsGamepad: {
    args: [FFIType.int],
    returns: FFIType.int
  },

  glfwSetJoystickCallback: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwUpdateGamepadMappings: {
    args: [FFIType.ptr],
    returns: FFIType.int
  },

  glfwGetGamepadName: {
    args: [FFIType.int],
    returns: FFIType.ptr
  },

  glfwGetGamepadState: {
    args: [FFIType.int, FFIType.ptr],
    returns: FFIType.int
  },

  glfwSetClipboardString: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },

  glfwGetClipboardString: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },

  glfwGetTime: {
    args: [],
    returns: FFIType.double
  },

  glfwSetTime: {
    args: [FFIType.double],
    returns: FFIType.void
  },

  glfwGetTimerValue: {
    args: [],
    returns: FFIType.uint64_t
  },

  glfwGetTimerFrequency: {
    args: [],
    returns: FFIType.uint64_t
  },

})


// Everything is wrapped for safety and so I don't have to tear my hair out.

export function init(): boolean {
  return glfwInit()
}

export function terminate(): boolean {
  return glfwTerminate()
}

export function getVersion(): number[] {
  // Have internal pointers, auto referenced into C function.
  let major    = new Int32Array(1)
  let minor    = new Int32Array(1)
  let revision = new Int32Array(1)
  glfwGetVersion(major, minor, revision)
  return [major[0], minor[0], revision[0]]
}

export function getVersionString(): CString {
  let versionStringPointer = glfwGetVersionString()
  if (versionStringPointer == null) {
    throw new Error("GLFW ERROR! version string was null!")
  }
  return new CString(versionStringPointer)
}

//? BEGIN WINDOW

export function defaultWindowHints() {
  glfwDefaultWindowHints()
}


export function windowHint(hint: number, value: number) {
  glfwWindowHint(hint, value)
}

export function windowHintString(hint: number, value: string) {
  const hintBuffer = toBuffer(value)
  glfwWindowHintString(hint, hintBuffer)
}

export function createWindow(width: number, height: number, title: string, monitor: FFIType.ptr | null, share: FFIType.ptr | null): FFIType.ptr | null {
  const titleBuffer = toBuffer(title)
  return glfwCreateWindow(width, height, titleBuffer, monitor, share)
}

export function destroyWindow(window: FFIType.ptr) {
  glfwDestroyWindow(window)
}

export function windowShouldClose(window: FFIType.ptr): boolean {
  return glfwWindowShouldClose(window) == GLFW_TRUE
}

export function setWindowShouldClose(window: FFIType.ptr, shouldClose: boolean) {
  glfwSetWindowShouldClose(window, shouldClose ? 1 : 0)
}

export function setWindowTitle(window: FFIType.ptr, title: string) {
  const titleBuffer = toBuffer(title)
  glfwSetWindowTitle(window, titleBuffer)
}

export function setWindowIcon(window: FFIType.ptr, count: number, images: FFIType.ptr) {
  glfwSetWindowIcon(window, count, images)
}

export function getWindowPos(window: FFIType.ptr): number[] {
  let xpos = new Int32Array(1)
  let ypos = new Int32Array(1)
  glfwGetWindowPos(window, xpos, ypos)
  return [xpos[0], ypos[0]]
}

export function setWindowPos(window: FFIType.ptr, xpos: number, ypos: number) {
  glfwSetWindowPos(window, xpos, ypos)
}

export function getWindowSize(window: FFIType.ptr): number[] {
  let width  = new Int32Array(1)
  let height = new Int32Array(1)
  glfwGetWindowSize(window, width, height)
  return [width[0], height[0]]
}

export function setWindowSizeLimits(window: FFIType.ptr, minwidth: number, minheight: number, maxwidth: number, maxheight: number) {
  glfwSetWindowSizeLimits(window, minwidth, minheight, maxwidth, maxheight)
}

export function setWindowAspectRatio(window: FFIType.ptr, numer: number, denom: number) {
  glfwSetWindowAspectRatio(window, numer, denom)
}

export function setWindowSize(window: FFIType.ptr, width: number, height: number) {
  glfwSetWindowSize(window, width, height)
}

export function getFramebufferSize(window: FFIType.ptr): number[] {
  let width  = new Int32Array(1)
  let height = new Int32Array(1)
  glfwGetFramebufferSize(window, width, height)
  return [width[0], height[0]]
}

export function getWindowFrameSize(window: FFIType.ptr): number[] {
  let left   = new Int32Array(1)
  let top    = new Int32Array(1)
  let right  = new Int32Array(1)
  let bottom = new Int32Array(1)
  glfwGetWindowFrameSize(window, left, top, right, bottom)
  return [left[0], top[0], right[0], bottom[0]]
} 

export function getWindowContentScale(window: FFIType.ptr): number[] {
  let xscale = new Int32Array(1)
  let yscale = new Int32Array(1)
  glfwGetWindowContentScale(window, xscale, yscale)
  return [xscale[0], yscale[0]]
}

export function getWindowOpacity(window: FFIType.ptr): number {
  return glfwGetWindowOpacity(window)
}

export function setWindowOpacity(window: FFIType, opacity: number) {
  glfwSetWindowOpacity(window, opacity)
}

export function iconifyWindow(window: FFIType.ptr) {
  glfwIconifyWindow(window)
}

export function restoreWindow(window: FFIType.ptr) {
  glfwRestoreWindow(window)
}

export function maximizeWindow(window: FFIType.ptr) {
  glfwMaximizeWindow(window)
}

export function showWindow(window: FFIType.ptr) {
  glfwShowWindow(window)
}

export function hideWindow(window: FFIType.ptr) {
  glfwHideWindow(window)
}

export function focusWindow(window: FFIType.ptr) {
  glfwFocusWindow(window)
}

export function requestWindowAttention(window: FFIType.ptr) {
  glfwRequestWindowAttention(window)
}
//* Returns a GLFWmonitor pointer. Or null. Very dramatic.
export function getWindowMonitor(window: FFIType.ptr): FFIType.ptr | null {
  return glfwGetWindowMonitor(window)
}

export function setWindowMonitor(window: FFIType.ptr, monitor: FFIType.ptr, xpos: number, ypos: number, width: number, height: number, refreshRate: number) {
  glfwSetWindowMonitor(window, monitor, xpos, ypos, width, height, refreshRate)
}

export function getWindowAttrib(window: FFIType.ptr, attrib: number): number {
  return glfwGetWindowAttrib(window, attrib)
}

export function setWindowAttrib(window: FFIType.ptr, attrib: number, value: number) {
  glfwSetWindowAttrib(window, attrib, value)
}

export function setWindowUserPointer(window: FFIType.ptr, pointer: FFIType.ptr) {
  //! This function is very dangerous.
  glfwSetWindowUserPointer(window, pointer)
}

export function getWindowUserPointer(window: FFIType.ptr): FFIType.ptr | null {
  return glfwGetWindowUserPointer(window)
}

//! BEGIN CALLBACKS!

//* note: A callback is a pointer. See line 14613 of types.d.ts!


// You pass this a lambda and you get a nice safe object you can wait until the end to free. 
// TODO: Document this like a normal person.

export function setWindowPosCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, xpos: number, ypos: number) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetWindowPosCallback(window, callbackObject.ptr)

  // And now you can keep it safe until you want to free it. :)
  //! Make sure you free (close()) the old callback before you set a new one
  //! or else, you'll have a memory leak.
  return callbackObject
}
//* That's all the documentation I'm going to do for an example.
//* This will be redocumented with JSDoc or TSDoc or whatever it's called.

export function setWindowSizeCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, width: number, height: number) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetWindowSizeCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setWindowCloseCallback(window: FFIType.ptr, callback: (window: FFIType.ptr) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr],
      returns: FFIType.void,
    }
  )

  glfwSetWindowCloseCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setWindowRefreshCallback(window: FFIType.ptr, callback: (window: FFIType.ptr) => void): JSCallback {
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr],
      returns: FFIType.void,
    }
  )

  glfwSetWindowRefreshCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setWindowFocusCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, focused: FFIType.int) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetWindowFocusCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setWindowIconifyCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, iconified: FFIType.int) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetWindowIconifyCallback(window, callbackObject.ptr)
  
  return callbackObject
}

export function setWindowMaximizeCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, maximized: FFIType.int) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetWindowMaximizeCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setFramebufferSizeCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, width: FFIType.int, height: FFIType.int) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetFramebufferSizeCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setWindowContentScaleCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, xscale: FFIType.float, yscale: FFIType.float) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.float, FFIType.float],
      returns: FFIType.void,
    }
  )

  glfwSetWindowContentScaleCallback(window, callbackObject.ptr)

  return callbackObject
}

//! END CALLBACKS

export function pollEvents() {
  glfwPollEvents()
}

export function waitEvents() {
  glfwWaitEvents()
}

export function waitEventsTimeout(timeout: number) {
  glfwWaitEventsTimeout(timeout)
}

export function postEmptyEvent() {
  glfwPostEmptyEvent()
}

export function swapBuffers(window: FFIType.ptr) {
  glfwSwapBuffers(window)
}

//? BEGIN MONITORS

export function getMonitors(): FFIType.ptr[] | null {
  //TODO: test this thing. Make a safety wrapper! This is too raw!
  //FIXME: https://media.tenor.com/YHKWHhNCDOsAAAAC/ramsay-raw.gif
  let count = new Int32Array(1)
  let pointerArrayPointer = glfwGetMonitors(count)

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
export function getPrimaryMonitor(): FFIType.ptr | null {
  return glfwGetPrimaryMonitor()
}

export function getMonitorPos(monitor: FFIType.ptr): number[] {
  let xpos = new Int32Array(1)
  let ypos = new Int32Array(1)

  glfwGetMonitorPos(monitor, xpos, ypos)

  return [xpos[0], ypos[0]]
}

export function getMonitorWorkarea(monitor: FFIType.ptr): number[] {
  let xpos   = new Int32Array(1)
  let ypos   = new Int32Array(1)
  let width  = new Int32Array(1)
  let height = new Int32Array(1)

  glfwGetMonitorWorkarea(monitor, xpos, ypos, width, height)

  return [xpos[0], ypos[0], width[0], height[0]]
}

export function getMonitorPhysicalSize(monitor: FFIType.ptr): number[] {
  let widthMM = new Int32Array(1)
  let heightMM = new Int32Array(1)
  glfwGetMonitorPhysicalSize(monitor, widthMM, heightMM)

  return [widthMM[0], heightMM[0]]
}

export function getMonitorContentScale(monitor: FFIType.ptr): number[] {
  let xscale = new Int32Array(1)
  let yscale = new Int32Array(1)
  glfwGetMonitorContentScale(monitor, xscale, yscale)

  return [xscale[0], yscale[0]]
}

export function getMonitorName(monitor: FFIType.ptr): CString {
  let monitorNamePointer = glfwGetMonitorName(monitor)
  if (monitorNamePointer == null) {
    throw new Error("GLFW ERROR: monitor name is null!")
  }
  return new CString(monitorNamePointer)
}

export function setMonitorUserPointer(monitor: FFIType.ptr, pointer: FFIType.ptr) {
  glfwSetMonitorUserPointer(monitor, pointer)
}

export function getMonitorUserPointer(monitor: FFIType.ptr): FFIType.ptr | null {
  return glfwGetMonitorUserPointer(monitor)
}

export function setMonitorCallback(callback: (monitor: FFIType.ptr, event: number) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetMonitorCallback(callbackObject.ptr)

  return callbackObject
}

export function getVideoModes(monitor: FFIType.ptr): number[] | null {
  
  let count = new Int32Array(1)

  let vidModeArray = glfwGetVideoModes(monitor, count)

  if (count[0] == 0 || vidModeArray == null) {
    return null
  }

  let modeArray = new Array(count[0])

  for (let i = 0; i < count[0]; i++) {
    // I heard you like to just pile on unsafeness, here you go.
    //* Assume 64 bit operating system because it's 2023
    modeArray[i] = read.ptr(vidModeArray, 8 * i)
  }

  // Returning an array of available modes.
  return modeArray
}

export function getVideoMode(monitor: FFIType.ptr): FFIType.ptr | null {
  return glfwGetVideoMode(monitor)
}

export function setGamma(monitor: FFIType.ptr, gamma: number) {
  glfwSetGamma(monitor, gamma)
}

export function getGammaRamp(monitor: FFIType.ptr): FFIType.ptr | null {
  return glfwGetGammaRamp(monitor)
}

export function setGammaRamp(monitor: FFIType.ptr, ramp: FFIType.ptr) {
  glfwSetGammaRamp(monitor, ramp)
}

//* begin https://www.glfw.org/docs/latest/group__context.html

export function makeContextCurrent(window: FFIType.ptr) {
  glfwMakeContextCurrent(window)
}

export function getCurrentContext(): FFIType.ptr | null {
  return glfwGetCurrentContext()
}

export function swapInterval(interval: number) {
  glfwSwapInterval(interval)
}

export function extensionSupported(extension: string): boolean {
  let extensionBuffer = toBuffer(extension)
  return glfwExtensionSupported(extensionBuffer) == GLFW_TRUE
}

export function getProcAddress(procname: string): FFIType.ptr | null {
  let procnameBuffer = toBuffer(procname)
  return glfwGetProcAddress(procnameBuffer)
}

//* Begin: https://www.glfw.org/docs/latest/group__init.html

export function initHint(hint: number, value: number) {
  glfwInitHint(hint, value)
}

export function getError(): [number, string] {
  //* This will return [GLFW_ERROR, error explanation]
  let rawBuffer = Buffer.alloc(1024, " ")
  let glfwError = glfwGetError(rawBuffer)
  let usableString = rawBuffer.toString()

  return [glfwError, usableString]
}

export function setErrorCallback(callback: (error_code: number, description: FFIType.ptr) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.int, FFIType.ptr],
      returns: FFIType.void,
    }
  )

  glfwSetErrorCallback(callbackObject.ptr)

  return callbackObject
}

//* Begin: https://www.glfw.org/docs/3.3/group__input.html

export function getInputMode(window: FFIType.ptr, mode: number): number {
  return glfwGetInputMode(window, mode)
}

export function setInputMode(window: FFIType.ptr, mode: FFIType.int, value: FFIType.int) {
  glfwSetInputMode(window, mode, value)
}

export function rawMouseMotionSupported(): boolean {
  return glfwRawMouseMotionSupported() == GLFW_TRUE
}




const [GLFW_VERSION_MAJOR,
       GLFW_VERSION_MINOR,
       GLFW_VERSION_REVISION] = getVersion()

export {
  path as GFLW_PATH,
  GLFW_VERSION_MAJOR,
  GLFW_VERSION_MINOR,
  GLFW_VERSION_REVISION,
}