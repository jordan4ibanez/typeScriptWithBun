import { FFIType, suffix } from "bun:ffi"

// OpenGL Supa Dupa library. I hope.

export default {}

const path = `libGL.${suffix}`;

// https://www.khronos.org/opengl/wiki/OpenGL_Type
export type GLboolean = boolean   // 1+       | A boolean value, either GL_TRUE or GL_FALSE  
export type GLbyte    = FFIType.i8      // 8        | Signed, 2's complement binary integer  GL_BYTE
export type GLubyte   = FFIType.u8     // 8        | Unsigned binary integer  GL_UNSIGNED_BYTE
export type GLshort   = FFIType.i16    // 16       | Signed, 2's complement binary integer  GL_SHORT
export type GLushort  = FFIType.u16  // 16       | Unsigned binary integer  GL_UNSIGNED_SHORT
export type GLint     = FFIType.int  // 32       | Signed, 2's complement binary integer  GL_INT
export type GLuint    = FFIType.u32    // 32       | Unsigned binary integer  GL_UNSIGNED_INT
// GLfixed     // 32       | Signed, 2's complement 16.16 integer  GL_FIXED
export type GLint64   = FFIType.i64    // 64       | Signed, 2's complement binary integer  
export type GLuint64  = FFIType.u64  // 64       | Unsigned binary integer  
// GLsizei     // 32       | A non-negative binary integer, for sizes.  
// GLenum      // 32       | An OpenGL enumerator value  
// GLintptr    // ptrbits​1 | Signed, 2's complement binary integer  
// GLsizeiptr  // ptrbits​1 | Non-negative binary integer size, for memory offsets and ranges  
// GLsync      // ptrbits​1 | Sync Object handle  
// GLbitfield  // 32       | A bitfield value  
// GLhalf      // 16       | An IEEE-754 floating-point value  GL_HALF_FLOAT
// GLfloat     // 32       | An IEEE-754 floating-point value  GL_FLOAT
// GLclampf    // 32       | An IEEE-754 floating-point value, clamped to the range [0,1]  
// GLdouble    // 64       | An IEEE-754 floating-point value  GL_DOUBLE
// GLclampd    // 64       | An IEEE-754 floating-point value, clamped to the range [0,1]  

// Sick
let i: GLboolean = true
