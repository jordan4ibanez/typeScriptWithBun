import { FFIType, suffix } from "bun:ffi"

// OpenGL Supa Dupa library. I hope.

export default {}

const path = `libGL.${suffix}`;

//* Cross references
// https://www.khronos.org/opengl/wiki/OpenGL_Type
// https://hackage.haskell.org/package/OpenGLRaw-3.3.4.1/docs/Graphics-GL-Types.html
// https://docs.rs/gl/latest/gl/types/type.GLhalf.html
//          GLType       TSType            Bits       Description
export type GLboolean  = boolean        // 1+       | A boolean value, either GL_TRUE or GL_FALSE  
export type GLbyte     = FFIType.i8     // 8        | Signed, 2's complement binary integer  GL_BYTE
export type GLubyte    = FFIType.u8     // 8        | Unsigned binary integer  GL_UNSIGNED_BYTE
export type GLshort    = FFIType.i16    // 16       | Signed, 2's complement binary integer  GL_SHORT
export type GLushort   = FFIType.u16    // 16       | Unsigned binary integer  GL_UNSIGNED_SHORT
export type GLint      = FFIType.int    // 32       | Signed, 2's complement binary integer  GL_INT
export type GLuint     = FFIType.u32    // 32       | Unsigned binary integer  GL_UNSIGNED_INT
export type GLfixed    = FFIType.int    // 32       | Signed, 2's complement 16.16 integer  GL_FIXED
export type GLint64    = FFIType.i64    // 64       | Signed, 2's complement binary integer  
export type GLuint64   = FFIType.u64    // 64       | Unsigned binary integer  
export type GLsizei    = FFIType.u32    // 32       | A non-negative binary integer, for sizes.  
export type GLenum     = FFIType.u32    // 32       | An OpenGL enumerator value  
export type GLintptr   = FFIType.ptr    // ptrbits​1 | Signed, 2's complement binary integer  
export type GLsizeiptr = FFIType.ptr    // ptrbits​1 | Non-negative binary integer size, for memory offsets and ranges  
export type GLsync     = FFIType.ptr    // ptrbits​1 | Sync Object handle  
export type GLbitfield = FFIType.u32    // 32       | A bitfield value  
export type GLhalf     = FFIType.u16    // 16       | An IEEE-754 floating-point value  GL_HALF_FLOAT
export type GLfloat    = FFIType.float  // 32       | An IEEE-754 floating-point value  GL_FLOAT
export type GLclampf   = FFIType.float  // 32       | An IEEE-754 floating-point value, clamped to the range [0,1]  
export type GLdouble   = FFIType.double // 64       | An IEEE-754 floating-point value  GL_DOUBLE
export type GLclampd   = FFIType.double // 64       | An IEEE-754 floating-point value, clamped to the range [0,1]  



// Begin this monster.
/*
Implementation note: All functions are input in the order they appear in Khronos' documentation.
https://registry.khronos.org/OpenGL-Refpages/gl4/

If I missed anything: Please let me know!
*/


//* This is a helper function to automatically null (\0) terminate a string.
function toBuffer(input: string) {
  return Buffer.from(input + '\0')
}