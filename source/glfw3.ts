import { print } from "./helpers"
import { read, dlopen, FFIType, suffix, CString, JSCallback } from "bun:ffi";

// These are hand crafted bindings made with love. But not love2d.
// Might be little mistakes, please let me know if so.
// Some functions work slightly differently than C.
// Like, destructuring assignments in TS leverage array returns.

//!FIXME: Glfw types need to be translated!
//! This is optional, can work with raw data, but it could be nicer.

export default {}

const path = `libglfw.${suffix}`;

print(`GLFW3: ${path}`)

// const libcPath = `libc.${suffix}.6`

// print(libcPath)

//* This is a helper function to automatically null (\0) terminate a string.
function toBuffer(input: string) {
  return Buffer.from(input + '\0')
}

//* https://www.glfw.org/docs/latest/group__window.html
export const FOCUSED                  = 0x00020001
export const ICONIFIED                = 0x00020002
export const RESIZABLE                = 0x00020003
export const VISIBLE                  = 0x00020004
export const DECORATED                = 0x00020005
export const AUTO_ICONIFY             = 0x00020006
export const FLOATING                 = 0x00020007
export const MAXIMIZED                = 0x00020008
export const CENTER_CURSOR            = 0x00020009
export const TRANSPARENT_FRAMEBUFFER  = 0x0002000A
export const HOVERED                  = 0x0002000B
export const FOCUS_ON_SHOW            = 0x0002000C
export const RED_BITS                 = 0x00021001
export const GREEN_BITS               = 0x00021002
export const BLUE_BITS                = 0x00021003
export const ALPHA_BITS               = 0x00021004
export const DEPTH_BITS               = 0x00021005
export const STENCIL_BITS             = 0x00021006
export const ACCUM_RED_BITS           = 0x00021007
export const ACCUM_GREEN_BITS         = 0x00021008
export const ACCUM_BLUE_BITS          = 0x00021009
export const ACCUM_ALPHA_BITS         = 0x0002100A
export const AUX_BUFFERS              = 0x0002100B
export const STEREO                   = 0x0002100C
export const SAMPLES                  = 0x0002100D
export const SRGB_CAPABLE             = 0x0002100E
export const REFRESH_RATE             = 0x0002100F
export const DOUBLEBUFFER             = 0x00021010
export const CLIENT_API               = 0x00022001
export const CONTEXT_VERSION_MAJOR    = 0x00022002
export const CONTEXT_VERSION_MINOR    = 0x00022003
export const CONTEXT_REVISION         = 0x00022004
export const CONTEXT_ROBUSTNESS       = 0x00022005
export const OPENGL_FORWARD_COMPAT    = 0x00022006
export const OPENGL_DEBUG_CONTEXT     = 0x00022007
export const OPENGL_PROFILE           = 0x00022008
export const CONTEXT_RELEASE_BEHAVIOR = 0x00022009
export const CONTEXT_NO_ERROR         = 0x0002200A
export const CONTEXT_CREATION_API     = 0x0002200B
export const SCALE_TO_MONITOR         = 0x0002200C
export const COCOA_RETINA_FRAMEBUFFER = 0x00023001
export const COCOA_FRAME_NAME         = 0x00023002
export const COCOA_GRAPHICS_SWITCHING = 0x00023003
export const X11_CLASS_NAME           = 0x00024001
export const X11_INSTANCE_NAME        = 0x00024002

//* Error codes
export const NO_ERROR            = 0
export const NOT_INITIALIZED     = 0x00010001
export const NO_CURRENT_CONTEXT  = 0x00010002
export const INVALID_ENUM        = 0x00010003
export const INVALID_VALUE       = 0x00010004
export const OUT_OF_MEMORY       = 0x00010005
export const API_UNAVAILABLE     = 0x00010006
export const VERSION_UNAVAILABLE = 0x00010007
export const PLATFORM_ERROR      = 0x00010008
export const FORMAT_UNAVAILABLE  = 0x00010009
export const NO_WINDOW_CONTEXT   = 0x0001000A

//* Whatever this is https://www.glfw.org/docs/latest/group__init.html
export const TRUE                  = 1
export const FALSE                 = 0
export const JOYSTICK_HAT_BUTTONS  = 0x00050001
export const COCOA_CHDIR_RESOURCES = 0x00051001
export const COCOA_MENUBAR         = 0x00051002

//* https://www.glfw.org/docs/latest/group__gamepad__axes.html
export const GAMEPAD_AXIS_LEFT_X        = 0
export const GAMEPAD_AXIS_LEFT_Y        = 1
export const GAMEPAD_AXIS_RIGHT_X       = 2
export const GAMEPAD_AXIS_RIGHT_Y       = 3
export const GAMEPAD_AXIS_LEFT_TRIGGER  = 4
export const GAMEPAD_AXIS_RIGHT_TRIGGER = 5
export const GAMEPAD_AXIS_LAST          = GAMEPAD_AXIS_RIGHT_TRIGGER

//* https://www.glfw.org/docs/latest/group__gamepad__buttons.html
export const GAMEPAD_BUTTON_A            = 0
export const GAMEPAD_BUTTON_B            = 1
export const GAMEPAD_BUTTON_X            = 2
export const GAMEPAD_BUTTON_Y            = 3
export const GAMEPAD_BUTTON_LEFT_BUMPER  = 4
export const GAMEPAD_BUTTON_RIGHT_BUMPER = 5
export const GAMEPAD_BUTTON_BACK         = 6
export const GAMEPAD_BUTTON_START        = 7
export const GAMEPAD_BUTTON_GUIDE        = 8
export const GAMEPAD_BUTTON_LEFT_THUMB   = 9
export const GAMEPAD_BUTTON_RIGHT_THUMB  = 10
export const GAMEPAD_BUTTON_DPAD_UP      = 11
export const GAMEPAD_BUTTON_DPAD_RIGHT   = 12
export const GAMEPAD_BUTTON_DPAD_DOWN    = 13
export const GAMEPAD_BUTTON_DPAD_LEFT    = 14
export const GAMEPAD_BUTTON_LAST         = GAMEPAD_BUTTON_DPAD_LEFT
export const GAMEPAD_BUTTON_CROSS        = GAMEPAD_BUTTON_A
export const GAMEPAD_BUTTON_CIRCLE       = GAMEPAD_BUTTON_B
export const GAMEPAD_BUTTON_SQUARE       = GAMEPAD_BUTTON_X
export const GAMEPAD_BUTTON_TRIANGLE     = GAMEPAD_BUTTON_Y

//* https://www.glfw.org/docs/latest/group__hat__state.html
export const HAT_CENTERED   = 0
export const HAT_UP         = 1
export const HAT_RIGHT      = 2
export const HAT_DOWN       = 4
export const HAT_LEFT       = 8
export const HAT_RIGHT_UP   = (HAT_RIGHT | HAT_UP)
export const HAT_RIGHT_DOWN = (HAT_RIGHT | HAT_DOWN)
export const HAT_LEFT_UP    = (HAT_LEFT | HAT_UP)
export const HAT_LEFT_DOWN  = (HAT_LEFT | HAT_DOWN)

//* https://www.glfw.org/docs/latest/group__joysticks.html
export const JOYSTICK_1    = 0
export const JOYSTICK_2    = 1
export const JOYSTICK_3    = 2
export const JOYSTICK_4    = 3
export const JOYSTICK_5    = 4
export const JOYSTICK_6    = 5
export const JOYSTICK_7    = 6
export const JOYSTICK_8    = 7
export const JOYSTICK_9    = 8
export const JOYSTICK_10   = 9
export const JOYSTICK_11   = 10
export const JOYSTICK_12   = 11
export const JOYSTICK_13   = 12
export const JOYSTICK_14   = 13
export const JOYSTICK_15   = 14
export const JOYSTICK_16   = 15
export const JOYSTICK_LAST = JOYSTICK_16

//* https://www.glfw.org/docs/latest/group__keys.html
export const KEY_UNKNOWN       = -1
export const KEY_SPACE         = 32
export const KEY_APOSTROPHE    = 39 /* ' */
export const KEY_COMMA         = 44 /* , */
export const KEY_MINUS         = 45 /* - */
export const KEY_PERIOD        = 46 /* . */
export const KEY_SLASH         = 47 /* / */
export const KEY_0             = 48
export const KEY_1             = 49
export const KEY_2             = 50
export const KEY_3             = 51
export const KEY_4             = 52
export const KEY_5             = 53
export const KEY_6             = 54
export const KEY_7             = 55
export const KEY_8             = 56
export const KEY_9             = 57
export const KEY_SEMICOLON     = 59 /* ; */
export const KEY_EQUAL         = 61 /* = */
export const KEY_A             = 65
export const KEY_B             = 66
export const KEY_C             = 67
export const KEY_D             = 68
export const KEY_E             = 69
export const KEY_F             = 70
export const KEY_G             = 71
export const KEY_H             = 72
export const KEY_I             = 73
export const KEY_J             = 74
export const KEY_K             = 75
export const KEY_L             = 76
export const KEY_M             = 77
export const KEY_N             = 78
export const KEY_O             = 79
export const KEY_P             = 80
export const KEY_Q             = 81
export const KEY_R             = 82
export const KEY_S             = 83
export const KEY_T             = 84
export const KEY_U             = 85
export const KEY_V             = 86
export const KEY_W             = 87
export const KEY_X             = 88
export const KEY_Y             = 89
export const KEY_Z             = 90
export const KEY_LEFT_BRACKET  = 91 /* [ */
export const KEY_BACKSLASH     = 92 /* \ */
export const KEY_RIGHT_BRACKET = 93 /* ] */
export const KEY_GRAVE_ACCENT  = 96 /* ` */
export const KEY_WORLD_1       = 161 /* non-US #1 */
export const KEY_WORLD_2       = 162 /* non-US #2 */
export const KEY_ESCAPE        = 256
export const KEY_ENTER         = 257
export const KEY_TAB           = 258
export const KEY_BACKSPACE     = 259
export const KEY_INSERT        = 260
export const KEY_DELETE        = 261
export const KEY_RIGHT         = 262
export const KEY_LEFT          = 263
export const KEY_DOWN          = 264
export const KEY_UP            = 265
export const KEY_PAGE_UP       = 266
export const KEY_PAGE_DOWN     = 267
export const KEY_HOME          = 268
export const KEY_END           = 269
export const KEY_CAPS_LOCK     = 280
export const KEY_SCROLL_LOCK   = 281
export const KEY_NUM_LOCK      = 282
export const KEY_PRINT_SCREEN  = 283
export const KEY_PAUSE         = 284
export const KEY_F1            = 290
export const KEY_F2            = 291
export const KEY_F3            = 292
export const KEY_F4            = 293
export const KEY_F5            = 294
export const KEY_F6            = 295
export const KEY_F7            = 296
export const KEY_F8            = 297
export const KEY_F9            = 298
export const KEY_F10           = 299
export const KEY_F11           = 300
export const KEY_F12           = 301
export const KEY_F13           = 302
export const KEY_F14           = 303
export const KEY_F15           = 304
export const KEY_F16           = 305
export const KEY_F17           = 306
export const KEY_F18           = 307
export const KEY_F19           = 308
export const KEY_F20           = 309
export const KEY_F21           = 310
export const KEY_F22           = 311
export const KEY_F23           = 312
export const KEY_F24           = 313
export const KEY_F25           = 314
export const KEY_KP_0          = 320
export const KEY_KP_1          = 321
export const KEY_KP_2          = 322
export const KEY_KP_3          = 323
export const KEY_KP_4          = 324
export const KEY_KP_5          = 325
export const KEY_KP_6          = 326
export const KEY_KP_7          = 327
export const KEY_KP_8          = 328
export const KEY_KP_9          = 329
export const KEY_KP_DECIMAL    = 330
export const KEY_KP_DIVIDE     = 331
export const KEY_KP_MULTIPLY   = 332
export const KEY_KP_SUBTRACT   = 333
export const KEY_KP_ADD        = 334
export const KEY_KP_ENTER      = 335
export const KEY_KP_EQUAL      = 336
export const KEY_LEFT_SHIFT    = 340
export const KEY_LEFT_CONTROL  = 341
export const KEY_LEFT_ALT      = 342
export const KEY_LEFT_SUPER    = 343
export const KEY_RIGHT_SHIFT   = 344
export const KEY_RIGHT_CONTROL = 345
export const KEY_RIGHT_ALT     = 346
export const KEY_RIGHT_SUPER   = 347
export const KEY_MENU          = 348
export const KEY_LAST          = KEY_MENU

//* https://www.glfw.org/docs/latest/group__mods.html
export const MOD_SHIFT     = 0x0001
export const MOD_CONTROL   = 0x0002
export const MOD_ALT       = 0x0004
export const MOD_SUPER     = 0x0008
export const MOD_CAPS_LOCK = 0x0010
export const MOD_NUM_LOCK  = 0x0020

//* https://www.glfw.org/docs/latest/group__buttons.html
export const MOUSE_BUTTON_1      = 0
export const MOUSE_BUTTON_2      = 1
export const MOUSE_BUTTON_3      = 2
export const MOUSE_BUTTON_4      = 3
export const MOUSE_BUTTON_5      = 4
export const MOUSE_BUTTON_6      = 5
export const MOUSE_BUTTON_7      = 6
export const MOUSE_BUTTON_8      = 7
export const MOUSE_BUTTON_LAST   = MOUSE_BUTTON_8
export const MOUSE_BUTTON_LEFT   = MOUSE_BUTTON_1
export const MOUSE_BUTTON_RIGHT  = MOUSE_BUTTON_2
export const MOUSE_BUTTON_MIDDLE = MOUSE_BUTTON_3

//* https://www.glfw.org/docs/latest/group__shapes.html
export const ARROW_CURSOR     = 0x00036001
export const IBEAM_CURSOR     = 0x00036002
export const CROSSHAIR_CURSOR = 0x00036003
export const HAND_CURSOR      = 0x00036004
export const HRESIZE_CURSOR   = 0x00036005
export const VRESIZE_CURSOR   = 0x00036006

//* https://www.glfw.org/docs/latest/group__input.html
export const RELEASE = 0
export const PRESS   = 1
export const REPEAT  = 2

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
  return glfwWindowShouldClose(window) == TRUE
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

  let vidModeArrayPointer = glfwGetVideoModes(monitor, count)

  if (count[0] == 0 || vidModeArrayPointer == null) {
    return null
  }

  let modeArray = new Array(count[0])

  for (let i = 0; i < count[0]; i++) {
    // I heard you like to just pile on unsafeness, here you go.
    //* Assume 64 bit operating system because it's 2023
    modeArray[i] = read.ptr(vidModeArrayPointer, 8 * i)
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
  return glfwExtensionSupported(extensionBuffer) == TRUE
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
  //* This will return [ERROR, error explanation]
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
  return glfwRawMouseMotionSupported() == TRUE
}

export function getKeyName(key: number, scancode: number): string | null {
  let keyNamePointer = glfwGetKeyName(key, scancode)
  if (keyNamePointer == null) {
    return null
  }
  const keyName = new CString(keyNamePointer)
  //!Fixme: This needs to be tested!
  return keyName.toString()
}

export function getKeyScancode(key: number): number {
  return glfwGetKeyScancode(key)
}

export function getKey(window: FFIType.ptr, key: number): number {
  return glfwGetKey(window, key)
}

export function getMouseButton(window: FFIType.ptr, button: number): number {
  return glfwGetMouseButton(window, button)
}

export function getCursorPos(window: FFIType.ptr): number[] {
  let xpos = new Float64Array(1)
  let ypos = new Float64Array(1)
  glfwGetCursorPos(window, xpos, ypos)
  return [xpos[0], ypos[0]]
}

export function setCursorPos(window: FFIType.ptr, xpos: number, ypos: number) {
  glfwSetCursorPos(window, xpos, ypos)
}

export function createCursor(image: FFIType.ptr, xhot: number, yhot: number): FFIType.ptr | null {
  return glfwCreateCursor(image, xhot, yhot)
}

export function createStandardCursor(shape: number): FFIType.ptr | null {
  return glfwCreateStandardCursor(shape)
}

export function destroyCursor(cursor: FFIType.ptr) {
  glfwDestroyCursor(cursor)
}

export function setCursor(window: FFIType.ptr, cursor: FFIType.ptr) {
  glfwSetCursor(window, cursor)
}

export function setKeyCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, key: FFIType.int, scancode: FFIType.int, action: FFIType.int, mods: FFIType.int) => void): JSCallback {
 
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetKeyCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setCharCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, codepoint: FFIType.uint32_t) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.uint32_t],
      returns: FFIType.void,
    }
  )

  glfwSetCharCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setCharModsCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, codepoint: FFIType.uint32_t, mods: FFIType.int) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.uint32_t, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetCharModsCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setMouseButtonCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, button: FFIType.int, action: FFIType.int, mods: FFIType.int) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetMouseButtonCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setCursorPosCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, xpos: FFIType.double, ypos: FFIType.double) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.double, FFIType.double],
      returns: FFIType.void,
    }
  )

  glfwSetCursorPosCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setCursorEnterCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, entered: FFIType.int) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetCursorEnterCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setScrollCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, xoffset: FFIType.double, yoffset: FFIType.double) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.double, FFIType.double],
      returns: FFIType.void,
    }
  )

  glfwSetScrollCallback(window, callbackObject.ptr)

  return callbackObject
}

export function setDropCallback(window: FFIType.ptr, callback: (window: FFIType.ptr, path_count: FFIType.int, paths: FFIType.ptr) => void): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.ptr, FFIType.int, FFIType.ptr],
      returns: FFIType.void,
    }
  )

  glfwSetDropCallback(window, callbackObject.ptr)

  return callbackObject
}

export function joystickPresent(jid: number): number {
  return glfwJoystickPresent(jid)
}

export function getJoystickAxes(jid: number): number[] | null {
  
  let count = new Int32Array(1)
  let axisArrayPointer = glfwGetJoystickAxes(jid, count)

  if (count[0] == 0 || axisArrayPointer == null) {
    return null
  }

  let axisArray = new Array(count[0])

  for (let i = 0; i < count[0]; i++) {
    // I heard you like to just pile on unsafeness, here you go.
    //* Assume 64 bit operating system because it's 2023
    axisArray[i] = read.ptr(axisArrayPointer, 8 * i)
  }

  // Returning an array of available axis.
  return axisArray
}

export function getJoystickButtons(jid: number): number[] | null {

  let count = new Int32Array(1)
  let buttonStatePointer = glfwGetJoystickButtons(jid, count)

  if (count[0] == 0 || buttonStatePointer == null) {
    return null
  }

  let buttonArray = new Array(count[0])

  for (let i = 0; i < count[0]; i++) {
    // I heard you like to just pile on unsafeness, here you go.
    //* Assume 64 bit operating system because it's 2023
    //!FIXME: This might be u8 which is 1 byte
    buttonArray[i] = read.ptr(buttonStatePointer, 8 * i)
  }

  // Returning an array of available axis.
  return buttonArray
}

export function getJoystickHats(jid: number): number[] | null {
  
  let count = new Int32Array(1)
  let hatStatePointer = glfwGetJoystickHats(jid, count)

  if (count[0] == 0 || hatStatePointer == null) {
    return null
  }

  let hatArray = new Array(count[0])

  for (let i = 0; i < count[0]; i++) {
    // I heard you like to just pile on unsafeness, here you go.
    //* Assume 64 bit operating system because it's 2023
    //!FIXME: This might be u8 which is 1 byte
    hatArray[i] = read.ptr(hatStatePointer, 8 * i)
  }

  // Returning an array of available axis.
  return hatArray
}

export function getJoystickName(jid: number): string | null {
  let keyNamePointer = glfwGetJoystickName(jid)
  if (keyNamePointer == null) {
    return null
  }
  const keyName = new CString(keyNamePointer)
  //!Fixme: This needs to be tested!
  return keyName.toString()
}

export function getJoystickGUID(jid: number): string | null {
  let keyNamePointer = glfwGetJoystickGUID(jid)
  if (keyNamePointer == null) {
    return null
  }
  const keyName = new CString(keyNamePointer)
  //!Fixme: This needs to be tested!
  return keyName.toString()
}

export function setJoystickUserPointer(jid: number, pointer: FFIType.ptr) {
  glfwSetJoystickUserPointer(jid, pointer)
}

export function getJoystickUserPointer(jid: number): FFIType.ptr | null {
  return glfwGetJoystickUserPointer(jid)
}

export function joystickIsGamepad(jid: number): boolean {
  return glfwJoystickIsGamepad(jid) == TRUE
}

export function setJoystickCallback(callback: (jid: FFIType.int, event: FFIType.int) => void): JSCallback {

  const callbackObject = new JSCallback(
    callback,
    {
      args: [FFIType.int, FFIType.int],
      returns: FFIType.void,
    }
  )

  glfwSetJoystickCallback(callbackObject.ptr)

  return callbackObject
}

export function updateGamepadMappings(map: string): boolean {
  
  let mapBuffer = toBuffer(map)

  let result = glfwUpdateGamepadMappings(mapBuffer)

  return result == TRUE
}

export function getGamepadName(jid: number): string | null {
  let keyNamePointer = glfwGetGamepadName(jid)
  if (keyNamePointer == null) {
    return null
  }
  const keyName = new CString(keyNamePointer)
  //!Fixme: This needs to be tested!
  return keyName.toString()
}

export function getGamepadState(jid: number): [boolean, FFIType.ptr | null] {
  //!FIXME: this is too raw. Don't make me get Gordon Ramsey in here.
  let state = new Int32Array(1)
  let success =  glfwGetGamepadState(jid, state)
  return [success == TRUE, state[0]]
}

export function setClipboardString(window: FFIType.ptr, text: string) {
  let textBuffer = toBuffer(text)
  glfwSetClipboardString(window, textBuffer)
}

export function getClipboardString(window: FFIType.ptr): string | null {

  let cStringPointer = glfwGetClipboardString(window)

  if (cStringPointer == null) {
    return null
  }

  let cString = new CString(cStringPointer)

  //!FIXME: I have no idea if this works!
  return cString.toString()
}

export function getTime(): number {
  return glfwGetTime()
}

export function setTime(time: number) {
  glfwSetTime(time)
}

export function getTimerValue(): bigint {

  return glfwGetTimerValue()
}

export function getTimerFrequency(): bigint {
  return glfwGetTimerFrequency()
}


//! This causes REPL crashes unfortunately :(
// const [VERSION_MAJOR,
//        VERSION_MINOR,
//        VERSION_REVISION] = getVersion()

export {
  path as GFLW_PATH,
  // VERSION_MAJOR,
  // VERSION_MINOR,
  // VERSION_REVISION
}