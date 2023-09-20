import { CString, FFIType, JSCallback, dlopen, ptr, suffix } from "bun:ffi"

// OpenGL Supa Dupa library. I hope.

export function forceReload() {
  console.log("OpenGL reloaded!")
}

console.log(`warning: If you are using the "getter" api, it is not implemented.
Please search: F22%%%.,l;'
to know why!`)

export default {}

const path = `libGL.${suffix}`;

//* Cross references
// https://www.khronos.org/opengl/wiki/OpenGL_Type
// https://hackage.haskell.org/package/OpenGLRaw-3.3.4.1/docs/Graphics-GL-Types.html
// https://docs.rs/gl/latest/gl/types/index.html
//           GLType       TSType            Bits       Description
export const GLboolean  = FFIType.bool   // 1+       | A boolean value, either GL_TRUE or GL_FALSE  
export type  GLboolean  = FFIType.bool
export const GLbyte     = FFIType.i8     // 8        | Signed, 2's complement binary integer  GL_BYTE
export type  GLbyte     = FFIType.i8
export const GLubyte    = FFIType.u8     // 8        | Unsigned binary integer  GL_UNSIGNED_BYTE
export type  GLubyte    = FFIType.u8
export const GLshort    = FFIType.i16    // 16       | Signed, 2's complement binary integer  GL_SHORT
export type  GLshort    = FFIType.i16
export const GLushort   = FFIType.u16    // 16       | Unsigned binary integer  GL_UNSIGNED_SHORT
export type  GLushort   = FFIType.u16
export const GLint      = FFIType.int    // 32       | Signed, 2's complement binary integer  GL_INT
export type  GLint      = FFIType.int
export const GLuint     = FFIType.u32    // 32       | Unsigned binary integer  GL_UNSIGNED_INT
export type  GLuint     = FFIType.u32
export const GLfixed    = FFIType.int    // 32       | Signed, 2's complement 16.16 integer  GL_FIXED
export type  GLfixed    = FFIType.int
export const GLint64    = FFIType.i64    // 64       | Signed, 2's complement binary integer  
export type  GLint64    = FFIType.i64
export const GLuint64   = FFIType.u64    // 64       | Unsigned binary integer  
export type  GLuint64   = FFIType.u64
export const GLsizei    = FFIType.u32    // 32       | A non-negative binary integer, for sizes.  
export type  GLsizei    = FFIType.u32
export const GLenum     = FFIType.u32    // 32       | An OpenGL enumerator value  
export type  GLenum     = FFIType.u32
export const GLintptr   = FFIType.int    // ptrbits​1 | Signed, 2's complement binary integer  
export type  GLintptr   = FFIType.int
export const GLsizeiptr = FFIType.int    // ptrbits​1 | Non-negative binary integer size, for memory offsets and ranges  
export type  GLsizeiptr = FFIType.int
export const GLsync     = FFIType.ptr    // ptrbits​1 | Sync Object handle  
export type  GLsync     = FFIType.ptr
export const GLbitfield = FFIType.u32    // 32       | A bitfield value  
export type  GLbitfield = FFIType.u32
export const GLhalf     = FFIType.u16    // 16       | An IEEE-754 floating-point value  GL_HALF_FLOAT
export type  GLhalf     = FFIType.u16
export const GLfloat    = FFIType.float  // 32       | An IEEE-754 floating-point value  GL_FLOAT
export type  GLfloat    = FFIType.float
export const GLclampf   = FFIType.float  // 32       | An IEEE-754 floating-point value, clamped to the range [0,1]  
export type  GLclampf   = FFIType.float
export const GLdouble   = FFIType.double // 64       | An IEEE-754 floating-point value  GL_DOUBLE
export type  GLdouble   = FFIType.double
export const GLclampd   = FFIType.double // 64       | An IEEE-754 floating-point value, clamped to the range [0,1]  
export type  GLclampd   = FFIType.double

export const GL_TRUE  = 1
export const GL_FALSE = 0

// Begin this monster.
/*
Implementation note: All functions are input in the order they appear in Khronos' documentation.
https://registry.khronos.org/OpenGL-Refpages/gl4/

(which is where all the documentation is BTW)

! If I missed anything: Please let me know!
*/


//* These are helper functions to automatically null (\0) terminate a string.
function toBuffer(input: string) {
  return Buffer.from(input + '\0')
}
function blankBuffer() {
  return Buffer.from("")
}

const { 
  symbols: {
    glActiveShaderProgram,
    glActiveTexture,
    glAttachShader,
    glBeginConditionalRender,
    glEndConditionalRender,
    glBeginQuery,
    glEndQuery,
    glBeginQueryIndexed,
    glEndQueryIndexed,
    glBeginTransformFeedback,
    glEndTransformFeedback,
    glBindAttribLocation,
    glBindBuffer,
    glBindBufferBase,
    glBindBufferRange,
    glBindBuffersBase,
    glBindBuffersRange,
    glBindFragDataLocation,
    glBindFragDataLocationIndexed,
    glBindFramebuffer,
    glBindImageTexture,
    glBindImageTextures,
    glBindProgramPipeline,
    glBindRenderbuffer,
    glBindSampler,
    glBindSamplers,
    glBindTexture,
    glBindTextures,
    glBindTextureUnit,
    glBindTransformFeedback,
    glBindVertexArray,
    glBindVertexBuffer,
    glVertexArrayVertexBuffer,
    glBindVertexBuffers,
    glVertexArrayVertexBuffers,
    glBlendColor,
    glBlendEquation,
    glBlendEquationi,
    glBlendEquationSeparate,
    glBlendEquationSeparatei,
    glBlendFunc,
    glBlendFunci,
    glBlendFuncSeparate,
    glBlendFuncSeparatei,
    glBlitFramebuffer,
    glBlitNamedFramebuffer,
    glBufferData,
    glNamedBufferData,
    glBufferStorage,
    glNamedBufferStorage,
    glBufferSubData,
    glNamedBufferSubData,
    glCheckFramebufferStatus,
    glCheckNamedFramebufferStatus,
    glClampColor,
    glClear,
    glClearBufferiv,
    glClearBufferuiv,
    glClearBufferfv,
    glClearBufferfi,
    glClearNamedFramebufferiv,
    glClearNamedFramebufferuiv,
    glClearNamedFramebufferfv,
    glClearNamedFramebufferfi

  }
} = dlopen(path, {

  glActiveShaderProgram: {
    args: [GLuint, GLuint],
    returns: FFIType.void,
  },

  glActiveTexture: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glAttachShader: {
    args: [GLuint, GLuint],
    returns: FFIType.void,
  },

  glBeginConditionalRender: {
    args: [GLuint, GLenum],
    returns: FFIType.void,
  },

  glEndConditionalRender: {
    args: [],
    returns: FFIType.void,
  },

  glBeginQuery: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glEndQuery: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glBeginQueryIndexed: {
    args: [GLenum, GLuint, GLuint],
    returns: FFIType.void,
  },

  glEndQueryIndexed: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glBeginTransformFeedback: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glEndTransformFeedback: {
    args: [],
    returns: FFIType.void,
  },

  glBindAttribLocation: {
    args: [GLuint, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glBindBuffer: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glBindBufferBase: {
    args: [GLenum, GLuint, GLuint],
    returns: FFIType.void,
  },

  glBindBufferRange: {
    args: [GLenum, GLuint, GLuint, GLintptr, GLsizeiptr],
    returns: FFIType.void,
  },

  glBindBuffersBase: {
    args: [GLenum, GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glBindBuffersRange: {
    args: [GLenum, GLuint, GLsizei, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glBindFragDataLocation: {
    args: [GLuint, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glBindFragDataLocationIndexed: {
    args: [GLuint, GLuint, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glBindFramebuffer: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glBindImageTexture: {
    args: [GLuint, GLuint, GLint, GLboolean, GLint, GLenum, GLenum],
    returns: FFIType.void,
  },

  glBindImageTextures: {
    args: [GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glBindProgramPipeline: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glBindRenderbuffer: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glBindSampler: {
    args: [GLuint, GLuint],
    returns: FFIType.void,
  },

  glBindSamplers: {
    args: [GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },
  
  glBindTexture: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glBindTextures: {
    args: [GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glBindTextureUnit: {
    args: [GLuint, GLuint],
    returns: FFIType.void,
  },

  glBindTransformFeedback: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glBindVertexArray: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glBindVertexBuffer: {
    args: [GLuint, GLuint, GLintptr, GLsizei],
    returns: FFIType.void,
  },

  glVertexArrayVertexBuffer: {
    args: [GLuint, GLuint, GLuint, GLintptr, GLsizei],
    returns: FFIType.void,
  },

  glBindVertexBuffers: {
    args: [GLuint, GLsizei, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glVertexArrayVertexBuffers: {
    args: [GLuint, GLuint, GLsizei, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glBlendColor: {
    args: [GLfloat, GLfloat, GLfloat, GLfloat],
    returns: FFIType.void,
  },

  glBlendEquation: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glBlendEquationi: {
    args: [GLuint, GLenum],
    returns: FFIType.void,
  },

  glBlendEquationSeparate: {
    args: [GLenum, GLenum],
    returns: FFIType.void,
  },

  glBlendEquationSeparatei: {
    args: [GLuint, GLenum, GLenum],
    returns: FFIType.void,
  },

  glBlendFunc: {
    args: [GLenum, GLenum],
    returns: FFIType.void,
  },

  glBlendFunci: {
    args: [GLuint, GLenum, GLenum],
    returns: FFIType.void,
  },

  glBlendFuncSeparate: {
    args: [GLenum, GLenum, GLenum, GLenum],
    returns: FFIType.void,
  },

  glBlendFuncSeparatei: {
    args: [GLuint, GLenum, GLenum, GLenum, GLenum],
    returns: FFIType.void,
  },

  glBlitFramebuffer: {
    args: [GLint, GLint, GLint, GLint, GLint, GLint, GLint, GLint, GLbitfield, GLenum],
    returns: FFIType.void,
  },

  glBlitNamedFramebuffer: {
    args: [GLuint, GLuint, GLint, GLint, GLint, GLint, GLint, GLint, GLint, GLint, GLbitfield, GLenum],
    returns: FFIType.void,
  },

  glBufferData: {
    args: [GLenum, GLsizeiptr, FFIType.ptr, GLenum],
    returns: FFIType.void,
  },

  glNamedBufferData: {
    args: [GLuint, GLsizeiptr, FFIType.ptr, GLenum],
    returns: FFIType.void,
  },

  glBufferStorage: {
    args: [GLenum, GLsizeiptr, FFIType.ptr, GLbitfield],
    returns: FFIType.void,
  },

  glNamedBufferStorage: {
    args: [GLuint, GLsizeiptr, FFIType.ptr, GLbitfield],
    returns: FFIType.void,
  },

  glBufferSubData: {
    args: [GLenum, GLintptr, GLsizeiptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glNamedBufferSubData: {
    args: [GLuint, GLintptr, GLsizeiptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glCheckFramebufferStatus: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glCheckNamedFramebufferStatus: {
    args: [GLuint, GLenum],
    returns: FFIType.void,
  },

  glClampColor: {
    args: [GLenum, GLenum],
    returns: FFIType.void,
  },

  glClear: {
    args: [GLbitfield],
    returns: FFIType.void,
  },

  glClearBufferiv: {
    args: [GLenum, GLint, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearBufferuiv: {
    args: [GLenum, GLint, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearBufferfv: {
    args: [GLenum, GLint, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearBufferfi: {
    args: [GLenum, GLint, GLfloat, GLint],
    returns: FFIType.void,
  },

  glClearNamedFramebufferiv: {
    args: [GLuint, GLenum, GLint, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearNamedFramebufferuiv: {
    args: [GLuint, GLenum, GLint, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearNamedFramebufferfv: {
    args: [GLuint, GLenum, GLint, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearNamedFramebufferfi: {
    args: [GLuint, GLenum, GLint, GLfloat, GLint],
    returns: FFIType.void,
  },

})

//* Bun FFI allows 64 function defs in one call, move onto the next.

const { 
  symbols: {
    glClearBufferSubData,
    glClearNamedBufferSubData,
    glClearColor,
    glClearDepth,
    glClearDepthf,
    glClearBufferData,
    glClearNamedBufferData,
    glClearStencil,
    glClearTexImage,
    glClearTexSubImage,
    glClientWaitSync,
    glClipControl,
    glColorMask,
    glColorMaski,
    glCompileShader,
    glCompressedTexImage1D,
    glCompressedTexImage2D,
    glCompressedTexImage3D,
    glCompressedTexSubImage1D,
    glCompressedTextureSubImage1D,
    glCompressedTexSubImage2D,
    glCompressedTextureSubImage2D,
    glCompressedTexSubImage3D,
    glCompressedTextureSubImage3D,
    glCopyBufferSubData,
    glCopyNamedBufferSubData,
    glCopyImageSubData,
    glCopyTexImage1D,
    glCopyTexImage2D,
    glCopyTexSubImage1D,
    glCopyTextureSubImage1D,
    glCopyTexSubImage2D,
    glCopyTextureSubImage2D,
    glCopyTexSubImage3D,
    glCopyTextureSubImage3D,
    glCreateBuffers,
    glCreateFramebuffers,
    glCreateProgram,
    glCreateProgramPipelines,
    glCreateQueries,
    glCreateRenderbuffers,
    glCreateSamplers,
    glCreateShader,
    glCreateShaderProgramv,
    glCreateTextures,
    glCreateTransformFeedbacks,
    glCreateVertexArrays,
    glCullFace,

    glDebugMessageCallback,
    glDebugMessageControl,
    glDebugMessageInsert,
    glDeleteBuffers,
    glDeleteFramebuffers,
    glDeleteProgram,
    glDeleteProgramPipelines,
    glDeleteQueries,
    glDeleteRenderbuffers,
    glDeleteSamplers,
    glDeleteShader,
    glDeleteSync,
    glDeleteTextures,
    glDeleteTransformFeedbacks,
    glDeleteVertexArrays,
    glDepthFunc
  }
} = dlopen(path, {

  glClearBufferSubData: {
    args: [GLenum, GLenum, GLintptr, GLsizeiptr, GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearNamedBufferSubData: {
    args: [GLuint, GLenum, GLintptr, GLsizeiptr, GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearColor: {
    args: [GLfloat, GLfloat, GLfloat, GLfloat],
    returns: FFIType.void,
  },

  glClearDepth: {
    args: [GLdouble],
    returns: FFIType.void,
  },

  glClearDepthf: {
    args: [GLfloat],
    returns: FFIType.void,
  },

  glClearBufferData: {
    args: [GLenum, GLenum, GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearNamedBufferData: {
    args: [GLuint, GLenum, GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearStencil: {
    args: [GLint],
    returns: FFIType.void,
  },

  glClearTexImage: {
    args: [GLuint, GLint, GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glClearTexSubImage: {
    args: [GLuint, GLint, GLint, GLint, GLint, GLsizei, GLsizei, GLsizei, GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glClientWaitSync: {
    args: [GLsync, GLbitfield, GLuint64],
    returns: FFIType.void,
  },

  glClipControl: {
    args: [GLenum, GLenum],
    returns: FFIType.void,
  },

  glColorMask: {
    args: [GLboolean, GLboolean, GLboolean, GLboolean],
    returns: FFIType.void,
  },

  glColorMaski: {
    args: [GLuint, GLboolean, GLboolean, GLboolean, GLboolean],
    returns: FFIType.void,
  },

  glCompileShader: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glCompressedTexImage1D: {
    args: [GLenum, GLint, GLenum, GLsizei, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTexImage2D: {
    args: [GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTexImage3D: {
    args: [GLenum, GLint, GLenum, GLsizei, GLsizei, GLsizei, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTexSubImage1D: {
    args: [GLenum, GLint, GLint, GLsizei, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTextureSubImage1D: {
    args: [GLuint, GLint, GLint, GLsizei, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTexSubImage2D: {
    args: [GLenum, GLint, GLint, GLint, GLsizei, GLsizei, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTextureSubImage2D: {
    args: [GLuint, GLint, GLint, GLint, GLsizei, GLsizei, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTexSubImage3D: {
    args: [GLenum, GLint, GLint, GLint, GLint, GLsizei, GLsizei, GLsizei, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCompressedTextureSubImage3D: {
    args: [GLuint, GLint, GLint, GLint, GLint, GLsizei, GLsizei, GLsizei, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCopyBufferSubData: {
    args: [GLenum, GLenum, GLintptr, GLintptr, GLsizeiptr],
    returns: FFIType.void,
  },

  glCopyNamedBufferSubData: {
    args: [GLuint, GLuint, GLintptr, GLintptr, GLsizeiptr],
    returns: FFIType.void,
  },

  glCopyImageSubData: {
    args: [GLuint, GLenum, GLint, GLint, GLint, GLint, GLuint, GLenum, GLint, GLint, GLint, GLint, GLsizei, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glCopyTexImage1D: {
    args: [GLenum, GLint, GLenum, GLint, GLint, GLsizei, GLint],
    returns: FFIType.void,
  },

  glCopyTexImage2D: {
    args: [GLenum, GLint, GLenum, GLint, GLint, GLsizei, GLsizei, GLint],
    returns: FFIType.void,
  },
  
  glCopyTexSubImage1D: {
    args: [GLenum, GLint, GLint, GLint, GLint, GLsizei],
    returns: FFIType.void,
  },

  glCopyTextureSubImage1D: {
    args: [GLuint, GLint, GLint, GLint, GLint, GLsizei],
    returns: FFIType.void,
  },

  glCopyTexSubImage2D: {
    args: [GLenum, GLint, GLint, GLint, GLint, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glCopyTextureSubImage2D: {
    args: [GLuint, GLint, GLint, GLint, GLint, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glCopyTexSubImage3D: {
    args: [GLenum, GLint, GLint, GLint, GLint, GLint, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glCopyTextureSubImage3D: {
    args: [GLuint, GLint, GLint, GLint, GLint, GLint, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glCreateBuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateFramebuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateProgram: {
    args: [],
    returns: GLuint,
  },

  glCreateProgramPipelines: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateQueries: {
    args: [GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateRenderbuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateSamplers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateShader: {
    args: [GLenum],
    returns: GLuint,
  },

  glCreateShaderProgramv: {
    args: [GLenum, GLsizei, FFIType.ptr],
    returns: GLuint,
  },

  glCreateTextures: {
    args: [GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateTransformFeedbacks: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCreateVertexArrays: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glCullFace: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glDebugMessageCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  
  glDebugMessageControl: {
    args: [GLenum, GLenum, GLenum, GLsizei, FFIType.ptr, GLboolean],
    returns: FFIType.void,
  },

  glDebugMessageInsert: {
    args: [GLenum, GLenum, GLuint, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteBuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },
  
  glDeleteFramebuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteProgram: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glDeleteProgramPipelines: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteQueries: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteRenderbuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteSamplers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteShader: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glDeleteSync: {
    args: [GLsync],
    returns: FFIType.void,
  },

  glDeleteTextures: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteTransformFeedbacks: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDeleteVertexArrays: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDepthFunc: {
    args: [GLenum],
    returns: FFIType.void,
  }

})

//* Bun FFI allows 64 function defs in one call, move onto the next.

const { 
  symbols: {
    glDepthMask,
    glDepthRange,
    glDepthRangef,
    glDepthRangeArrayv,
    glDepthRangeIndexed,
    glDetachShader,
    glEnable,
    glDisable,
    glEnablei,
    glDisablei,
    glEnableVertexAttribArray,
    glDisableVertexAttribArray,
    glEnableVertexArrayAttrib,
    glDisableVertexArrayAttrib,
    glDispatchCompute,
    glDispatchComputeIndirect,
    glDrawArrays,
    glDrawArraysIndirect,
    glDrawArraysInstanced,
    glDrawArraysInstancedBaseInstance,
    glDrawBuffer,
    glNamedFramebufferDrawBuffer,
    glDrawBuffers,
    glNamedFramebufferDrawBuffers,
    glDrawElements,
    glDrawElementsBaseVertex,
    glDrawElementsIndirect,
    glDrawElementsInstanced,
    glDrawElementsInstancedBaseInstance,
    glDrawElementsInstancedBaseVertex,
    glDrawElementsInstancedBaseVertexBaseInstance,
    glDrawRangeElements,
    glDrawRangeElementsBaseVertex,
    glDrawTransformFeedback,
    glDrawTransformFeedbackInstanced,
    glDrawTransformFeedbackStream,
    glDrawTransformFeedbackStreamInstanced,
    glFenceSync,
    glFinish,
    glFlush,
    glFlushMappedBufferRange,
    glFlushMappedNamedBufferRange,
    glFramebufferParameteri,
    glNamedFramebufferParameteri,
    glFramebufferRenderbuffer,
    glNamedFramebufferRenderbuffer,
    glFramebufferTexture,
    glFramebufferTexture1D,
    glFramebufferTexture2D,
    glFramebufferTexture3D,
    glNamedFramebufferTexture,
    glFramebufferTextureLayer,
    glNamedFramebufferTextureLayer,
    glFrontFace,
    glGenBuffers,
    glGenerateMipmap,
    glGenerateTextureMipmap,
    glGenFramebuffers,
    glGenProgramPipelines,
    glGenQueries,
    glGenRenderbuffers,
    glGenSamplers,
    glGenTextures,
    glGenTransformFeedbacks
  }
} = dlopen(path, {

  glDepthMask: {
    args: [GLboolean],
    returns: FFIType.void,
  },

  glDepthRange: {
    args: [GLdouble, GLdouble],
    returns: FFIType.void,
  },

  glDepthRangef: {
    args: [GLfloat, GLfloat],
    returns: FFIType.void,
  },

  glDepthRangeArrayv: {
    args: [GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDepthRangeIndexed: {
    args: [GLuint, GLdouble, GLdouble],
    returns: FFIType.void,
  },

  glDetachShader: {
    args: [GLuint, GLuint],
    returns: FFIType.void,
  },

  glEnable: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glDisable: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glEnablei: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glDisablei: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glEnableVertexAttribArray: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glDisableVertexAttribArray: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glEnableVertexArrayAttrib: {
    args: [GLuint, GLuint],
    returns: FFIType.void,
  },

  glDisableVertexArrayAttrib: {
    args: [GLuint, GLuint],
    returns: FFIType.void,
  },

  glDispatchCompute: {
    args: [GLuint, GLuint, GLuint],
    returns: FFIType.void,
  },

  glDispatchComputeIndirect: {
    args: [GLintptr],
    returns: FFIType.void,
  },

  glDrawArrays: {
    args: [GLenum, GLint, GLsizei],
    returns: FFIType.void,
  },

  glDrawArraysIndirect: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glDrawArraysInstanced: {
    args: [GLenum, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glDrawArraysInstancedBaseInstance: {
    args: [GLenum, GLint, GLsizei, GLsizei, GLuint],
    returns: FFIType.void,
  },

  glDrawBuffer: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glNamedFramebufferDrawBuffer: {
    args: [GLuint, GLenum],
    returns: FFIType.void,
  },

  glDrawBuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glNamedFramebufferDrawBuffers: {
    args: [GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glDrawElements: {
    args: [GLenum, GLsizei, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glDrawElementsBaseVertex: {
    args: [GLenum, GLsizei, GLenum, FFIType.ptr, GLint],
    returns: FFIType.void,
  },

  glDrawElementsIndirect: {
    args: [GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glDrawElementsInstanced: {
    args: [GLenum, GLsizei, GLenum, FFIType.ptr, GLsizei],
    returns: FFIType.void,
  },

  glDrawElementsInstancedBaseInstance: {
    args: [GLenum, GLsizei, GLenum, FFIType.ptr, GLsizei, GLuint],
    returns: FFIType.void,
  },

  glDrawElementsInstancedBaseVertex: {
    args: [GLenum, GLsizei, GLenum, FFIType.ptr, GLsizei, GLint],
    returns: FFIType.void,
  },

  glDrawElementsInstancedBaseVertexBaseInstance: {
    args: [GLenum, GLsizei, GLenum, FFIType.ptr, GLsizei, GLint, GLuint],
    returns: FFIType.void,
  },

  glDrawRangeElements: {
    args: [GLenum, GLuint, GLuint, GLsizei, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glDrawRangeElementsBaseVertex: {
    args: [GLenum, GLuint, GLuint, GLsizei, GLenum, FFIType.ptr, GLint],
    returns: FFIType.void,
  },

  glDrawTransformFeedback: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glDrawTransformFeedbackInstanced: {
    args: [GLenum, GLuint, GLsizei],
    returns: FFIType.void,
  },

  glDrawTransformFeedbackStream: {
    args: [GLenum, GLuint, GLuint],
    returns: FFIType.void,
  },

  glDrawTransformFeedbackStreamInstanced: {
    args: [GLenum, GLuint, GLuint, GLsizei],
    returns: FFIType.void,
  },

  glFenceSync: {
    args: [GLenum, GLbitfield],
    returns: FFIType.void,
  },

  glFinish: {
    args: [],
    returns: FFIType.void,
  },

  glFlush: {
    args: [],
    returns: FFIType.void,
  },

  glFlushMappedBufferRange: {
    args: [GLenum, GLintptr, GLsizeiptr],
    returns: FFIType.void,
  },

  glFlushMappedNamedBufferRange: {
    args: [GLuint, GLintptr, GLsizeiptr],
    returns: FFIType.void,
  },

  glFramebufferParameteri: {
    args: [GLenum, GLenum, GLint],
    returns: FFIType.void,
  },

  glNamedFramebufferParameteri: {
    args: [GLuint, GLenum, GLint],
    returns: FFIType.void,
  },

  glFramebufferRenderbuffer: {
    args: [GLenum, GLenum, GLenum, GLuint],
    returns: FFIType.void,
  },

  glNamedFramebufferRenderbuffer: {
    args: [GLuint, GLenum, GLenum, GLuint],
    returns: FFIType.void,
  },

  glFramebufferTexture: {
    args: [GLenum, GLenum, GLuint, GLint],
    returns: FFIType.void,
  },

  glFramebufferTexture1D: {
    args: [GLenum, GLenum, GLenum, GLuint, GLint],
    returns: FFIType.void,
  },

  glFramebufferTexture2D: {
    args: [GLenum, GLenum, GLenum, GLuint, GLint],
    returns: FFIType.void,
  },

  glFramebufferTexture3D: {
    args: [GLenum, GLenum, GLenum, GLuint, GLint, GLint],
    returns: FFIType.void,
  },

  glNamedFramebufferTexture: {
    args: [GLuint, GLenum, GLuint, GLint],
    returns: FFIType.void,
  },

  glFramebufferTextureLayer: {
    args: [GLenum, GLenum, GLuint, GLint, GLint],
    returns: FFIType.void,
  },

  glNamedFramebufferTextureLayer: {
    args: [GLuint, GLenum, GLuint, GLint, GLint],
    returns: FFIType.void,
  },

  glFrontFace: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glGenBuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGenerateMipmap: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glGenerateTextureMipmap: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glGenFramebuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGenProgramPipelines: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGenQueries: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGenRenderbuffers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGenSamplers: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGenTextures: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGenTransformFeedbacks: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },
  
})

//* Bun FFI allows 64 function defs in one call, move onto the next.

const { 
  symbols: {
    glGenVertexArrays,
    glGetBooleanv,
    glGetDoublev,
    glGetFloatv,
    glGetIntegerv,
    glGetInteger64v,
    glGetBooleani_v,
    glGetDoublei_v,
    glGetFloati_v,
    glGetIntegeri_v,
    glGetInteger64i_v,
    glGetActiveAtomicCounterBufferiv,
    glGetActiveAttrib,
    glGetActiveSubroutineUniformiv,
    glGetActiveSubroutineUniformName,
    //! Warning: missing getter API. No testbed. Not writing functions blind.
    glGetError,
  }
} = dlopen(path, {

  glGenVertexArrays: {
    args: [GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetBooleanv: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetDoublev: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetFloatv: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetIntegerv: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetInteger64v: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetBooleani_v: {
    args: [GLenum, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetDoublei_v: {
    args: [GLenum, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetFloati_v: {
    args: [GLenum, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetIntegeri_v: {
    args: [GLenum, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetInteger64i_v: {
    args: [GLenum, GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetActiveAtomicCounterBufferiv: {
    args: [GLuint, GLuint, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetActiveAttrib: {
    args: [GLuint, GLuint, GLsizei, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetActiveSubroutineUniformiv: {
    args: [GLuint, GLenum, GLuint, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetActiveSubroutineUniformName: {
    args: [GLuint, GLenum, GLuint, GLsizei, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetError: {
    args: [],
    returns: GLenum,
  },

})

export function activeShaderProgram(pipeline: number, program: number) {
  glActiveShaderProgram(pipeline, program)
} 

export function activeTexture(texture: number) {
  glActiveTexture(texture)
}

export function attachShader(program: number, shader: number) {
  glAttachShader(program, shader)
}

export function beginConditionalRender(id: number, mode: number) {
  glBeginConditionalRender(id, mode)
}

export function endConditionalRender() {
  glEndConditionalRender()
}

export function beginQuery(target: number, id: number) {
  glBeginQuery(target, id)
}

export function endQuery(target: number) {
  glEndQuery(target)
}

export function beginQueryIndexed(target: number, index: number, id: number) {
  glBeginQueryIndexed(target, index, id)
}

export function endQueryIndexed(target: number, index: number) {
  glEndQueryIndexed(target, index)
}

export function beginTransformFeedback(primitiveMode: number) {
  glBeginTransformFeedback(primitiveMode)
}

export function endTransformFeedback() {
  glEndTransformFeedback()
}

export function bindAttribLocation(program: number, index: number, name: string) {
  let nameBuffer = toBuffer(name)
  glBindAttribLocation(program, index, nameBuffer)
}

export function bindBuffer(target: number, buffer: number) {
  glBindBuffer(target, buffer)
}

export function bindBufferBase(target: number, index: number, buffer: number) {
  glBindBufferBase(target, index, buffer)
}

export function bindBufferRange(target: number, index: number, buffer: number, offset: number, size: number) {
  glBindBufferRange(target, index, buffer, offset, size)
}

export function bindBuffersBase(target: number, first: number, count: number, buffers: number[]) {
  let buffersPointer = new Uint32Array(buffers)
  glBindBuffersBase(target, first, count, buffersPointer)
}

export function bindBuffersRange(target: number, first: number, count: number, buffers: number[], offsets: number[], sizes: number[]) {
  let buffersPointer = new Uint32Array(buffers)
  let offsetsPointer = new Int32Array(offsets)
  let sizesPointer = new Int32Array(sizes)
  glBindBuffersRange(target, first, count, buffersPointer, offsetsPointer, sizesPointer)
}

export function bindFragDataLocation(program: number, colorNumber: number, name: string) {
  let namePointer = toBuffer(name)
  glBindFragDataLocation(program, colorNumber, namePointer)
}

export function bindFragDataLocationIndexed(program: number, colorNumber: number, index: number, name: string) {
  let namePointer = toBuffer(name)
  glBindFragDataLocationIndexed(program, colorNumber, index, namePointer)
}

export function bindFramebuffer(target: number, framebuffer: number) {
  glBindFramebuffer(target, framebuffer)
}

export function bindImageTexture(unit: number, texture: number, level: number, layered: boolean, layer: number, access: number, format: number) {
  glBindImageTexture(unit, texture, level, layered, layer, access, format)
}

export function bindImageTextures(first: number, count: number, textures: number[]) {
  let texturesPointer = new Uint32Array(textures)
  glBindImageTextures(first, count, texturesPointer)
}

export function bindProgramPipeline(pipeline: number) {
  glBindProgramPipeline(pipeline)
}

export function bindRenderbuffer(target: number, renderbuffer: number) {
  glBindRenderbuffer(target, renderbuffer)
}

export function bindSampler(unit: number, sampler: number) {
  glBindSampler(unit, sampler)
}

export function bindSamplers(first: number, count: number, samplers: number[]) {
  let samplersPointer = new Uint32Array(samplers)
  glBindSamplers(first, count, samplersPointer)
}

export function bindTexture(target: number, texture: number) {
  glBindTexture(target, texture)
}

export function bindTextures(first: number, count: number, textures: number[]) {
  let texturesPointer = new Uint32Array(textures)
  glBindTextures(first, count, texturesPointer)
}

export function bindTextureUnit(unit: number, texture: number) {
  glBindTextureUnit(unit, texture)
}

export function bindTransformFeedback(target: number, id: number) {
  glBindTransformFeedback(target, id)
}

export function bindVertexArray(target: number) {
  glBindVertexArray(target)
}

export function bindVertexBuffer(bindingindex: number, buffer: number, offset: number, stride: number) {
  glBindVertexBuffer(bindingindex, buffer, offset, stride)
}

export function vertexArrayVertexBuffer(vaobj: number, bindingindex: number, buffer: number, offset: number, stride: number) {
  glVertexArrayVertexBuffer(vaobj, bindingindex, buffer, offset, stride)
}

export function bindVertexBuffers(first: number, count: number, buffers: number[], offsets: number[], strides: number[]) {
  let buffersPointer = new Uint32Array(buffers)
  let offsetsPointer = new Int32Array(offsets)
  let stridesPointer = new Int32Array(strides)
  glBindVertexBuffers(first, count, buffersPointer, offsetsPointer, stridesPointer)
}

export function vertexArrayVertexBuffers(vaobj: number, first: number, count: number, buffers: number[], offsets: number[], strides: number[]) {
  let buffersPointer = new Uint32Array(buffers)
  let offsetsPointer = new Int32Array(offsets)
  let stridesPointer = new Int32Array(strides)
  glVertexArrayVertexBuffers(vaobj, first, count, buffersPointer, offsetsPointer, stridesPointer)
}

export function blendColor(red: number, green: number, blue: number, alpha: number) {
  glBlendColor(red, green, blue, alpha)
}

export function blendEquation(mode: number) {
  glBlendEquation(mode)
}

export function blendEquationi(buf: number, mode: number) {
  glBlendEquationi(buf, mode)
}

export function blendEquationSeparate(modeRGB: number, modeAlpha: number) {
  glBlendEquationSeparate(modeRGB, modeAlpha)
}

export function blendEquationSeparatei(buf: number, modeRGB: number, modeAlpha: number) {
  glBlendEquationSeparatei(buf, modeRGB, modeAlpha)
}

export function blendFunc(sfactor: number, dfactor: number) {
  glBlendFunc(sfactor, dfactor)
}

export function blendFunci(buf: number, sfactor: number, dfactor: number) {
  glBlendFunci(buf, sfactor, dfactor)
}

export function blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
  glBlendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha)
}

export function blendFuncSeparatei(buf: number, srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
  glBlendFuncSeparatei(buf, srcRGB, dstRGB, srcAlpha, dstAlpha)
}

// This is ridiculous
export function blitFramebuffer(srcX0: number, srcY0: number, srcX1: number, srcY1: number, dstX0: number, dstY0: number, dstX1: number, dstY1: number, mask: number, filter: number) {
  glBlitFramebuffer(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter)
}

export function blitNamedFramebuffer(readFramebuffer: number, drawFramebuffer: number, srcX0: number, srcY0: number, srcX1: number, srcY1: number, dstX0: number, dstY0: number, dstX1: number, dstY1: number, mask: number, filter: number) {
  glBlitNamedFramebuffer(readFramebuffer, drawFramebuffer, srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function bufferData(target: number, size: number, data: TypedArray, usage: number) {
  glBufferData(target, size, data, usage)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function namedBufferData(buffer: number, size: number, data: TypedArray, usage: number) {
  glNamedBufferData(buffer, size, data, usage)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function bufferStorage(target: number, size: number, data: TypedArray, flags: number) {
  glBufferStorage(target, size, data, flags)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function namedBufferStorage(buffer: number, size: number, data: TypedArray, flags: number) {
  glNamedBufferStorage(buffer, size, data, flags)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function bufferSubData(target: number, offset: number, size: number, data: TypedArray) {
  glBufferSubData(target, offset, size, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function namedBufferSubData(buffer: number, offset: number, size: number, data: TypedArray) {
  glNamedBufferSubData(buffer, offset, size, data)
}

export function checkFramebufferStatus(target: number) {
  glCheckFramebufferStatus(target)
}

export function checkNamedFramebufferStatus(framebuffer: number, target: number) {
  glCheckNamedFramebufferStatus(framebuffer, target)
}

export function clampColor(target: number, clamp: number) {
  glClampColor(target, clamp)
}

export function clear(mask: number) {
  glClear(mask)
}

export function clearBufferiv(buffer: number, drawbuffer: number, value: number[]) {
  let valuePointer = new Int32Array(value)
  glClearBufferiv(buffer, drawbuffer, valuePointer)
}

export function clearBufferuiv(buffer: number, drawbuffer: number, value: number[]) {
  let valuePointer = new Uint32Array(value)
  glClearBufferuiv(buffer, drawbuffer, valuePointer)
}

export function clearBufferfv(buffer: number, drawbuffer: number, value: number[]) {
  let valuePointer = new Float32Array(value)
  glClearBufferfv(buffer, drawbuffer, valuePointer)
}

export function clearBufferfi(buffer: number, drawbuffer: number, depth: number, stencil: number) {
  glClearBufferfi(buffer, drawbuffer, depth, stencil)
}

export function clearNamedFramebufferiv(framebuffer: number, buffer: number, drawbuffer: number, value: number[]) {
  let valuePointer = new Int32Array(value)
  glClearNamedFramebufferiv(framebuffer, buffer, drawbuffer, valuePointer)
}

export function clearNamedFramebufferuiv(framebuffer: number, buffer: number, drawbuffer: number, value: number[]) {
  let valuePointer = new Uint32Array(value)
  glClearNamedFramebufferuiv(framebuffer, buffer, drawbuffer, valuePointer)
}

export function clearNamedFramebufferfv(framebuffer: number, buffer: number, drawbuffer: number, value: number[]) {
  let valuePointer = new Float32Array(value)
  glClearNamedFramebufferfv(framebuffer, buffer, drawbuffer, valuePointer)
}

export function clearNamedFramebufferfi(framebuffer: number, buffer: number, drawbuffer: number, depth: number, stencil: number) {
  glClearNamedFramebufferfi(framebuffer, buffer, drawbuffer, depth, stencil)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function clearBufferSubData(target: number, internalformat: number, offset: number, size: number, format: number, type: number, data: TypedArray) {
  glClearBufferSubData(target, internalformat, offset, size, format, type, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function clearNamedBufferSubData(buffer: number, internalformat: number, offset: number, size: number, format: number, type: number, data: TypedArray) {
  glClearNamedBufferSubData(buffer, internalformat, offset, size, format, type, data)
}

export function clearColor(red: number, green: number, blue: number, alpha: number) {
  glClearColor(red, green, blue, alpha)
}

export function clearDepth(depth: number) {
  glClearDepth(depth)
}

export function clearDepthf(depth: number) {
  glClearDepthf(depth)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function clearBufferData(target: number, internalformat: number, format: number, type: number, data: TypedArray) {
  glClearBufferData(target, internalformat, format, type, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function clearNamedBufferData(buffer: number, internalformat: number, format: number, type: number, data: TypedArray) {
  glClearNamedBufferData(buffer, internalformat, format, type, data)
}

export function clearStencil(s: number) {
  glClearStencil(s)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function clearTexImage(texture: number, level: number, format: number, type: number, data: TypedArray) {
  glClearTexImage(texture, level, format, type, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function clearTexSubImage(texture: number, level: number, xoffset: number, yoffset: number, zoffset: number, width: number, height: number, depth: number, format: number, type: number, data: TypedArray) {
  glClearTexSubImage(texture, level, xoffset, yoffset, zoffset, width, height, depth, format, type, data)
}

export function clientWaitSync(sync: number, flags: number, timeout: number) {
  glClientWaitSync(sync, flags, timeout)
}

export function clipControl(origin: number, depth: number) {
  glClipControl(origin, depth)
}

export function colorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean) {
  glColorMask(red, green, blue, alpha)
}

export function colorMaski(buf: number, red: boolean, green: boolean, blue: boolean, alpha: boolean) {
  glColorMaski(buf, red, green, blue, alpha)
}

export function compileShader(shader: number) {
  glCompileShader(shader)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTexImage1D(target: number, level: number, internalformat: number, width: number, border: number, imageSize: number, data: TypedArray) {
  glCompressedTexImage1D(target, level, internalformat, width, border, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, imageSize: number, data: TypedArray) {
  glCompressedTexImage2D(target, level, internalformat, width, height, border, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTexImage3D(target: number, level: number, internalformat: number, width: number, height: number, depth: number, border: number, imageSize: number, data: TypedArray) {
  glCompressedTexImage3D(target, level, internalformat, width, height, depth, border, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTexSubImage1D(target: number, level: number, xoffset: number, width: number, format: number, imageSize: number, data: TypedArray) {
  glCompressedTexSubImage1D(target, level, xoffset, width, format, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTextureSubImage1D(texture: number, level: number, xoffset: number, width: number, format: number, imageSize: number, data: TypedArray) {
  glCompressedTextureSubImage1D(texture, level, xoffset, width, format, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, imageSize: number, data: TypedArray) {
  glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTextureSubImage2D(texture: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, imageSize: number, data: TypedArray) {
  glCompressedTextureSubImage2D(texture, level, xoffset, yoffset, width, height, format, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTexSubImage3D(target: number, level: number, xoffset: number, yoffset: number, zoffset: number, width: number, height: number, depth: number, format: number, imageSize: number, data: TypedArray) {
  glCompressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function compressedTextureSubImage3D(texture: number, level: number, xoffset: number, yoffset: number, zoffset: number, width: number, height: number, depth: number, format: number, imageSize: number, data: TypedArray) {
  glCompressedTextureSubImage3D(texture, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data)
}

export function copyBufferSubData(readTarget: number, writeTarget: number, readOffset: number, writeOffset: number, size: number) {
  glCopyBufferSubData(readTarget, writeTarget, readOffset, writeOffset, size)
}

export function copyNamedBufferSubData(readBuffer: number, writeBuffer: number, readOffset: number, writeOffset: number, size: number) {
  glCopyNamedBufferSubData(readBuffer, writeBuffer, readOffset, writeOffset, size)
}

export function copyImageSubData(srcName: number, srcTarget: number, srcLevel: number, srcX: number, srcY: number, srcZ: number, dstName: number, dstTarget: number, dstLevel: number, dstX: number, dstY: number, dstZ: number, srcWidth: number, srcHeight: number, srcDepth: number) {
  glCopyImageSubData(srcName, srcTarget, srcLevel, srcX, srcY, srcZ, dstName, dstTarget, dstLevel, dstX, dstY, dstZ, srcWidth, srcHeight, srcDepth)
}

export function copyTexImage1D(target: number, level: number, internalformat: number, x: number, y: number, width: number, border: number) {
  glCopyTexImage1D(target, level, internalformat, x, y, width, border)
}

export function copyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number) {
  glCopyTexImage2D(target, level, internalformat, x, y, width, height, border)
}

export function copyTexSubImage1D(target: number, level: number, xoffset: number, x: number, y: number, width: number) {
  glCopyTexSubImage1D(target, level, xoffset, x, y, width)
}

export function copyTextureSubImage1D(texture: number, level: number, xoffset: number, x: number, y: number, width: number) {
  glCopyTextureSubImage1D(texture, level, xoffset, x, y, width)
}

export function copyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number) {
  glCopyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height)
}

export function copyTextureSubImage2D(texture: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number) {
  glCopyTextureSubImage2D(texture, level, xoffset, yoffset, x, y, width, height)
}

export function copyTexSubImage3D(target: number, level: number, xoffset: number, yoffset: number, zoffset: number, x: number, y: number, width: number, height: number) {
  glCopyTexSubImage3D(target, level, xoffset, yoffset, zoffset, x, y, width, height)
}

export function copyTextureSubImage3D(texture: number, level: number, xoffset: number, yoffset: number, zoffset: number, x: number, y: number, width: number, height: number) {
  glCopyTextureSubImage3D(texture, level, xoffset, yoffset, zoffset, x, y, width, height)
}

export function createBuffers(n: number, buffers: number[]) {
  let buffersPointer = new Uint32Array(buffers)
  glCreateBuffers(n, buffersPointer)
}

export function createFramebuffers(n: number, framebuffers: number[]) {
  let framebuffersPointer = new Uint32Array(framebuffers)
  glCreateFramebuffers(n, framebuffersPointer)
}

export function createProgram(): number {
  return glCreateProgram()
}

export function createProgramPipelines(n: number, pipelines: number[]) {
  let pipelinesPointer = new Uint32Array(pipelines)
  glCreateProgramPipelines(n, pipelinesPointer)
}

export function createQueries(target: number, n: number, ids: number[]) {
  let idsPointer = new Uint32Array(ids)
  glCreateQueries(target, n, idsPointer)
}

export function createRenderbuffers(n: number, renderbuffers: number[]) {
  let renderbuffersPointer = new Uint32Array(renderbuffers)
  glCreateRenderbuffers(n, renderbuffersPointer)
}

export function createSamplers(n: number, samplers: number[]) {
  let samplersPointer = new Uint32Array(samplers)
  glCreateSamplers(n, samplersPointer)
}

export function createShader(shaderType: number): number {
  return glCreateShader(shaderType)
}


/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function createShaderProgramv(type: number, count: number, strings: TypedArray) {
  glCreateShaderProgramv(type, count, strings)
}

export function createTextures(target: number, n: number, textures: number) {
  let texturesPointer = new Uint32Array(textures)
  glCreateTextures(target, n, texturesPointer)
}

export function createTransformFeedbacks(n: number, ids: number[]) {
  let idsPointer = new Uint32Array(ids)
  glCreateTransformFeedbacks(n, idsPointer)
}

export function createVertexArrays(n: number, arrays: number[]) {
  let arraysPointer = new Uint32Array(arrays)
  glCreateVertexArrays(n, arraysPointer)
}

export function cullFace(mode: number) {
  glCullFace(mode)
}

export function debugMessageCallback(callback: (source: number, type: number, id: number, severity: number, length: number, message: FFIType.ptr, userParam: FFIType.ptr) => void, userParam: FFIType.ptr): JSCallback {
  
  const callbackObject = new JSCallback(
    callback,
    {
      args: [GLenum, GLenum, GLuint, GLenum, GLsizei, FFIType.ptr, FFIType.ptr],
      returns: FFIType.void,
    }
  )

  glDebugMessageCallback(callbackObject.ptr, userParam)

  return callbackObject
}

export function debugMessageControl(source: number, type: number, severity: number, count: number, ids: number[], enabled: boolean) {
  let idsPointer = new Uint32Array(ids)
  glDebugMessageControl(source, type, severity, count, idsPointer, enabled)
}


/**
 *! Warning: You might have to hold onto the message! It might get GCed!
 */
export function debugMessageInsert(source: number, type: number, id: number, severity: number, length: number, message: string) {
  let messagePointer = toBuffer(message)
  glDebugMessageInsert(source, type, id, severity, length, messagePointer)
}

export function deleteBuffers(n: number, buffers: number[]) {
  let buffersPointer = new Uint32Array(buffers)
  glDeleteBuffers(n, buffersPointer)
}

export function deleteFramebuffers(n: number, framebuffers: number[]) {
  let framebufersPointer = new Uint32Array(framebuffers)
  glDeleteFramebuffers(n, framebufersPointer)
}

export function deleteProgram(program: number) {
  glDeleteProgram(program)
}

export function deleteProgramPipelines(n: number, pipelines: number[]) {
  let pipelinesPointer = new Uint32Array(pipelines)
  glDeleteProgramPipelines(n, pipelinesPointer)
}

export function deleteQueries(n: number, ids: number[]) {
  let idsPointer = new Uint32Array(ids)
  glDeleteQueries(n, idsPointer)
}

export function deleteRenderbuffers(n: number, renderbuffers: number[]) {
  let renderbuffersPointer = new Uint32Array(renderbuffers)
  glDeleteRenderbuffers(n, renderbuffersPointer)
}

export function deleteSamplers(n: number, samplers: number[]) {
  let samplersPointer = new Uint32Array(samplers)
  glDeleteSamplers(n, samplersPointer)
}

export function deleteShader(shader: number) {
  glDeleteShader(shader)
}

export function deleteSync(sync: number) {
  glDeleteSync(sync)
}

export function deleteTextures(n: number, textures: number[]) {
  let texturesPointer = new Uint32Array(textures)
  glDeleteTextures(n, texturesPointer)
}

export function deleteTransformFeedbacks(n: number, ids: number[]) {
  let idsPointer = new Uint32Array(ids)
  glDeleteTransformFeedbacks(n, idsPointer)
}

export function deleteVertexArrays(n: number, arrays: number[]) {
  let arraysPointer = new Uint32Array(arrays)
  glDeleteVertexArrays(n, arraysPointer)
}

export function depthFunc(func: number) {
  glDepthFunc(func)
}

export function depthMask(flag: boolean) {
  glDepthMask(flag)
}

export function depthRange(nearVal: number, farVal: number) {
  glDepthRange(nearVal, farVal)
}

export function depthRangef(nearVal: number, farVal: number) {
  glDepthRangef(nearVal, farVal)
}

export function depthRangeArrayv(first: number, count: number, v: number[]) {
  let vPointer = new Float64Array(v)
  glDepthRangeArrayv(first, count, vPointer)
}

export function depthRangeIndexed(index: number, nearVal: number, farVal: number) {
  glDepthRangeIndexed(index, nearVal, farVal)
}

export function detachShader(program: number, shader: number) {
  glDetachShader(program, shader)
}

export function enable(cap: number) {
  glEnable(cap)
}

export function disable(cap: number) {
  glDisable(cap)
}

export function enablei(cap: number, index: number) {
  glEnablei(cap, index)
}

export function disablei(cap: number, index: number) {
  glDisablei(cap, index)
}

export function enableVertexAttribArray(index: number) {
  glEnableVertexAttribArray(index)
}

export function disableVertexAttribArray(index: number) {
  glDisableVertexAttribArray(index)
}

export function enableVertexArrayAttrib(vaobj: number, index: number) {
  glEnableVertexArrayAttrib(vaobj, index)
}

export function disableVertexArrayAttrib(vaobj: number, index: number) {
  glDisableVertexArrayAttrib(vaobj, index)
}

export function dispatchCompute(num_groups_x: number, num_groups_y: number, num_groups_z: number) {
  glDispatchCompute(num_groups_x, num_groups_y, num_groups_z)
}

export function dispatchComputeIndirect(indirect: number) {
  glDispatchComputeIndirect(indirect)
}

export function drawArrays(mode: number, first: number, count: number) {
  glDrawArrays(mode, first, count)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawArraysIndirect(mode: number, indirect: TypedArray) {
  glDrawArraysIndirect(mode, indirect)
}

export function drawArraysInstanced(mode: number, first: number, count: number, instancecount: number) {
  glDrawArraysInstanced(mode, first, count, instancecount)
}

export function drawArraysInstancedBaseInstance(mode: number, first: number, count: number, instancecount: number, baseinstance: number) {
  glDrawArraysInstancedBaseInstance(mode, first, count, instancecount, baseinstance)
}

export function drawBuffer(buf: number) {
  glDrawBuffer(buf)
}

export function namedFramebufferDrawBuffer(framebuffer: number, buf: number) {
  glNamedFramebufferDrawBuffer(framebuffer, buf)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawBuffers(n: number, bufs: TypedArray) {
  glDrawBuffers(n, bufs)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function namedFramebufferDrawBuffers(framebuffer: number, n: number, bufs: TypedArray) {
  glNamedFramebufferDrawBuffers(framebuffer, n, bufs)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawElements(mode: number, count: number, type: number, indices: TypedArray) {
  glDrawElements(mode, count, type, indices)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawElementsBaseVertex(mode: number, count: number, type: number, indices: TypedArray, basevertex: number) {
  glDrawElementsBaseVertex(mode, count, type, indices, basevertex)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawElementsIndirect(mode: number, type: number, indirect: TypedArray) {
  glDrawElementsIndirect(mode, type, indirect)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawElementsInstanced(mode: number, count: number, type: number, indices: TypedArray, instancecount: number) {
  glDrawElementsInstanced(mode, count, type, indices, instancecount)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawElementsInstancedBaseInstance(mode: number, count: number, type: number, indices: TypedArray, instancecount: number, baseinstance: number) {
  glDrawElementsInstancedBaseInstance(mode, count, type, indices, instancecount, baseinstance)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawElementsInstancedBaseVertex(mode: number, count: number, type: number, indices: TypedArray, instancecount: number, basevertex: number) {
  glDrawElementsInstancedBaseVertex(mode, count, type, indices, instancecount, basevertex)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawElementsInstancedBaseVertexBaseInstance(mode: number, count: number, type: number, indices: TypedArray, instancecount: number, basevertex: number, baseinstance: number) {
  glDrawElementsInstancedBaseVertexBaseInstance(mode, count, type, indices, instancecount, basevertex, baseinstance)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawRangeElements(mode: number, start: number, end: number, count: number, type: number, indices: TypedArray) {
  glDrawRangeElements(mode, start, end, count, type, indices)
}

/**
 *! WARNING: If you do not store your array somewhere it WILL crash when Bun GCs your data!
 */
export function drawRangeElementsBaseVertex(mode: number, start: number, end: number, count: number, type: number, indices: TypedArray, basevertex: number) {
  glDrawRangeElementsBaseVertex(mode, start, end, count, type, indices, basevertex)
}

export function drawTransformFeedback(mode: number, id: number) {
  glDrawTransformFeedback(mode, id)
}

export function drawTransformFeedbackInstanced(mode: number, id: number, instancecount: number) {
  glDrawTransformFeedbackInstanced(mode, id, instancecount)
}

export function drawTransformFeedbackStream(mode: number, id: number, stream: number) {
  glDrawTransformFeedbackStream(mode, id, stream)
}

export function drawTransformFeedbackStreamInstanced(mode: number, id: number, stream: number, instancecount: number) {
  glDrawTransformFeedbackStreamInstanced(mode, id, stream, instancecount)
}

export function fenceSync(condition: number, flags: number) {
  glFenceSync(condition, flags)
}

export function finish() {
  glFinish()
}

export function flush() {
  glFlush()
}

export function flushMappedBufferRange(target: number, offset: number, length: number) {
  glFlushMappedBufferRange(target, offset, length)
}

export function flushMappedNamedBufferRange(buffer: number, offset: number, length: number) {
  glFlushMappedNamedBufferRange(buffer, offset, length)
}

export function framebufferParameteri(target: number, pname: number, param: number) {
  glFramebufferParameteri(target, pname, param)
}

export function namedFramebufferParameteri(framebuffer: number, pname: number, param: number) {
  glNamedFramebufferParameteri(framebuffer, pname, param)
}

export function framebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: number) {
  glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer)
}

export function namedFramebufferRenderbuffer(framebuffer: number, attachment: number, renderbuffertarget: number, renderbuffer: number) {
  glNamedFramebufferRenderbuffer(framebuffer, attachment, renderbuffertarget, renderbuffer)
}

export function framebufferTexture(target: number, attachment: number, texture: number, level: number) {
  glFramebufferTexture(target, attachment, texture, level)
}

export function framebufferTexture1D(target: number, attachment: number, textarget: number, texture: number, level: number) {
  glFramebufferTexture1D(target, attachment, textarget, texture, level)
}

export function framebufferTexture2D(target: number, attachment: number, textarget: number, texture: number, level: number) {
  glFramebufferTexture2D(target, attachment, textarget, texture, level)
}

export function framebufferTexture3D(target: number, attachment: number, textarget: number, texture: number, level: number, layer: number) {
  glFramebufferTexture3D(target, attachment, textarget, texture, level, layer)
}

export function namedFramebufferTexture(framebuffer: number, attachment: number, texture: number, level: number) {
  glNamedFramebufferTexture(framebuffer, attachment, texture, level)
}

export function framebufferTextureLayer(target: number, attachment: number, texture: number, level: number, layer: number) {
  glFramebufferTextureLayer(target, attachment, texture, level, layer)
}

export function namedFramebufferTextureLayer(framebuffer: number, attachment: number, texture: number, level: number, layer: number) {
  glNamedFramebufferTextureLayer(framebuffer, attachment, texture, level, layer)
}

export function frontFace(mode: number) {
  glFrontFace(mode)
}

export function genBuffers(n: number, buffers: number[]) {
  let buffersPointer = new Uint32Array(buffers)
  glGenBuffers(n, buffersPointer)
}

export function generateMipmap(target: number) {
  glGenerateMipmap(target)
}

export function generateTextureMipmap(texture: number) {
  glGenerateTextureMipmap(texture)
}

export function genFramebuffers(n: number, ids: number[]) {
  let idsPointer = new Uint32Array(ids)
  glGenFramebuffers(n, idsPointer)
}

export function genProgramPipelines(n: number, pipelines: number[]) {
  let pipelinesPointer = new Uint32Array(pipelines)
  glGenProgramPipelines(n, pipelinesPointer)
}

export function genQueries(n: number, ids: number[]) {
  let idsPointer = new Uint32Array(ids)
  glGenQueries(n, idsPointer)
}

export function genRenderbuffers(n: number, renderbuffers: number[]) {
  let renderbuffersPointer = new Uint32Array(renderbuffers)
  glGenRenderbuffers(n, renderbuffersPointer)
}

export function genSamplers(n: number, samplers: number[]) {
  let samplersPointer = new Uint32Array(samplers)
  glGenSamplers(n, samplersPointer)
}

export function genTextures(n: number, textures: number[]) {
  let texturesPointer = new Uint32Array(textures)
  glGenTextures(n, texturesPointer)
}

export function genTransformFeedbacks(n: number, ids: number[]) {
  let idsPointer = new Uint32Array(ids)
  glGenTransformFeedbacks(n, idsPointer)
}

export function genVertexArrays(n: number, arrays: number[]) {
  let arraysPointer = new Uint32Array(arrays)
  glGenVertexArrays(n, arraysPointer)
}

//* This part is a bit tricky
//! FIXME: I have no idea if this section works!
//! FIXME: UNTESTED!

/**
 *!WARNING: UNTESTED!
 */
export function getBooleanv(pname: number): boolean[] {
  //!!! FIXME: I HAVE NO IDEA IF THIS WORKS!!!
  // We can only hope that the C code is dereffing this instead of raw pointer arithmetic
  let dataBuffer = new Uint8Array()
  glGetBooleanv(pname, dataBuffer)
  let booleanBuffer: boolean[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    // This is the most ridiculous hack lmao.
    booleanBuffer[i] = dataBuffer.at(i) == GL_TRUE
  }
  return booleanBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getDoublev(pname: number): number[] {
  let dataBuffer = new Float64Array()
  glGetDoublev(pname, dataBuffer)
  let doubleBuffer: number[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    doubleBuffer[i] = dataBuffer.at(i) || 0
  }
  return doubleBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getFloatv(pname: number): number[] {
  let dataBuffer = new Float32Array()
  glGetFloatv(pname, dataBuffer)
  let floatBuffer: number[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    floatBuffer[i] = dataBuffer.at(i) || 0
  }
  return floatBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getIntegerv(pname: number): number[] {
  let dataBuffer = new Int32Array()
  glGetIntegerv(pname, dataBuffer)
  let intBuffer: number[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    intBuffer[i] = dataBuffer.at(i) || 0
  }
  return intBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getInteger64v(pname: number): bigint[] {
  let dataBuffer = new BigInt64Array()
  glGetInteger64v(pname, dataBuffer)
  let int64Buffer: bigint[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    int64Buffer[i] = dataBuffer.at(i) || BigInt(0)
  }
  return int64Buffer
}

//******************************8 */


/**
 *!WARNING: UNTESTED!
 */
 export function getBooleani_v(pname: number, index: number): boolean[] {
  let dataBuffer = new Uint8Array()
  glGetBooleani_v(pname, index, dataBuffer)
  let booleanBuffer: boolean[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    booleanBuffer[i] = dataBuffer.at(i) == GL_TRUE
  }
  return booleanBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getDoublei_v(pname: number, index: number): number[] {
  let dataBuffer = new Float64Array()
  glGetDoublei_v(pname, index, dataBuffer)
  let doubleBuffer: number[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    doubleBuffer[i] = dataBuffer.at(i) || 0
  }
  return doubleBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getFloati_v(pname: number, index: number): number[] {
  let dataBuffer = new Float32Array()
  glGetFloati_v(pname, index, dataBuffer)
  let floatBuffer: number[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    floatBuffer[i] = dataBuffer.at(i) || 0
  }
  return floatBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getIntegeri_v(pname: number, index: number): number[] {
  let dataBuffer = new Int32Array()
  glGetIntegeri_v(pname, index, dataBuffer)
  let intBuffer: number[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    intBuffer[i] = dataBuffer.at(i) || 0
  }
  return intBuffer
}

/**
 *!WARNING: UNTESTED!
 */
export function getInteger64i_v(pname: number, index: number): bigint[] {
  let dataBuffer = new BigInt64Array()
  glGetInteger64i_v(pname, index, dataBuffer)
  let int64Buffer: bigint[] = new Array(dataBuffer.length)
  for (let i = 0; i < dataBuffer.length; i++) {
    int64Buffer[i] = dataBuffer.at(i) || BigInt(0)
  }
  return int64Buffer
}

//! END MASSIVELY UNTESTED SECTION!


export function getActiveAtomicCounterBufferiv(program: number, bufferIndex: number, pname: number, params: number[]) {
  let paramsPointer = new Int32Array(params)
  glGetActiveAtomicCounterBufferiv(program, bufferIndex, pname, paramsPointer)
}


//! Begin the no idea if this works section

/**
 *!Warning: No idea if this works!
 */
export function getActiveAttrib(program: number, index: number, bufSize: number): any[] {
  //! No idea if this works
  let lengthPointer = new Uint32Array(1)
  let sizePointer = new Int32Array(1)
  let typePointer = new Uint32Array(1)
  let namePointer = blankBuffer()
  glGetActiveAttrib(program, index, bufSize, lengthPointer, sizePointer, typePointer, namePointer)

  let length = lengthPointer.at(0)
  let size = sizePointer.at(0)
  let type = typePointer.at(0)
  let name = namePointer.toString()

  return [length, size, type, name]
}

/**
 *!Warning: No idea if this works!
 */
export function getActiveSubroutineUniformiv(program: number, shadertype: number, index: number, pname: number): TypedArray {
  let valuesPointer = new Int32Array()
  glGetActiveSubroutineUniformiv(program, shadertype, index, pname, valuesPointer)
  return valuesPointer
}

/**
 *!Warning: No idea if this works!
 */
export function getActiveSubroutineUniformName(program: number, shadertype: number, index: number, bufSize: number): string {
  let lengthPointer = new Int32Array(1)
  let namePointer = new Uint8Array()
  glGetActiveSubroutineUniformName(program, shadertype, index, bufSize, lengthPointer, namePointer)
  return namePointer.toString()
}

/*
! A VERY IMPORTANT NOTE !

At this point, I grew very tired of not having a testbed for any of these functions.

I have been blindly translating code for 3 days at this point and I want to see something.

So I am skipping a huge chunk of the "Get" api so I can get a testbed up to test this.

I might put it in, but I never personally utilize the OpenGL getter api.

Also, the keyword for this portion is: F22%%%.,l;'

* Missing:
*
* From: glGetActiveUniform
*
* To:   glGetVertexAttribPointerv
*
* Exception: glGetError
*
* glGetError is very important!

*/

//! END the no idea if this works section

export function getError(): number {
  return glGetError()
}