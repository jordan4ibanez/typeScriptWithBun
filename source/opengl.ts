import { CString, FFIType, JSCallback, dlopen, ptr, suffix } from "bun:ffi"

// OpenGL Supa Dupa library. I hope.

export function forceReload() {
  console.log("OpenGL reloaded")
}

/*

!New gameplan:

1. FFI function translation, RAW
2. Nice cushion layer
2a. Either in this file, or a separate one.
2b. Can rename this file to opengl_RAW.ts
*/

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

//* I got this from drbrain
//() https://github.com/drbrain/opengl/blob/master/ext/opengl/gl-enums.h

/* This file was genereated on Mon Feb 16 18:08:56 +0100 2009
   source: http://www.opengl.org/registry/api/enum.spec
   source: http://www.opengl.org/registry/api/enumext.spec
*/
// export const GL_1PASS_EXT = 0x80A1
// export const GL_1PASS_SGIS = 0x80A1
// export const GL_2D = 0x0600
// export const GL_2PASS_0_EXT = 0x80A2
// export const GL_2PASS_0_SGIS = 0x80A2
// export const GL_2PASS_1_EXT = 0x80A3
// export const GL_2PASS_1_SGIS = 0x80A3
// export const GL_2X_BIT_ATI = 0x00000001
// export const GL_2_BYTES = 0x1407
// export const GL_3D = 0x0601
// export const GL_3D_COLOR = 0x0602
// export const GL_3D_COLOR_TEXTURE = 0x0603
// export const GL_3_BYTES = 0x1408
// export const GL_422_AVERAGE_EXT = 0x80CE
// export const GL_422_EXT = 0x80CC
// export const GL_422_REV_AVERAGE_EXT = 0x80CF
// export const GL_422_REV_EXT = 0x80CD
// export const GL_4D_COLOR_TEXTURE = 0x0604
// export const GL_4PASS_0_EXT = 0x80A4
// export const GL_4PASS_0_SGIS = 0x80A4
// export const GL_4PASS_1_EXT = 0x80A5
// export const GL_4PASS_1_SGIS = 0x80A5
// export const GL_4PASS_2_EXT = 0x80A6
// export const GL_4PASS_2_SGIS = 0x80A6
// export const GL_4PASS_3_EXT = 0x80A7
// export const GL_4PASS_3_SGIS = 0x80A7
// export const GL_4X_BIT_ATI = 0x00000002
// export const GL_4_BYTES = 0x1409
// export const GL_8X_BIT_ATI = 0x00000004
// export const GL_ABGR_EXT = 0x8000
// export const GL_ACCUM = 0x0100
// export const GL_ACCUM_ALPHA_BITS = 0x0D5B
// export const GL_ACCUM_BLUE_BITS = 0x0D5A
// export const GL_ACCUM_BUFFER_BIT = 0x00000200
// export const GL_ACCUM_CLEAR_VALUE = 0x0B80
// export const GL_ACCUM_GREEN_BITS = 0x0D59
// export const GL_ACCUM_RED_BITS = 0x0D58
// export const GL_ACTIVE_ATTRIBUTES = 0x8B89
// export const GL_ACTIVE_ATTRIBUTE_MAX_LENGTH = 0x8B8A
// export const GL_ACTIVE_STENCIL_FACE_EXT = 0x8911
// export const GL_ACTIVE_TEXTURE = 0x84E0
// export const GL_ACTIVE_TEXTURE_ARB = 0x84E0
// export const GL_ACTIVE_UNIFORMS = 0x8B86
// export const GL_ACTIVE_UNIFORM_MAX_LENGTH = 0x8B87
// export const GL_ACTIVE_VARYINGS_NV = 0x8C81
// export const GL_ACTIVE_VARYING_MAX_LENGTH_NV = 0x8C82
// export const GL_ACTIVE_VERTEX_UNITS_ARB = 0x86A5
// export const GL_ADD = 0x0104
// export const GL_ADD_ATI = 0x8963
// export const GL_ADD_SIGNED = 0x8574
// export const GL_ADD_SIGNED_ARB = 0x8574
// export const GL_ADD_SIGNED_EXT = 0x8574
// export const GL_ALIASED_LINE_WIDTH_RANGE = 0x846E
// export const GL_ALIASED_POINT_SIZE_RANGE = 0x846D
// export const GL_ALLOW_DRAW_FRG_HINT_PGI = 0x1A210
// export const GL_ALLOW_DRAW_MEM_HINT_PGI = 0x1A211
// export const GL_ALLOW_DRAW_OBJ_HINT_PGI = 0x1A20E
// export const GL_ALLOW_DRAW_WIN_HINT_PGI = 0x1A20F
// export const GL_ALL_ATTRIB_BITS = 0xFFFFFFFF
// export const GL_ALL_COMPLETED_NV = 0x84F2
// export const GL_ALPHA = 0x1906
// export const GL_ALPHA12 = 0x803D
// export const GL_ALPHA12_EXT = 0x803D
// export const GL_ALPHA16 = 0x803E
// export const GL_ALPHA16F_ARB = 0x881C
// export const GL_ALPHA16I_EXT = 0x8D8A
// export const GL_ALPHA16UI_EXT = 0x8D78
// export const GL_ALPHA16_EXT = 0x803E
// export const GL_ALPHA32F_ARB = 0x8816
// export const GL_ALPHA32I_EXT = 0x8D84
// export const GL_ALPHA32UI_EXT = 0x8D72
// export const GL_ALPHA4 = 0x803B
// export const GL_ALPHA4_EXT = 0x803B
// export const GL_ALPHA8 = 0x803C
// export const GL_ALPHA8I_EXT = 0x8D90
// export const GL_ALPHA8UI_EXT = 0x8D7E
// export const GL_ALPHA8_EXT = 0x803C
// export const GL_ALPHA_BIAS = 0x0D1D
// export const GL_ALPHA_BITS = 0x0D55
// export const GL_ALPHA_FLOAT16_ATI = 0x881C
// export const GL_ALPHA_FLOAT32_ATI = 0x8816
// export const GL_ALPHA_INTEGER = 0x8D97
// export const GL_ALPHA_INTEGER_EXT = 0x8D97
// export const GL_ALPHA_MAX_CLAMP_INGR = 0x8567
// export const GL_ALPHA_MAX_SGIX = 0x8321
// export const GL_ALPHA_MIN_CLAMP_INGR = 0x8563
// export const GL_ALPHA_MIN_SGIX = 0x8320
// export const GL_ALPHA_SCALE = 0x0D1C
// export const GL_ALPHA_TEST = 0x0BC0
// export const GL_ALPHA_TEST_FUNC = 0x0BC1
// export const GL_ALPHA_TEST_REF = 0x0BC2
// export const GL_ALWAYS = 0x0207
// export const GL_ALWAYS_FAST_HINT_PGI = 0x1A20C
// export const GL_ALWAYS_SOFT_HINT_PGI = 0x1A20D
// export const GL_AMBIENT = 0x1200
// export const GL_AMBIENT_AND_DIFFUSE = 0x1602
// export const GL_AND = 0x1501
// export const GL_AND_INVERTED = 0x1504
// export const GL_AND_REVERSE = 0x1502
// export const GL_ARB_imaging = 1
// export const GL_ARRAY_BUFFER = 0x8892
// export const GL_ARRAY_BUFFER_ARB = 0x8892
// export const GL_ARRAY_BUFFER_BINDING = 0x8894
// export const GL_ARRAY_BUFFER_BINDING_ARB = 0x8894
// export const GL_ARRAY_ELEMENT_LOCK_COUNT_EXT = 0x81A9
// export const GL_ARRAY_ELEMENT_LOCK_FIRST_EXT = 0x81A8
// export const GL_ARRAY_OBJECT_BUFFER_ATI = 0x8766
// export const GL_ARRAY_OBJECT_OFFSET_ATI = 0x8767
// export const GL_ASYNC_DRAW_PIXELS_SGIX = 0x835D
// export const GL_ASYNC_HISTOGRAM_SGIX = 0x832C
// export const GL_ASYNC_MARKER_SGIX = 0x8329
// export const GL_ASYNC_READ_PIXELS_SGIX = 0x835E
// export const GL_ASYNC_TEX_IMAGE_SGIX = 0x835C
// export const GL_ATTACHED_SHADERS = 0x8B85
// export const GL_ATTENUATION_EXT = 0x834D
// export const GL_ATTRIB_ARRAY_POINTER_NV = 0x8645
// export const GL_ATTRIB_ARRAY_SIZE_NV = 0x8623
// export const GL_ATTRIB_ARRAY_STRIDE_NV = 0x8624
// export const GL_ATTRIB_ARRAY_TYPE_NV = 0x8625
// export const GL_ATTRIB_STACK_DEPTH = 0x0BB0
// export const GL_AUTO_NORMAL = 0x0D80
// export const GL_AUX0 = 0x0409
// export const GL_AUX1 = 0x040A
// export const GL_AUX2 = 0x040B
// export const GL_AUX3 = 0x040C
// export const GL_AUX_BUFFERS = 0x0C00
// export const GL_AVERAGE_EXT = 0x8335
// export const GL_AVERAGE_HP = 0x8160
// export const GL_BACK = 0x0405
// export const GL_BACK_LEFT = 0x0402
// export const GL_BACK_NORMALS_HINT_PGI = 0x1A223
// export const GL_BACK_PRIMARY_COLOR_NV = 0x8C77
// export const GL_BACK_RIGHT = 0x0403
// export const GL_BACK_SECONDARY_COLOR_NV = 0x8C78
// export const GL_BGR = 0x80E0
// export const GL_BGRA = 0x80E1
// export const GL_BGRA_EXT = 0x80E1
// export const GL_BGRA_INTEGER = 0x8D9B
// export const GL_BGRA_INTEGER_EXT = 0x8D9B
// export const GL_BGR_EXT = 0x80E0
// export const GL_BGR_INTEGER = 0x8D9A
// export const GL_BGR_INTEGER_EXT = 0x8D9A
// export const GL_BIAS_BIT_ATI = 0x00000008
// export const GL_BIAS_BY_NEGATIVE_ONE_HALF_NV = 0x8541
// export const GL_BINORMAL_ARRAY_EXT = 0x843A
// export const GL_BINORMAL_ARRAY_POINTER_EXT = 0x8443
// export const GL_BINORMAL_ARRAY_STRIDE_EXT = 0x8441
// export const GL_BINORMAL_ARRAY_TYPE_EXT = 0x8440
// export const GL_BITMAP = 0x1A00
// export const GL_BITMAP_TOKEN = 0x0704
// export const GL_BLEND = 0x0BE2
// export const GL_BLEND_COLOR = 0x8005
// export const GL_BLEND_COLOR_EXT = 0x8005
// export const GL_BLEND_DST = 0x0BE0
// export const GL_BLEND_DST_ALPHA = 0x80CA
// export const GL_BLEND_DST_ALPHA_EXT = 0x80CA
// export const GL_BLEND_DST_RGB = 0x80C8
// export const GL_BLEND_DST_RGB_EXT = 0x80C8
// export const GL_BLEND_EQUATION = 0x8009
// export const GL_BLEND_EQUATION_ALPHA = 0x883D
// export const GL_BLEND_EQUATION_ALPHA_EXT = 0x883D
// export const GL_BLEND_EQUATION_EXT = 0x8009
// export const GL_BLEND_EQUATION_RGB = GL_BLEND_EQUATION
// export const GL_BLEND_EQUATION_RGB_EXT = GL_BLEND_EQUATION
// export const GL_BLEND_SRC = 0x0BE1
// export const GL_BLEND_SRC_ALPHA = 0x80CB
// export const GL_BLEND_SRC_ALPHA_EXT = 0x80CB
// export const GL_BLEND_SRC_RGB = 0x80C9
// export const GL_BLEND_SRC_RGB_EXT = 0x80C9
// export const GL_BLUE = 0x1905
// export const GL_BLUE_BIAS = 0x0D1B
// export const GL_BLUE_BITS = 0x0D54
// export const GL_BLUE_BIT_ATI = 0x00000004
// export const GL_BLUE_INTEGER = 0x8D96
// export const GL_BLUE_INTEGER_EXT = 0x8D96
// export const GL_BLUE_MAX_CLAMP_INGR = 0x8566
// export const GL_BLUE_MIN_CLAMP_INGR = 0x8562
// export const GL_BLUE_SCALE = 0x0D1A
// export const GL_BOOL = 0x8B56
// export const GL_BOOL_ARB = 0x8B56
// export const GL_BOOL_VEC2 = 0x8B57
// export const GL_BOOL_VEC2_ARB = 0x8B57
// export const GL_BOOL_VEC3 = 0x8B58
// export const GL_BOOL_VEC3_ARB = 0x8B58
// export const GL_BOOL_VEC4 = 0x8B59
// export const GL_BOOL_VEC4_ARB = 0x8B59
// export const GL_BUFFER_ACCESS = 0x88BB
// export const GL_BUFFER_ACCESS_ARB = 0x88BB
// export const GL_BUFFER_FLUSHING_UNMAP_APPLE = 0x8A13
// export const GL_BUFFER_MAPPED = 0x88BC
// export const GL_BUFFER_MAPPED_ARB = 0x88BC
// export const GL_BUFFER_MAP_POINTER = 0x88BD
// export const GL_BUFFER_MAP_POINTER_ARB = 0x88BD
// export const GL_BUFFER_SERIALIZED_MODIFY_APPLE = 0x8A12
// export const GL_BUFFER_SIZE = 0x8764
// export const GL_BUFFER_SIZE_ARB = 0x8764
// export const GL_BUFFER_USAGE = 0x8765
// export const GL_BUFFER_USAGE_ARB = 0x8765
// export const GL_BUMP_ENVMAP_ATI = 0x877B
// export const GL_BUMP_NUM_TEX_UNITS_ATI = 0x8777
// export const GL_BUMP_ROT_MATRIX_ATI = 0x8775
// export const GL_BUMP_ROT_MATRIX_SIZE_ATI = 0x8776
// export const GL_BUMP_TARGET_ATI = 0x877C
// export const GL_BUMP_TEX_UNITS_ATI = 0x8778
// export const GL_BYTE = 0x1400
// export const GL_C3F_V3F = 0x2A24
// export const GL_C4F_N3F_V3F = 0x2A26
// export const GL_C4UB_V2F = 0x2A22
// export const GL_C4UB_V3F = 0x2A23
// export const GL_CALLIGRAPHIC_FRAGMENT_SGIX = 0x8183
// export const GL_CCW = 0x0901
// export const GL_CLAMP = 0x2900
// export const GL_CLAMP_FRAGMENT_COLOR = 0x891B
// export const GL_CLAMP_FRAGMENT_COLOR_ARB = 0x891B
// export const GL_CLAMP_READ_COLOR = 0x891C
// export const GL_CLAMP_READ_COLOR_ARB = 0x891C
// export const GL_CLAMP_TO_BORDER = 0x812D
// export const GL_CLAMP_TO_BORDER_ARB = 0x812D
// export const GL_CLAMP_TO_BORDER_SGIS = 0x812D
// export const GL_CLAMP_TO_EDGE = 0x812F
// export const GL_CLAMP_TO_EDGE_SGIS = 0x812F
// export const GL_CLAMP_VERTEX_COLOR = 0x891A
// export const GL_CLAMP_VERTEX_COLOR_ARB = 0x891A
// export const GL_CLEAR = 0x1500
// export const GL_CLIENT_ACTIVE_TEXTURE = 0x84E1
// export const GL_CLIENT_ACTIVE_TEXTURE_ARB = 0x84E1
// export const GL_CLIENT_ALL_ATTRIB_BITS = 0xFFFFFFFF
// export const GL_CLIENT_ATTRIB_STACK_DEPTH = 0x0BB1
// export const GL_CLIENT_PIXEL_STORE_BIT = 0x00000001
// export const GL_CLIENT_VERTEX_ARRAY_BIT = 0x00000002
// export const GL_CLIP_DISTANCE_NV = 0x8C7A
// export const GL_CLIP_FAR_HINT_PGI = 0x1A221
// export const GL_CLIP_NEAR_HINT_PGI = 0x1A220
// export const GL_CLIP_PLANE0 = 0x3000
// export const GL_CLIP_PLANE1 = 0x3001
// export const GL_CLIP_PLANE2 = 0x3002
// export const GL_CLIP_PLANE3 = 0x3003
// export const GL_CLIP_PLANE4 = 0x3004
// export const GL_CLIP_PLANE5 = 0x3005
// export const GL_CLIP_DISTANCE0 = GL_CLIP_PLANE0
// export const GL_CLIP_DISTANCE1 = GL_CLIP_PLANE1
// export const GL_CLIP_DISTANCE2 = GL_CLIP_PLANE2
// export const GL_CLIP_DISTANCE3 = GL_CLIP_PLANE3
// export const GL_CLIP_DISTANCE4 = GL_CLIP_PLANE4
// export const GL_CLIP_DISTANCE5 = GL_CLIP_PLANE5
// export const GL_CLIP_VOLUME_CLIPPING_HINT_EXT = 0x80F0
// export const GL_CMYKA_EXT = 0x800D
// export const GL_CMYK_EXT = 0x800C
// export const GL_CND0_ATI = 0x896B
// export const GL_CND_ATI = 0x896A
// export const GL_COEFF = 0x0A00
// export const GL_COLOR = 0x1800
// export const GL_COLOR3_BIT_PGI = 0x00010000
// export const GL_COLOR4_BIT_PGI = 0x00020000
// export const GL_COLOR_ALPHA_PAIRING_ATI = 0x8975
// export const GL_COLOR_ARRAY = 0x8076
// export const GL_COLOR_ARRAY_BUFFER_BINDING = 0x8898
// export const GL_COLOR_ARRAY_BUFFER_BINDING_ARB = 0x8898
// export const GL_COLOR_ARRAY_COUNT_EXT = 0x8084
// export const GL_COLOR_ARRAY_EXT = 0x8076
// export const GL_COLOR_ARRAY_LIST_IBM = 103072
// export const GL_COLOR_ARRAY_LIST_STRIDE_IBM = 103082
// export const GL_COLOR_ARRAY_PARALLEL_POINTERS_INTEL = 0x83F7
// export const GL_COLOR_ARRAY_POINTER = 0x8090
// export const GL_COLOR_ARRAY_POINTER_EXT = 0x8090
// export const GL_COLOR_ARRAY_SIZE = 0x8081
// export const GL_COLOR_ARRAY_SIZE_EXT = 0x8081
// export const GL_COLOR_ARRAY_STRIDE = 0x8083
// export const GL_COLOR_ARRAY_STRIDE_EXT = 0x8083
// export const GL_COLOR_ARRAY_TYPE = 0x8082
// export const GL_COLOR_ARRAY_TYPE_EXT = 0x8082
// export const GL_COLOR_ATTACHMENT0 = 0x8CE0
// export const GL_COLOR_ATTACHMENT0_EXT = 0x8CE0
// export const GL_COLOR_ATTACHMENT1 = 0x8CE1
// export const GL_COLOR_ATTACHMENT10 = 0x8CEA
// export const GL_COLOR_ATTACHMENT10_EXT = 0x8CEA
// export const GL_COLOR_ATTACHMENT11 = 0x8CEB
// export const GL_COLOR_ATTACHMENT11_EXT = 0x8CEB
// export const GL_COLOR_ATTACHMENT12 = 0x8CEC
// export const GL_COLOR_ATTACHMENT12_EXT = 0x8CEC
// export const GL_COLOR_ATTACHMENT13 = 0x8CED
// export const GL_COLOR_ATTACHMENT13_EXT = 0x8CED
// export const GL_COLOR_ATTACHMENT14 = 0x8CEE
// export const GL_COLOR_ATTACHMENT14_EXT = 0x8CEE
// export const GL_COLOR_ATTACHMENT15 = 0x8CEF
// export const GL_COLOR_ATTACHMENT15_EXT = 0x8CEF
// export const GL_COLOR_ATTACHMENT1_EXT = 0x8CE1
// export const GL_COLOR_ATTACHMENT2 = 0x8CE2
// export const GL_COLOR_ATTACHMENT2_EXT = 0x8CE2
// export const GL_COLOR_ATTACHMENT3 = 0x8CE3
// export const GL_COLOR_ATTACHMENT3_EXT = 0x8CE3
// export const GL_COLOR_ATTACHMENT4 = 0x8CE4
// export const GL_COLOR_ATTACHMENT4_EXT = 0x8CE4
// export const GL_COLOR_ATTACHMENT5 = 0x8CE5
// export const GL_COLOR_ATTACHMENT5_EXT = 0x8CE5
// export const GL_COLOR_ATTACHMENT6 = 0x8CE6
// export const GL_COLOR_ATTACHMENT6_EXT = 0x8CE6
// export const GL_COLOR_ATTACHMENT7 = 0x8CE7
// export const GL_COLOR_ATTACHMENT7_EXT = 0x8CE7
// export const GL_COLOR_ATTACHMENT8 = 0x8CE8
// export const GL_COLOR_ATTACHMENT8_EXT = 0x8CE8
// export const GL_COLOR_ATTACHMENT9 = 0x8CE9
// export const GL_COLOR_ATTACHMENT9_EXT = 0x8CE9
// export const GL_COLOR_BUFFER_BIT = 0x00004000
// export const GL_COLOR_CLEAR_UNCLAMPED_VALUE_ATI = 0x8835
// export const GL_COLOR_CLEAR_VALUE = 0x0C22
// export const GL_COLOR_INDEX = 0x1900
// export const GL_COLOR_INDEX12_EXT = 0x80E6
// export const GL_COLOR_INDEX16_EXT = 0x80E7
// export const GL_COLOR_INDEX1_EXT = 0x80E2
// export const GL_COLOR_INDEX2_EXT = 0x80E3
// export const GL_COLOR_INDEX4_EXT = 0x80E4
// export const GL_COLOR_INDEX8_EXT = 0x80E5
// export const GL_COLOR_INDEXES = 0x1603
// export const GL_COLOR_LOGIC_OP = 0x0BF2
// export const GL_COLOR_MATERIAL = 0x0B57
// export const GL_COLOR_MATERIAL_FACE = 0x0B55
// export const GL_COLOR_MATERIAL_PARAMETER = 0x0B56
// export const GL_COLOR_MATRIX = 0x80B1
// export const GL_COLOR_MATRIX_SGI = 0x80B1
// export const GL_COLOR_MATRIX_STACK_DEPTH = 0x80B2
// export const GL_COLOR_MATRIX_STACK_DEPTH_SGI = 0x80B2
// export const GL_COLOR_SUM = 0x8458
// export const GL_COLOR_SUM_ARB = 0x8458
// export const GL_COLOR_SUM_CLAMP_NV = 0x854F
// export const GL_COLOR_SUM_EXT = 0x8458
// export const GL_COLOR_TABLE = 0x80D0
// export const GL_COLOR_TABLE_ALPHA_SIZE = 0x80DD
// export const GL_COLOR_TABLE_ALPHA_SIZE_SGI = 0x80DD
// export const GL_COLOR_TABLE_BIAS = 0x80D7
// export const GL_COLOR_TABLE_BIAS_SGI = 0x80D7
// export const GL_COLOR_TABLE_BLUE_SIZE = 0x80DC
// export const GL_COLOR_TABLE_BLUE_SIZE_SGI = 0x80DC
// export const GL_COLOR_TABLE_FORMAT = 0x80D8
// export const GL_COLOR_TABLE_FORMAT_SGI = 0x80D8
// export const GL_COLOR_TABLE_GREEN_SIZE = 0x80DB
// export const GL_COLOR_TABLE_GREEN_SIZE_SGI = 0x80DB
// export const GL_COLOR_TABLE_INTENSITY_SIZE = 0x80DF
// export const GL_COLOR_TABLE_INTENSITY_SIZE_SGI = 0x80DF
// export const GL_COLOR_TABLE_LUMINANCE_SIZE = 0x80DE
// export const GL_COLOR_TABLE_LUMINANCE_SIZE_SGI = 0x80DE
// export const GL_COLOR_TABLE_RED_SIZE = 0x80DA
// export const GL_COLOR_TABLE_RED_SIZE_SGI = 0x80DA
// export const GL_COLOR_TABLE_SCALE = 0x80D6
// export const GL_COLOR_TABLE_SCALE_SGI = 0x80D6
// export const GL_COLOR_TABLE_SGI = 0x80D0
// export const GL_COLOR_TABLE_WIDTH = 0x80D9
// export const GL_COLOR_TABLE_WIDTH_SGI = 0x80D9
// export const GL_COLOR_WRITEMASK = 0x0C23
// export const GL_COMBINE = 0x8570
// export const GL_COMBINE4_NV = 0x8503
// export const GL_COMBINER0_NV = 0x8550
// export const GL_COMBINER1_NV = 0x8551
// export const GL_COMBINER2_NV = 0x8552
// export const GL_COMBINER3_NV = 0x8553
// export const GL_COMBINER4_NV = 0x8554
// export const GL_COMBINER5_NV = 0x8555
// export const GL_COMBINER6_NV = 0x8556
// export const GL_COMBINER7_NV = 0x8557
// export const GL_COMBINER_AB_DOT_PRODUCT_NV = 0x8545
// export const GL_COMBINER_AB_OUTPUT_NV = 0x854A
// export const GL_COMBINER_BIAS_NV = 0x8549
// export const GL_COMBINER_CD_DOT_PRODUCT_NV = 0x8546
// export const GL_COMBINER_CD_OUTPUT_NV = 0x854B
// export const GL_COMBINER_COMPONENT_USAGE_NV = 0x8544
// export const GL_COMBINER_INPUT_NV = 0x8542
// export const GL_COMBINER_MAPPING_NV = 0x8543
// export const GL_COMBINER_MUX_SUM_NV = 0x8547
// export const GL_COMBINER_SCALE_NV = 0x8548
// export const GL_COMBINER_SUM_OUTPUT_NV = 0x854C
// export const GL_COMBINE_ALPHA = 0x8572
// export const GL_COMBINE_ALPHA_ARB = 0x8572
// export const GL_COMBINE_ALPHA_EXT = 0x8572
// export const GL_COMBINE_ARB = 0x8570
// export const GL_COMBINE_EXT = 0x8570
// export const GL_COMBINE_RGB = 0x8571
// export const GL_COMBINE_RGB_ARB = 0x8571
// export const GL_COMBINE_RGB_EXT = 0x8571
// export const GL_COMPARE_REF_DEPTH_TO_TEXTURE_EXT = 0x884E
// export const GL_COMPARE_R_TO_TEXTURE = 0x884E
// export const GL_COMPARE_R_TO_TEXTURE_ARB = 0x884E
// export const GL_COMPARE_REF_TO_TEXTURE = GL_COMPARE_R_TO_TEXTURE_ARB
// export const GL_COMPILE = 0x1300
// export const GL_COMPILE_AND_EXECUTE = 0x1301
// export const GL_COMPILE_STATUS = 0x8B81
// export const GL_COMPRESSED_ALPHA = 0x84E9
// export const GL_COMPRESSED_ALPHA_ARB = 0x84E9
// export const GL_COMPRESSED_INTENSITY = 0x84EC
// export const GL_COMPRESSED_INTENSITY_ARB = 0x84EC
// export const GL_COMPRESSED_LUMINANCE = 0x84EA
// export const GL_COMPRESSED_LUMINANCE_ALPHA = 0x84EB
// export const GL_COMPRESSED_LUMINANCE_ALPHA_ARB = 0x84EB
// export const GL_COMPRESSED_LUMINANCE_ALPHA_LATC2_EXT = 0x8C72
// export const GL_COMPRESSED_LUMINANCE_ARB = 0x84EA
// export const GL_COMPRESSED_LUMINANCE_LATC1_EXT = 0x8C70
// export const GL_COMPRESSED_RED = 0x8225
// export const GL_COMPRESSED_RED_GREEN_RGTC2_EXT = 0x8DBD
// export const GL_COMPRESSED_RED_RGTC1 = 0x8DBB
// export const GL_COMPRESSED_RED_RGTC1_EXT = 0x8DBB
// export const GL_COMPRESSED_RG = 0x8226
// export const GL_COMPRESSED_RGB = 0x84ED
// export const GL_COMPRESSED_RGBA = 0x84EE
// export const GL_COMPRESSED_RGBA_ARB = 0x84EE
// export const GL_COMPRESSED_RGBA_FXT1_3DFX = 0x86B1
// export const GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1
// export const GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2
// export const GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3
// export const GL_COMPRESSED_RGB_ARB = 0x84ED
// export const GL_COMPRESSED_RGB_FXT1_3DFX = 0x86B0
// export const GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0
// export const GL_COMPRESSED_RG_RGTC2 = 0x8DBD
// export const GL_COMPRESSED_SIGNED_LUMINANCE_ALPHA_LATC2_EXT = 0x8C73
// export const GL_COMPRESSED_SIGNED_LUMINANCE_LATC1_EXT = 0x8C71
// export const GL_COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT = 0x8DBE
// export const GL_COMPRESSED_SIGNED_RED_RGTC1 = 0x8DBC
// export const GL_COMPRESSED_SIGNED_RED_RGTC1_EXT = 0x8DBC
// export const GL_COMPRESSED_SIGNED_RG_RGTC2 = 0x8DBE
// export const GL_COMPRESSED_SLUMINANCE = 0x8C4A
// export const GL_COMPRESSED_SLUMINANCE_ALPHA = 0x8C4B
// export const GL_COMPRESSED_SLUMINANCE_ALPHA_EXT = 0x8C4B
// export const GL_COMPRESSED_SLUMINANCE_EXT = 0x8C4A
// export const GL_COMPRESSED_SRGB = 0x8C48
// export const GL_COMPRESSED_SRGB_ALPHA = 0x8C49
// export const GL_COMPRESSED_SRGB_ALPHA_EXT = 0x8C49
// export const GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 0x8C4D
// export const GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 0x8C4E
// export const GL_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 0x8C4F
// export const GL_COMPRESSED_SRGB_EXT = 0x8C48
// export const GL_COMPRESSED_SRGB_S3TC_DXT1_EXT = 0x8C4C
// export const GL_COMPRESSED_TEXTURE_FORMATS = 0x86A3
// export const GL_COMPRESSED_TEXTURE_FORMATS_ARB = 0x86A3
// export const GL_COMP_BIT_ATI = 0x00000002
// export const GL_CONSERVE_MEMORY_HINT_PGI = 0x1A1FD
// export const GL_CONSTANT = 0x8576
// export const GL_CONSTANT_ALPHA = 0x8003
// export const GL_CONSTANT_ALPHA_EXT = 0x8003
// export const GL_CONSTANT_ARB = 0x8576
// export const GL_CONSTANT_ATTENUATION = 0x1207
// export const GL_CONSTANT_BORDER = 0x8151
// export const GL_CONSTANT_BORDER_HP = 0x8151
// export const GL_CONSTANT_COLOR = 0x8001
// export const GL_CONSTANT_COLOR0_NV = 0x852A
// export const GL_CONSTANT_COLOR1_NV = 0x852B
// export const GL_CONSTANT_COLOR_EXT = 0x8001
// export const GL_CONSTANT_EXT = 0x8576
// export const GL_CONST_EYE_NV = 0x86E5
// export const GL_CONTEXT_FLAGS = 0x821E
// export const GL_CONTEXT_FLAG_FORWARD_COMPATIBLE_BIT = 0x0001
// export const GL_CONVOLUTION_1D = 0x8010
// export const GL_CONVOLUTION_1D_EXT = 0x8010
// export const GL_CONVOLUTION_2D = 0x8011
// export const GL_CONVOLUTION_2D_EXT = 0x8011
// export const GL_CONVOLUTION_BORDER_COLOR = 0x8154
// export const GL_CONVOLUTION_BORDER_COLOR_HP = 0x8154
// export const GL_CONVOLUTION_BORDER_MODE = 0x8013
// export const GL_CONVOLUTION_BORDER_MODE_EXT = 0x8013
// export const GL_CONVOLUTION_FILTER_BIAS = 0x8015
// export const GL_CONVOLUTION_FILTER_BIAS_EXT = 0x8015
// export const GL_CONVOLUTION_FILTER_SCALE = 0x8014
// export const GL_CONVOLUTION_FILTER_SCALE_EXT = 0x8014
// export const GL_CONVOLUTION_FORMAT = 0x8017
// export const GL_CONVOLUTION_FORMAT_EXT = 0x8017
// export const GL_CONVOLUTION_HEIGHT = 0x8019
// export const GL_CONVOLUTION_HEIGHT_EXT = 0x8019
// export const GL_CONVOLUTION_HINT_SGIX = 0x8316
// export const GL_CONVOLUTION_WIDTH = 0x8018
// export const GL_CONVOLUTION_WIDTH_EXT = 0x8018
// export const GL_CON_0_ATI = 0x8941
// export const GL_CON_10_ATI = 0x894B
// export const GL_CON_11_ATI = 0x894C
// export const GL_CON_12_ATI = 0x894D
// export const GL_CON_13_ATI = 0x894E
// export const GL_CON_14_ATI = 0x894F
// export const GL_CON_15_ATI = 0x8950
// export const GL_CON_16_ATI = 0x8951
// export const GL_CON_17_ATI = 0x8952
// export const GL_CON_18_ATI = 0x8953
// export const GL_CON_19_ATI = 0x8954
// export const GL_CON_1_ATI = 0x8942
// export const GL_CON_20_ATI = 0x8955
// export const GL_CON_21_ATI = 0x8956
// export const GL_CON_22_ATI = 0x8957
// export const GL_CON_23_ATI = 0x8958
// export const GL_CON_24_ATI = 0x8959
// export const GL_CON_25_ATI = 0x895A
// export const GL_CON_26_ATI = 0x895B
// export const GL_CON_27_ATI = 0x895C
// export const GL_CON_28_ATI = 0x895D
// export const GL_CON_29_ATI = 0x895E
// export const GL_CON_2_ATI = 0x8943
// export const GL_CON_30_ATI = 0x895F
// export const GL_CON_31_ATI = 0x8960
// export const GL_CON_3_ATI = 0x8944
// export const GL_CON_4_ATI = 0x8945
// export const GL_CON_5_ATI = 0x8946
// export const GL_CON_6_ATI = 0x8947
// export const GL_CON_7_ATI = 0x8948
// export const GL_CON_8_ATI = 0x8949
// export const GL_CON_9_ATI = 0x894A
// export const GL_COORD_REPLACE = 0x8862
// export const GL_COORD_REPLACE_ARB = 0x8862
// export const GL_COORD_REPLACE_NV = 0x8862
// export const GL_COPY = 0x1503
// export const GL_COPY_INVERTED = 0x150C
// export const GL_COPY_PIXEL_TOKEN = 0x0706
// export const GL_CUBIC_EXT = 0x8334
// export const GL_CUBIC_HP = 0x815F
// export const GL_CULL_FACE = 0x0B44
// export const GL_CULL_FACE_MODE = 0x0B45
// export const GL_CULL_FRAGMENT_NV = 0x86E7
// export const GL_CULL_MODES_NV = 0x86E0
// export const GL_CULL_VERTEX_EXT = 0x81AA
// export const GL_CULL_VERTEX_EYE_POSITION_EXT = 0x81AB
// export const GL_CULL_VERTEX_IBM = 103050
// export const GL_CULL_VERTEX_OBJECT_POSITION_EXT = 0x81AC
// export const GL_CURRENT_ATTRIB_NV = 0x8626
// export const GL_CURRENT_BINORMAL_EXT = 0x843C
// export const GL_CURRENT_BIT = 0x00000001
// export const GL_CURRENT_COLOR = 0x0B00
// export const GL_CURRENT_FOG_COORDINATE = 0x8453
// export const GL_CURRENT_FOG_COORD = GL_CURRENT_FOG_COORDINATE
// export const GL_CURRENT_FOG_COORDINATE_EXT = 0x8453
// export const GL_CURRENT_INDEX = 0x0B01
// export const GL_CURRENT_MATRIX_ARB = 0x8641
// export const GL_CURRENT_MATRIX_INDEX_ARB = 0x8845
// export const GL_CURRENT_MATRIX_NV = 0x8641
// export const GL_CURRENT_MATRIX_STACK_DEPTH_ARB = 0x8640
// export const GL_CURRENT_MATRIX_STACK_DEPTH_NV = 0x8640
// export const GL_CURRENT_NORMAL = 0x0B02
// export const GL_CURRENT_OCCLUSION_QUERY_ID_NV = 0x8865
// export const GL_CURRENT_PALETTE_MATRIX_ARB = 0x8843
// export const GL_CURRENT_PROGRAM = 0x8B8D
// export const GL_CURRENT_QUERY = 0x8865
// export const GL_CURRENT_QUERY_ARB = 0x8865
// export const GL_CURRENT_RASTER_COLOR = 0x0B04
// export const GL_CURRENT_RASTER_DISTANCE = 0x0B09
// export const GL_CURRENT_RASTER_INDEX = 0x0B05
// export const GL_CURRENT_RASTER_NORMAL_SGIX = 0x8406
// export const GL_CURRENT_RASTER_POSITION = 0x0B07
// export const GL_CURRENT_RASTER_POSITION_VALID = 0x0B08
// export const GL_CURRENT_RASTER_SECONDARY_COLOR = 0x845F
// export const GL_CURRENT_RASTER_TEXTURE_COORDS = 0x0B06
// export const GL_CURRENT_SECONDARY_COLOR = 0x8459
// export const GL_CURRENT_SECONDARY_COLOR_EXT = 0x8459
// export const GL_CURRENT_TANGENT_EXT = 0x843B
// export const GL_CURRENT_TEXTURE_COORDS = 0x0B03
// export const GL_CURRENT_TIME_NV = 0x8E28
// export const GL_CURRENT_VERTEX_ATTRIB = 0x8626
// export const GL_CURRENT_VERTEX_ATTRIB_ARB = 0x8626
// export const GL_CURRENT_VERTEX_EXT = 0x87E2
// export const GL_CURRENT_VERTEX_WEIGHT_EXT = 0x850B
// export const GL_CURRENT_WEIGHT_ARB = 0x86A8
// export const GL_CW = 0x0900
// export const GL_DECAL = 0x2101
// export const GL_DECR = 0x1E03
// export const GL_DECR_WRAP = 0x8508
// export const GL_DECR_WRAP_EXT = 0x8508
// export const GL_DEFORMATIONS_MASK_SGIX = 0x8196
// export const GL_DELETE_STATUS = 0x8B80
// export const GL_DEPENDENT_AR_TEXTURE_2D_NV = 0x86E9
// export const GL_DEPENDENT_GB_TEXTURE_2D_NV = 0x86EA
// export const GL_DEPENDENT_HILO_TEXTURE_2D_NV = 0x8858
// export const GL_DEPENDENT_RGB_TEXTURE_3D_NV = 0x8859
// export const GL_DEPENDENT_RGB_TEXTURE_CUBE_MAP_NV = 0x885A
// export const GL_DEPTH = 0x1801
// export const GL_DEPTH24_STENCIL8 = 0x88F0
// export const GL_DEPTH24_STENCIL8_EXT = 0x88F0
// export const GL_DEPTH32F_STENCIL8 = 0x8CAD
// export const GL_DEPTH32F_STENCIL8_NV = 0x8DAC
// export const GL_DEPTH_ATTACHMENT = 0x8D00
// export const GL_DEPTH_ATTACHMENT_EXT = 0x8D00
// export const GL_DEPTH_BIAS = 0x0D1F
// export const GL_DEPTH_BITS = 0x0D56
// export const GL_DEPTH_BOUNDS_EXT = 0x8891
// export const GL_DEPTH_BOUNDS_TEST_EXT = 0x8890
// export const GL_DEPTH_BUFFER = 0x8223
// export const GL_DEPTH_BUFFER_BIT = 0x00000100
// export const GL_DEPTH_BUFFER_FLOAT_MODE_NV = 0x8DAF
// export const GL_DEPTH_CLAMP_NV = 0x864F
// export const GL_DEPTH_CLEAR_VALUE = 0x0B73
// export const GL_DEPTH_COMPONENT = 0x1902
// export const GL_DEPTH_COMPONENT16 = 0x81A5
// export const GL_DEPTH_COMPONENT16_ARB = 0x81A5
// export const GL_DEPTH_COMPONENT16_SGIX = 0x81A5
// export const GL_DEPTH_COMPONENT24 = 0x81A6
// export const GL_DEPTH_COMPONENT24_ARB = 0x81A6
// export const GL_DEPTH_COMPONENT24_SGIX = 0x81A6
// export const GL_DEPTH_COMPONENT32 = 0x81A7
// export const GL_DEPTH_COMPONENT32F = 0x8CAC
// export const GL_DEPTH_COMPONENT32F_NV = 0x8DAB
// export const GL_DEPTH_COMPONENT32_ARB = 0x81A7
// export const GL_DEPTH_COMPONENT32_SGIX = 0x81A7
// export const GL_DEPTH_FUNC = 0x0B74
// export const GL_DEPTH_PASS_INSTRUMENT_COUNTERS_SGIX = 0x8311
// export const GL_DEPTH_PASS_INSTRUMENT_MAX_SGIX = 0x8312
// export const GL_DEPTH_PASS_INSTRUMENT_SGIX = 0x8310
// export const GL_DEPTH_RANGE = 0x0B70
// export const GL_DEPTH_SCALE = 0x0D1E
// export const GL_DEPTH_STENCIL = 0x84F9
// export const GL_DEPTH_STENCIL_ATTACHMENT = 0x821A
// export const GL_DEPTH_STENCIL_EXT = 0x84F9
// export const GL_DEPTH_STENCIL_NV = 0x84F9
// export const GL_DEPTH_STENCIL_TO_BGRA_NV = 0x886F
// export const GL_DEPTH_STENCIL_TO_RGBA_NV = 0x886E
// export const GL_DEPTH_TEST = 0x0B71
// export const GL_DEPTH_TEXTURE_MODE = 0x884B
// export const GL_DEPTH_TEXTURE_MODE_ARB = 0x884B
// export const GL_DEPTH_WRITEMASK = 0x0B72
// export const GL_DETAIL_TEXTURE_2D_BINDING_SGIS = 0x8096
// export const GL_DETAIL_TEXTURE_2D_SGIS = 0x8095
// export const GL_DETAIL_TEXTURE_FUNC_POINTS_SGIS = 0x809C
// export const GL_DETAIL_TEXTURE_LEVEL_SGIS = 0x809A
// export const GL_DETAIL_TEXTURE_MODE_SGIS = 0x809B
// export const GL_DIFFUSE = 0x1201
// export const GL_DISCARD_ATI = 0x8763
// export const GL_DISCARD_NV = 0x8530
// export const GL_DISTANCE_ATTENUATION_EXT = 0x8129
// export const GL_DISTANCE_ATTENUATION_SGIS = 0x8129
// export const GL_DITHER = 0x0BD0
// export const GL_DOMAIN = 0x0A02
// export const GL_DONT_CARE = 0x1100
// export const GL_DOT2_ADD_ATI = 0x896C
// export const GL_DOT3_ATI = 0x8966
// export const GL_DOT3_RGB = 0x86AE
// export const GL_DOT3_RGBA = 0x86AF
// export const GL_DOT3_RGBA_ARB = 0x86AF
// export const GL_DOT3_RGBA_EXT = 0x8741
// export const GL_DOT3_RGB_ARB = 0x86AE
// export const GL_DOT3_RGB_EXT = 0x8740
// export const GL_DOT4_ATI = 0x8967
// export const GL_DOT_PRODUCT_AFFINE_DEPTH_REPLACE_NV = 0x885D
// export const GL_DOT_PRODUCT_CONST_EYE_REFLECT_CUBE_MAP_NV = 0x86F3
// export const GL_DOT_PRODUCT_DEPTH_REPLACE_NV = 0x86ED
// export const GL_DOT_PRODUCT_DIFFUSE_CUBE_MAP_NV = 0x86F1
// export const GL_DOT_PRODUCT_NV = 0x86EC
// export const GL_DOT_PRODUCT_PASS_THROUGH_NV = 0x885B
// export const GL_DOT_PRODUCT_REFLECT_CUBE_MAP_NV = 0x86F2
// export const GL_DOT_PRODUCT_TEXTURE_1D_NV = 0x885C
// export const GL_DOT_PRODUCT_TEXTURE_2D_NV = 0x86EE
// export const GL_DOT_PRODUCT_TEXTURE_3D_NV = 0x86EF
// export const GL_DOT_PRODUCT_TEXTURE_CUBE_MAP_NV = 0x86F0
// export const GL_DOT_PRODUCT_TEXTURE_RECTANGLE_NV = 0x864E
// export const GL_DOUBLE = 0x140A
// export const GL_DOUBLEBUFFER = 0x0C32
// export const GL_DOUBLE_EXT = 0x140A
// export const GL_DRAW_BUFFER = 0x0C01
// export const GL_DRAW_BUFFER0 = 0x8825
// export const GL_DRAW_BUFFER0_ARB = 0x8825
// export const GL_DRAW_BUFFER0_ATI = 0x8825
// export const GL_DRAW_BUFFER1 = 0x8826
// export const GL_DRAW_BUFFER10 = 0x882F
// export const GL_DRAW_BUFFER10_ARB = 0x882F
// export const GL_DRAW_BUFFER10_ATI = 0x882F
// export const GL_DRAW_BUFFER11 = 0x8830
// export const GL_DRAW_BUFFER11_ARB = 0x8830
// export const GL_DRAW_BUFFER11_ATI = 0x8830
// export const GL_DRAW_BUFFER12 = 0x8831
// export const GL_DRAW_BUFFER12_ARB = 0x8831
// export const GL_DRAW_BUFFER12_ATI = 0x8831
// export const GL_DRAW_BUFFER13 = 0x8832
// export const GL_DRAW_BUFFER13_ARB = 0x8832
// export const GL_DRAW_BUFFER13_ATI = 0x8832
// export const GL_DRAW_BUFFER14 = 0x8833
// export const GL_DRAW_BUFFER14_ARB = 0x8833
// export const GL_DRAW_BUFFER14_ATI = 0x8833
// export const GL_DRAW_BUFFER15 = 0x8834
// export const GL_DRAW_BUFFER15_ARB = 0x8834
// export const GL_DRAW_BUFFER15_ATI = 0x8834
// export const GL_DRAW_BUFFER1_ARB = 0x8826
// export const GL_DRAW_BUFFER1_ATI = 0x8826
// export const GL_DRAW_BUFFER2 = 0x8827
// export const GL_DRAW_BUFFER2_ARB = 0x8827
// export const GL_DRAW_BUFFER2_ATI = 0x8827
// export const GL_DRAW_BUFFER3 = 0x8828
// export const GL_DRAW_BUFFER3_ARB = 0x8828
// export const GL_DRAW_BUFFER3_ATI = 0x8828
// export const GL_DRAW_BUFFER4 = 0x8829
// export const GL_DRAW_BUFFER4_ARB = 0x8829
// export const GL_DRAW_BUFFER4_ATI = 0x8829
// export const GL_DRAW_BUFFER5 = 0x882A
// export const GL_DRAW_BUFFER5_ARB = 0x882A
// export const GL_DRAW_BUFFER5_ATI = 0x882A
// export const GL_DRAW_BUFFER6 = 0x882B
// export const GL_DRAW_BUFFER6_ARB = 0x882B
// export const GL_DRAW_BUFFER6_ATI = 0x882B
// export const GL_DRAW_BUFFER7 = 0x882C
// export const GL_DRAW_BUFFER7_ARB = 0x882C
// export const GL_DRAW_BUFFER7_ATI = 0x882C
// export const GL_DRAW_BUFFER8 = 0x882D
// export const GL_DRAW_BUFFER8_ARB = 0x882D
// export const GL_DRAW_BUFFER8_ATI = 0x882D
// export const GL_DRAW_BUFFER9 = 0x882E
// export const GL_DRAW_BUFFER9_ARB = 0x882E
// export const GL_DRAW_BUFFER9_ATI = 0x882E
// export const GL_DRAW_FRAMEBUFFER = 0x8CA9
// export const GL_DRAW_FRAMEBUFFER_EXT = 0x8CA9
// export const GL_DRAW_PIXELS_APPLE = 0x8A0A
// export const GL_DRAW_PIXEL_TOKEN = 0x0705
// export const GL_DSDT8_MAG8_INTENSITY8_NV = 0x870B
// export const GL_DSDT8_MAG8_NV = 0x870A
// export const GL_DSDT8_NV = 0x8709
// export const GL_DSDT_MAG_INTENSITY_NV = 0x86DC
// export const GL_DSDT_MAG_NV = 0x86F6
// export const GL_DSDT_MAG_VIB_NV = 0x86F7
// export const GL_DSDT_NV = 0x86F5
// export const GL_DST_ALPHA = 0x0304
// export const GL_DST_COLOR = 0x0306
// export const GL_DS_BIAS_NV = 0x8716
// export const GL_DS_SCALE_NV = 0x8710
// export const GL_DT_BIAS_NV = 0x8717
// export const GL_DT_SCALE_NV = 0x8711
// export const GL_DU8DV8_ATI = 0x877A
// export const GL_DUAL_ALPHA12_SGIS = 0x8112
// export const GL_DUAL_ALPHA16_SGIS = 0x8113
// export const GL_DUAL_ALPHA4_SGIS = 0x8110
// export const GL_DUAL_ALPHA8_SGIS = 0x8111
// export const GL_DUAL_INTENSITY12_SGIS = 0x811A
// export const GL_DUAL_INTENSITY16_SGIS = 0x811B
// export const GL_DUAL_INTENSITY4_SGIS = 0x8118
// export const GL_DUAL_INTENSITY8_SGIS = 0x8119
// export const GL_DUAL_LUMINANCE12_SGIS = 0x8116
// export const GL_DUAL_LUMINANCE16_SGIS = 0x8117
// export const GL_DUAL_LUMINANCE4_SGIS = 0x8114
// export const GL_DUAL_LUMINANCE8_SGIS = 0x8115
// export const GL_DUAL_LUMINANCE_ALPHA4_SGIS = 0x811C
// export const GL_DUAL_LUMINANCE_ALPHA8_SGIS = 0x811D
// export const GL_DUAL_TEXTURE_SELECT_SGIS = 0x8124
// export const GL_DUDV_ATI = 0x8779
// export const GL_DYNAMIC_ATI = 0x8761
// export const GL_DYNAMIC_COPY = 0x88EA
// export const GL_DYNAMIC_COPY_ARB = 0x88EA
// export const GL_DYNAMIC_DRAW = 0x88E8
// export const GL_DYNAMIC_DRAW_ARB = 0x88E8
// export const GL_DYNAMIC_READ = 0x88E9
// export const GL_DYNAMIC_READ_ARB = 0x88E9
// export const GL_EDGEFLAG_BIT_PGI = 0x00040000
// export const GL_EDGE_FLAG = 0x0B43
// export const GL_EDGE_FLAG_ARRAY = 0x8079
// export const GL_EDGE_FLAG_ARRAY_BUFFER_BINDING = 0x889B
// export const GL_EDGE_FLAG_ARRAY_BUFFER_BINDING_ARB = 0x889B
// export const GL_EDGE_FLAG_ARRAY_COUNT_EXT = 0x808D
// export const GL_EDGE_FLAG_ARRAY_EXT = 0x8079
// export const GL_EDGE_FLAG_ARRAY_LIST_IBM = 103075
// export const GL_EDGE_FLAG_ARRAY_LIST_STRIDE_IBM = 103085
// export const GL_EDGE_FLAG_ARRAY_POINTER = 0x8093
// export const GL_EDGE_FLAG_ARRAY_POINTER_EXT = 0x8093
// export const GL_EDGE_FLAG_ARRAY_STRIDE = 0x808C
// export const GL_EDGE_FLAG_ARRAY_STRIDE_EXT = 0x808C
// export const GL_EIGHTH_BIT_ATI = 0x00000020
// export const GL_ELEMENT_ARRAY_APPLE = 0x8768
// export const GL_ELEMENT_ARRAY_ATI = 0x8768
// export const GL_ELEMENT_ARRAY_BUFFER = 0x8893
// export const GL_ELEMENT_ARRAY_BUFFER_ARB = 0x8893
// export const GL_ELEMENT_ARRAY_BUFFER_BINDING = 0x8895
// export const GL_ELEMENT_ARRAY_BUFFER_BINDING_ARB = 0x8895
// export const GL_ELEMENT_ARRAY_POINTER_APPLE = 0x876A
// export const GL_ELEMENT_ARRAY_POINTER_ATI = 0x876A
// export const GL_ELEMENT_ARRAY_TYPE_APPLE = 0x8769
// export const GL_ELEMENT_ARRAY_TYPE_ATI = 0x8769
// export const GL_EMBOSS_CONSTANT_NV = 0x855E
// export const GL_EMBOSS_LIGHT_NV = 0x855D
// export const GL_EMBOSS_MAP_NV = 0x855F
// export const GL_EMISSION = 0x1600
// export const GL_ENABLE_BIT = 0x00002000
// export const GL_EQUAL = 0x0202
// export const GL_EQUIV = 0x1509
// export const GL_EVAL_2D_NV = 0x86C0
// export const GL_EVAL_BIT = 0x00010000
// export const GL_EVAL_FRACTIONAL_TESSELLATION_NV = 0x86C5
// export const GL_EVAL_TRIANGULAR_2D_NV = 0x86C1
// export const GL_EVAL_VERTEX_ATTRIB0_NV = 0x86C6
// export const GL_EVAL_VERTEX_ATTRIB10_NV = 0x86D0
// export const GL_EVAL_VERTEX_ATTRIB11_NV = 0x86D1
// export const GL_EVAL_VERTEX_ATTRIB12_NV = 0x86D2
// export const GL_EVAL_VERTEX_ATTRIB13_NV = 0x86D3
// export const GL_EVAL_VERTEX_ATTRIB14_NV = 0x86D4
// export const GL_EVAL_VERTEX_ATTRIB15_NV = 0x86D5
// export const GL_EVAL_VERTEX_ATTRIB1_NV = 0x86C7
// export const GL_EVAL_VERTEX_ATTRIB2_NV = 0x86C8
// export const GL_EVAL_VERTEX_ATTRIB3_NV = 0x86C9
// export const GL_EVAL_VERTEX_ATTRIB4_NV = 0x86CA
// export const GL_EVAL_VERTEX_ATTRIB5_NV = 0x86CB
// export const GL_EVAL_VERTEX_ATTRIB6_NV = 0x86CC
// export const GL_EVAL_VERTEX_ATTRIB7_NV = 0x86CD
// export const GL_EVAL_VERTEX_ATTRIB8_NV = 0x86CE
// export const GL_EVAL_VERTEX_ATTRIB9_NV = 0x86CF
// export const GL_EXP = 0x0800
// export const GL_EXP2 = 0x0801
// export const GL_EXPAND_NEGATE_NV = 0x8539
// export const GL_EXPAND_NORMAL_NV = 0x8538
// export const GL_EXTENSIONS = 0x1F03
// export const GL_EXT_abgr = 1
// export const GL_EXT_blend_color = 1
// export const GL_EXT_blend_logic_op = 1
// export const GL_EXT_blend_minmax = 1
// export const GL_EXT_blend_subtract = 1
// export const GL_EXT_cmyka = 1
// export const GL_EXT_convolution = 1
// export const GL_EXT_copy_texture = 1
// export const GL_EXT_histogram = 1
// export const GL_EXT_packed_pixels = 1
// export const GL_EXT_point_parameters = 1
// export const GL_EXT_polygon_offset = 1
// export const GL_EXT_rescale_normal = 1
// export const GL_EXT_shared_texture_palette = 1
// export const GL_EXT_subtexture = 1
// export const GL_EXT_texture = 1
// export const GL_EXT_texture3D = 1
// export const GL_EXT_texture_object = 1
// export const GL_EXT_vertex_array = 1
// export const GL_EYE_DISTANCE_TO_LINE_SGIS = 0x81F2
// export const GL_EYE_DISTANCE_TO_POINT_SGIS = 0x81F0
// export const GL_EYE_LINEAR = 0x2400
// export const GL_EYE_LINE_SGIS = 0x81F6
// export const GL_EYE_PLANE = 0x2502
// export const GL_EYE_PLANE_ABSOLUTE_NV = 0x855C
// export const GL_EYE_POINT_SGIS = 0x81F4
// export const GL_EYE_RADIAL_NV = 0x855B
// export const GL_E_TIMES_F_NV = 0x8531
// export const GL_FASTEST = 0x1101
// export const GL_FEEDBACK = 0x1C01
// export const GL_FEEDBACK_BUFFER_POINTER = 0x0DF0
// export const GL_FEEDBACK_BUFFER_SIZE = 0x0DF1
// export const GL_FEEDBACK_BUFFER_TYPE = 0x0DF2
// export const GL_FENCE_APPLE = 0x8A0B
// export const GL_FENCE_CONDITION_NV = 0x84F4
// export const GL_FENCE_STATUS_NV = 0x84F3
// export const GL_FIELDS_NV = 0x8E27
// export const GL_FILL = 0x1B02
// export const GL_FILTER4_SGIS = 0x8146
// export const GL_FIXED_ONLY = 0x891D
// export const GL_FIXED_ONLY_ARB = 0x891D
// export const GL_FLAT = 0x1D00
// export const GL_FLOAT = 0x1406
// export const GL_FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD
// export const GL_FLOAT_32_UNSIGNED_INT_24_8_REV_NV = 0x8DAD
// export const GL_FLOAT_CLEAR_COLOR_VALUE_NV = 0x888D
// export const GL_FLOAT_MAT2 = 0x8B5A
// export const GL_FLOAT_MAT2_ARB = 0x8B5A
// export const GL_FLOAT_MAT2x3 = 0x8B65
// export const GL_FLOAT_MAT2x4 = 0x8B66
// export const GL_FLOAT_MAT3 = 0x8B5B
// export const GL_FLOAT_MAT3_ARB = 0x8B5B
// export const GL_FLOAT_MAT3x2 = 0x8B67
// export const GL_FLOAT_MAT3x4 = 0x8B68
// export const GL_FLOAT_MAT4 = 0x8B5C
// export const GL_FLOAT_MAT4_ARB = 0x8B5C
// export const GL_FLOAT_MAT4x2 = 0x8B69
// export const GL_FLOAT_MAT4x3 = 0x8B6A
// export const GL_FLOAT_R16_NV = 0x8884
// export const GL_FLOAT_R32_NV = 0x8885
// export const GL_FLOAT_RG16_NV = 0x8886
// export const GL_FLOAT_RG32_NV = 0x8887
// export const GL_FLOAT_RGB16_NV = 0x8888
// export const GL_FLOAT_RGB32_NV = 0x8889
// export const GL_FLOAT_RGBA16_NV = 0x888A
// export const GL_FLOAT_RGBA32_NV = 0x888B
// export const GL_FLOAT_RGBA_MODE_NV = 0x888E
// export const GL_FLOAT_RGBA_NV = 0x8883
// export const GL_FLOAT_RGB_NV = 0x8882
// export const GL_FLOAT_RG_NV = 0x8881
// export const GL_FLOAT_R_NV = 0x8880
// export const GL_FLOAT_VEC2 = 0x8B50
// export const GL_FLOAT_VEC2_ARB = 0x8B50
// export const GL_FLOAT_VEC3 = 0x8B51
// export const GL_FLOAT_VEC3_ARB = 0x8B51
// export const GL_FLOAT_VEC4 = 0x8B52
// export const GL_FLOAT_VEC4_ARB = 0x8B52
// export const GL_FOG = 0x0B60
// export const GL_FOG_BIT = 0x00000080
// export const GL_FOG_COLOR = 0x0B66
// export const GL_FOG_COORDINATE = 0x8451
// export const GL_FOG_COORD = GL_FOG_COORDINATE
// export const GL_FOG_COORDINATE_ARRAY = 0x8457
// export const GL_FOG_COORDINATE_ARRAY_BUFFER_BINDING = 0x889D
// export const GL_FOG_COORDINATE_ARRAY_BUFFER_BINDING_ARB = 0x889D
// export const GL_FOG_COORDINATE_ARRAY_EXT = 0x8457
// export const GL_FOG_COORDINATE_ARRAY_LIST_IBM = 103076
// export const GL_FOG_COORDINATE_ARRAY_LIST_STRIDE_IBM = 103086
// export const GL_FOG_COORDINATE_ARRAY_POINTER = 0x8456
// export const GL_FOG_COORDINATE_ARRAY_POINTER_EXT = 0x8456
// export const GL_FOG_COORDINATE_ARRAY_STRIDE = 0x8455
// export const GL_FOG_COORDINATE_ARRAY_STRIDE_EXT = 0x8455
// export const GL_FOG_COORDINATE_ARRAY_TYPE = 0x8454
// export const GL_FOG_COORDINATE_ARRAY_TYPE_EXT = 0x8454
// export const GL_FOG_COORDINATE_EXT = 0x8451
// export const GL_FOG_COORDINATE_SOURCE = 0x8450
// export const GL_FOG_COORDINATE_SOURCE_EXT = 0x8450
// export const GL_FOG_COORD_ARRAY = GL_FOG_COORDINATE_ARRAY
// export const GL_FOG_COORD_ARRAY_BUFFER_BINDING = GL_FOG_COORDINATE_ARRAY_BUFFER_BINDING
// export const GL_FOG_COORD_ARRAY_POINTER = GL_FOG_COORDINATE_ARRAY_POINTER
// export const GL_FOG_COORD_ARRAY_STRIDE = GL_FOG_COORDINATE_ARRAY_STRIDE
// export const GL_FOG_COORD_ARRAY_TYPE = GL_FOG_COORDINATE_ARRAY_TYPE
// export const GL_FOG_COORD_SRC = GL_FOG_COORDINATE_SOURCE
// export const GL_FOG_DENSITY = 0x0B62
// export const GL_FOG_DISTANCE_MODE_NV = 0x855A
// export const GL_FOG_END = 0x0B64
// export const GL_FOG_FACTOR_TO_ALPHA_SGIX = 0x836F
// export const GL_FOG_FUNC_POINTS_SGIS = 0x812B
// export const GL_FOG_FUNC_SGIS = 0x812A
// export const GL_FOG_HINT = 0x0C54
// export const GL_FOG_INDEX = 0x0B61
// export const GL_FOG_MODE = 0x0B65
// export const GL_FOG_OFFSET_SGIX = 0x8198
// export const GL_FOG_OFFSET_VALUE_SGIX = 0x8199
// export const GL_FOG_SCALE_SGIX = 0x81FC
// export const GL_FOG_SCALE_VALUE_SGIX = 0x81FD
// export const GL_FOG_SPECULAR_TEXTURE_WIN = 0x80EC
// export const GL_FOG_START = 0x0B63
// export const GL_FORCE_BLUE_TO_ONE_NV = 0x8860
// export const GL_FORMAT_SUBSAMPLE_244_244_OML = 0x8983
// export const GL_FORMAT_SUBSAMPLE_24_24_OML = 0x8982
// export const GL_FRAGMENT_COLOR_EXT = 0x834C
// export const GL_FRAGMENT_COLOR_MATERIAL_FACE_SGIX = 0x8402
// export const GL_FRAGMENT_COLOR_MATERIAL_PARAMETER_SGIX = 0x8403
// export const GL_FRAGMENT_COLOR_MATERIAL_SGIX = 0x8401
// export const GL_FRAGMENT_DEPTH = 0x8452
// export const GL_FRAGMENT_DEPTH_EXT = 0x8452
// export const GL_FRAGMENT_LIGHT0_SGIX = 0x840C
// export const GL_FRAGMENT_LIGHT1_SGIX = 0x840D
// export const GL_FRAGMENT_LIGHT2_SGIX = 0x840E
// export const GL_FRAGMENT_LIGHT3_SGIX = 0x840F
// export const GL_FRAGMENT_LIGHT4_SGIX = 0x8410
// export const GL_FRAGMENT_LIGHT5_SGIX = 0x8411
// export const GL_FRAGMENT_LIGHT6_SGIX = 0x8412
// export const GL_FRAGMENT_LIGHT7_SGIX = 0x8413
// export const GL_FRAGMENT_LIGHTING_SGIX = 0x8400
// export const GL_FRAGMENT_LIGHT_MODEL_AMBIENT_SGIX = 0x840A
// export const GL_FRAGMENT_LIGHT_MODEL_LOCAL_VIEWER_SGIX = 0x8408
// export const GL_FRAGMENT_LIGHT_MODEL_NORMAL_INTERPOLATION_SGIX = 0x840B
// export const GL_FRAGMENT_LIGHT_MODEL_TWO_SIDE_SGIX = 0x8409
// export const GL_FRAGMENT_MATERIAL_EXT = 0x8349
// export const GL_FRAGMENT_NORMAL_EXT = 0x834A
// export const GL_FRAGMENT_PROGRAM_ARB = 0x8804
// export const GL_FRAGMENT_PROGRAM_BINDING_NV = 0x8873
// export const GL_FRAGMENT_PROGRAM_NV = 0x8870
// export const GL_FRAGMENT_PROGRAM_PARAMETER_BUFFER_NV = 0x8DA4
// export const GL_FRAGMENT_SHADER = 0x8B30
// export const GL_FRAGMENT_SHADER_ARB = 0x8B30
// export const GL_FRAGMENT_SHADER_ATI = 0x8920
// export const GL_FRAGMENT_SHADER_DERIVATIVE_HINT = 0x8B8B
// export const GL_FRAGMENT_SHADER_DERIVATIVE_HINT_ARB = 0x8B8B
// export const GL_FRAMEBUFFER = 0x8D40
// export const GL_FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 0x8215
// export const GL_FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 0x8214
// export const GL_FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 0x8210
// export const GL_FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 0x8211
// export const GL_FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 0x8216
// export const GL_FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 0x8213
// export const GL_FRAMEBUFFER_ATTACHMENT_LAYERED_ARB = 0x8DA7
// export const GL_FRAMEBUFFER_ATTACHMENT_LAYERED_EXT = 0x8DA7
// export const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1
// export const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME_EXT = 0x8CD1
// export const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0
// export const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE_EXT = 0x8CD0
// export const GL_FRAMEBUFFER_ATTACHMENT_RED_SIZE = 0x8212
// export const GL_FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 0x8217
// export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_3D_ZOFFSET_EXT = 0x8CD4
// export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3
// export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE_EXT = 0x8CD3
// export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 0x8CD4
// export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER_EXT = 0x8CD4
// export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2
// export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL_EXT = 0x8CD2
// export const GL_FRAMEBUFFER_BINDING = 0x8CA6
// export const GL_FRAMEBUFFER_BINDING_EXT = 0x8CA6
// export const GL_DRAW_FRAMEBUFFER_BINDING = GL_FRAMEBUFFER_BINDING
// export const GL_DRAW_FRAMEBUFFER_BINDING_EXT = GL_FRAMEBUFFER_BINDING_EXT
// export const GL_FRAMEBUFFER_COMPLETE = 0x8CD5
// export const GL_FRAMEBUFFER_COMPLETE_EXT = 0x8CD5
// export const GL_FRAMEBUFFER_DEFAULT = 0x8218
// export const GL_FRAMEBUFFER_EXT = 0x8D40
// export const GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6
// export const GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT_EXT = 0x8CD6
// export const GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS_EXT = 0x8CD9
// export const GL_FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER = 0x8CDB
// export const GL_FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER_EXT = 0x8CDB
// export const GL_FRAMEBUFFER_INCOMPLETE_FORMATS_EXT = 0x8CDA
// export const GL_FRAMEBUFFER_INCOMPLETE_LAYER_COUNT_ARB = 0x8DA9
// export const GL_FRAMEBUFFER_INCOMPLETE_LAYER_COUNT_EXT = 0x8DA9
// export const GL_FRAMEBUFFER_INCOMPLETE_LAYER_TARGETS_ARB = 0x8DA8
// export const GL_FRAMEBUFFER_INCOMPLETE_LAYER_TARGETS_EXT = 0x8DA8
// export const GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7
// export const GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT_EXT = 0x8CD7
// export const GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 0x8D56
// export const GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE_EXT = 0x8D56
// export const GL_FRAMEBUFFER_INCOMPLETE_READ_BUFFER = 0x8CDC
// export const GL_FRAMEBUFFER_INCOMPLETE_READ_BUFFER_EXT = 0x8CDC
// export const GL_FRAMEBUFFER_SRGB = 0x8DB9
// export const GL_FRAMEBUFFER_SRGB_CAPABLE_EXT = 0x8DBA
// export const GL_FRAMEBUFFER_SRGB_EXT = 0x8DB9
// export const GL_FRAMEBUFFER_UNDEFINED = 0x8219
// export const GL_FRAMEBUFFER_UNSUPPORTED = 0x8CDD
// export const GL_FRAMEBUFFER_UNSUPPORTED_EXT = 0x8CDD
// export const GL_FRAMEZOOM_FACTOR_SGIX = 0x818C
// export const GL_FRAMEZOOM_SGIX = 0x818B
// export const GL_FRAME_NV = 0x8E26
// export const GL_FRONT = 0x0404
// export const GL_FRONT_AND_BACK = 0x0408
// export const GL_FRONT_FACE = 0x0B46
// export const GL_FRONT_LEFT = 0x0400
// export const GL_FRONT_RIGHT = 0x0401
// export const GL_FULL_RANGE_EXT = 0x87E1
// export const GL_FULL_STIPPLE_HINT_PGI = 0x1A219
// export const GL_FUNC_ADD = 0x8006
// export const GL_FUNC_ADD_EXT = 0x8006
// export const GL_FUNC_REVERSE_SUBTRACT = 0x800B
// export const GL_FUNC_REVERSE_SUBTRACT_EXT = 0x800B
// export const GL_FUNC_SUBTRACT = 0x800A
// export const GL_FUNC_SUBTRACT_EXT = 0x800A
// export const GL_GENERATE_MIPMAP = 0x8191
// export const GL_GENERATE_MIPMAP_HINT = 0x8192
// export const GL_GENERATE_MIPMAP_HINT_SGIS = 0x8192
// export const GL_GENERATE_MIPMAP_SGIS = 0x8191
// export const GL_GENERIC_ATTRIB_NV = 0x8C7D
// export const GL_GEOMETRY_DEFORMATION_BIT_SGIX = 0x00000002
// export const GL_GEOMETRY_DEFORMATION_SGIX = 0x8194
// export const GL_GEOMETRY_INPUT_TYPE_ARB = 0x8DDB
// export const GL_GEOMETRY_INPUT_TYPE_EXT = 0x8DDB
// export const GL_GEOMETRY_OUTPUT_TYPE_ARB = 0x8DDC
// export const GL_GEOMETRY_OUTPUT_TYPE_EXT = 0x8DDC
// export const GL_GEOMETRY_PROGRAM_NV = 0x8C26
// export const GL_GEOMETRY_PROGRAM_PARAMETER_BUFFER_NV = 0x8DA3
// export const GL_GEOMETRY_SHADER_ARB = 0x8DD9
// export const GL_GEOMETRY_SHADER_EXT = 0x8DD9
// export const GL_GEOMETRY_VERTICES_OUT_ARB = 0x8DDA
// export const GL_GEOMETRY_VERTICES_OUT_EXT = 0x8DDA
// export const GL_GEQUAL = 0x0206
// export const GL_GLOBAL_ALPHA_FACTOR_SUN = 0x81DA
// export const GL_GLOBAL_ALPHA_SUN = 0x81D9
// export const GL_GREATER = 0x0204
// export const GL_GREEN = 0x1904
// export const GL_GREEN_BIAS = 0x0D19
// export const GL_GREEN_BITS = 0x0D53
// export const GL_GREEN_BIT_ATI = 0x00000002
// export const GL_GREEN_INTEGER = 0x8D95
// export const GL_GREEN_INTEGER_EXT = 0x8D95
// export const GL_GREEN_MAX_CLAMP_INGR = 0x8565
// export const GL_GREEN_MIN_CLAMP_INGR = 0x8561
// export const GL_GREEN_SCALE = 0x0D18
// export const GL_HALF_BIAS_NEGATE_NV = 0x853B
// export const GL_HALF_BIAS_NORMAL_NV = 0x853A
// export const GL_HALF_BIT_ATI = 0x00000008
// export const GL_HALF_FLOAT = 0x140B
// export const GL_HALF_FLOAT_ARB = 0x140B
// export const GL_HALF_FLOAT_NV = 0x140B
// export const GL_HILO16_NV = 0x86F8
// export const GL_HILO8_NV = 0x885E
// export const GL_HILO_NV = 0x86F4
// export const GL_HINT_BIT = 0x00008000
// export const GL_HISTOGRAM = 0x8024
// export const GL_HISTOGRAM_ALPHA_SIZE = 0x802B
// export const GL_HISTOGRAM_ALPHA_SIZE_EXT = 0x802B
// export const GL_HISTOGRAM_BLUE_SIZE = 0x802A
// export const GL_HISTOGRAM_BLUE_SIZE_EXT = 0x802A
// export const GL_HISTOGRAM_EXT = 0x8024
// export const GL_HISTOGRAM_FORMAT = 0x8027
// export const GL_HISTOGRAM_FORMAT_EXT = 0x8027
// export const GL_HISTOGRAM_GREEN_SIZE = 0x8029
// export const GL_HISTOGRAM_GREEN_SIZE_EXT = 0x8029
// export const GL_HISTOGRAM_LUMINANCE_SIZE = 0x802C
// export const GL_HISTOGRAM_LUMINANCE_SIZE_EXT = 0x802C
// export const GL_HISTOGRAM_RED_SIZE = 0x8028
// export const GL_HISTOGRAM_RED_SIZE_EXT = 0x8028
// export const GL_HISTOGRAM_SINK = 0x802D
// export const GL_HISTOGRAM_SINK_EXT = 0x802D
// export const GL_HISTOGRAM_WIDTH = 0x8026
// export const GL_HISTOGRAM_WIDTH_EXT = 0x8026
// export const GL_HI_BIAS_NV = 0x8714
// export const GL_HI_SCALE_NV = 0x870E
// export const GL_IDENTITY_NV = 0x862A
// export const GL_IGNORE_BORDER_HP = 0x8150
// export const GL_IMAGE_CUBIC_WEIGHT_HP = 0x815E
// export const GL_IMAGE_MAG_FILTER_HP = 0x815C
// export const GL_IMAGE_MIN_FILTER_HP = 0x815D
// export const GL_IMAGE_ROTATE_ANGLE_HP = 0x8159
// export const GL_IMAGE_ROTATE_ORIGIN_X_HP = 0x815A
// export const GL_IMAGE_ROTATE_ORIGIN_Y_HP = 0x815B
// export const GL_IMAGE_SCALE_X_HP = 0x8155
// export const GL_IMAGE_SCALE_Y_HP = 0x8156
// export const GL_IMAGE_TRANSFORM_2D_HP = 0x8161
// export const GL_IMAGE_TRANSLATE_X_HP = 0x8157
// export const GL_IMAGE_TRANSLATE_Y_HP = 0x8158
// export const GL_IMPLEMENTATION_COLOR_READ_FORMAT_OES = 0x8B9B
// export const GL_IMPLEMENTATION_COLOR_READ_TYPE_OES = 0x8B9A
// export const GL_INCR = 0x1E02
// export const GL_INCR_WRAP = 0x8507
// export const GL_INCR_WRAP_EXT = 0x8507
// export const GL_INDEX = 0x8222
// export const GL_INDEX_ARRAY = 0x8077
// export const GL_INDEX_ARRAY_BUFFER_BINDING = 0x8899
// export const GL_INDEX_ARRAY_BUFFER_BINDING_ARB = 0x8899
// export const GL_INDEX_ARRAY_COUNT_EXT = 0x8087
// export const GL_INDEX_ARRAY_EXT = 0x8077
// export const GL_INDEX_ARRAY_LIST_IBM = 103073
// export const GL_INDEX_ARRAY_LIST_STRIDE_IBM = 103083
// export const GL_INDEX_ARRAY_POINTER = 0x8091
// export const GL_INDEX_ARRAY_POINTER_EXT = 0x8091
// export const GL_INDEX_ARRAY_STRIDE = 0x8086
// export const GL_INDEX_ARRAY_STRIDE_EXT = 0x8086
// export const GL_INDEX_ARRAY_TYPE = 0x8085
// export const GL_INDEX_ARRAY_TYPE_EXT = 0x8085
// export const GL_INDEX_BITS = 0x0D51
// export const GL_INDEX_BIT_PGI = 0x00080000
// export const GL_INDEX_CLEAR_VALUE = 0x0C20
// export const GL_INDEX_LOGIC_OP = 0x0BF1
// export const GL_INDEX_MATERIAL_EXT = 0x81B8
// export const GL_INDEX_MATERIAL_FACE_EXT = 0x81BA
// export const GL_INDEX_MATERIAL_PARAMETER_EXT = 0x81B9
// export const GL_INDEX_MODE = 0x0C30
// export const GL_INDEX_OFFSET = 0x0D13
// export const GL_INDEX_SHIFT = 0x0D12
// export const GL_INDEX_TEST_EXT = 0x81B5
// export const GL_INDEX_TEST_FUNC_EXT = 0x81B6
// export const GL_INDEX_TEST_REF_EXT = 0x81B7
// export const GL_INDEX_WRITEMASK = 0x0C21
// export const GL_INFO_LOG_LENGTH = 0x8B84
// export const GL_INSTRUMENT_BUFFER_POINTER_SGIX = 0x8180
// export const GL_INSTRUMENT_MEASUREMENTS_SGIX = 0x8181
// export const GL_INT = 0x1404
// export const GL_INTENSITY = 0x8049
// export const GL_INTENSITY12 = 0x804C
// export const GL_INTENSITY12_EXT = 0x804C
// export const GL_INTENSITY16 = 0x804D
// export const GL_INTENSITY16F_ARB = 0x881D
// export const GL_INTENSITY16I_EXT = 0x8D8B
// export const GL_INTENSITY16UI_EXT = 0x8D79
// export const GL_INTENSITY16_EXT = 0x804D
// export const GL_INTENSITY32F_ARB = 0x8817
// export const GL_INTENSITY32I_EXT = 0x8D85
// export const GL_INTENSITY32UI_EXT = 0x8D73
// export const GL_INTENSITY4 = 0x804A
// export const GL_INTENSITY4_EXT = 0x804A
// export const GL_INTENSITY8 = 0x804B
// export const GL_INTENSITY8I_EXT = 0x8D91
// export const GL_INTENSITY8UI_EXT = 0x8D7F
// export const GL_INTENSITY8_EXT = 0x804B
// export const GL_INTENSITY_EXT = 0x8049
// export const GL_INTENSITY_FLOAT16_ATI = 0x881D
// export const GL_INTENSITY_FLOAT32_ATI = 0x8817
// export const GL_INTERLACE_OML = 0x8980
// export const GL_INTERLACE_READ_INGR = 0x8568
// export const GL_INTERLACE_READ_OML = 0x8981
// export const GL_INTERLACE_SGIX = 0x8094
// export const GL_INTERLEAVED_ATTRIBS = 0x8C8C
// export const GL_INTERLEAVED_ATTRIBS_EXT = 0x8C8C
// export const GL_INTERLEAVED_ATTRIBS_NV = 0x8C8C
// export const GL_INTERPOLATE = 0x8575
// export const GL_INTERPOLATE_ARB = 0x8575
// export const GL_INTERPOLATE_EXT = 0x8575
// export const GL_INT_SAMPLER_1D = 0x8DC9
// export const GL_INT_SAMPLER_1D_ARRAY = 0x8DCE
// export const GL_INT_SAMPLER_1D_ARRAY_EXT = 0x8DCE
// export const GL_INT_SAMPLER_1D_EXT = 0x8DC9
// export const GL_INT_SAMPLER_2D = 0x8DCA
// export const GL_INT_SAMPLER_2D_ARRAY = 0x8DCF
// export const GL_INT_SAMPLER_2D_ARRAY_EXT = 0x8DCF
// export const GL_INT_SAMPLER_2D_EXT = 0x8DCA
// export const GL_INT_SAMPLER_2D_RECT_EXT = 0x8DCD
// export const GL_INT_SAMPLER_3D = 0x8DCB
// export const GL_INT_SAMPLER_3D_EXT = 0x8DCB
// export const GL_INT_SAMPLER_BUFFER_EXT = 0x8DD0
// export const GL_INT_SAMPLER_CUBE = 0x8DCC
// export const GL_INT_SAMPLER_CUBE_EXT = 0x8DCC
// export const GL_INT_SAMPLER_RENDERBUFFER_NV = 0x8E57
// export const GL_INT_VEC2 = 0x8B53
// export const GL_INT_VEC2_ARB = 0x8B53
// export const GL_INT_VEC3 = 0x8B54
// export const GL_INT_VEC3_ARB = 0x8B54
// export const GL_INT_VEC4 = 0x8B55
// export const GL_INT_VEC4_ARB = 0x8B55
// export const GL_INVALID_ENUM = 0x0500
// export const GL_INVALID_FRAMEBUFFER_OPERATION = 0x0506
// export const GL_INVALID_FRAMEBUFFER_OPERATION_EXT = 0x0506
// export const GL_INVALID_OPERATION = 0x0502
// export const GL_INVALID_VALUE = 0x0501
// export const GL_INVARIANT_DATATYPE_EXT = 0x87EB
// export const GL_INVARIANT_EXT = 0x87C2
// export const GL_INVARIANT_VALUE_EXT = 0x87EA
// export const GL_INVERSE_NV = 0x862B
// export const GL_INVERSE_TRANSPOSE_NV = 0x862D
// export const GL_INVERT = 0x150A
// export const GL_INVERTED_SCREEN_W_REND = 0x8491
// export const GL_IR_INSTRUMENT1_SGIX = 0x817F
// export const GL_IUI_N3F_V2F_EXT = 0x81AF
// export const GL_IUI_N3F_V3F_EXT = 0x81B0
// export const GL_IUI_V2F_EXT = 0x81AD
// export const GL_IUI_V3F_EXT = 0x81AE
// export const GL_KEEP = 0x1E00
// export const GL_LEFT = 0x0406
// export const GL_LEQUAL = 0x0203
// export const GL_LERP_ATI = 0x8969
// export const GL_LESS = 0x0201
// export const GL_LIGHT0 = 0x4000
// export const GL_LIGHT1 = 0x4001
// export const GL_LIGHT2 = 0x4002
// export const GL_LIGHT3 = 0x4003
// export const GL_LIGHT4 = 0x4004
// export const GL_LIGHT5 = 0x4005
// export const GL_LIGHT6 = 0x4006
// export const GL_LIGHT7 = 0x4007
// export const GL_LIGHTING = 0x0B50
// export const GL_LIGHTING_BIT = 0x00000040
// export const GL_LIGHT_ENV_MODE_SGIX = 0x8407
// export const GL_LIGHT_MODEL_AMBIENT = 0x0B53
// export const GL_LIGHT_MODEL_COLOR_CONTROL = 0x81F8
// export const GL_LIGHT_MODEL_COLOR_CONTROL_EXT = 0x81F8
// export const GL_LIGHT_MODEL_LOCAL_VIEWER = 0x0B51
// export const GL_LIGHT_MODEL_SPECULAR_VECTOR_APPLE = 0x85B0
// export const GL_LIGHT_MODEL_TWO_SIDE = 0x0B52
// export const GL_LINE = 0x1B01
// export const GL_LINEAR = 0x2601
// export const GL_LINEAR_ATTENUATION = 0x1208
// export const GL_LINEAR_CLIPMAP_LINEAR_SGIX = 0x8170
// export const GL_LINEAR_CLIPMAP_NEAREST_SGIX = 0x844F
// export const GL_LINEAR_DETAIL_ALPHA_SGIS = 0x8098
// export const GL_LINEAR_DETAIL_COLOR_SGIS = 0x8099
// export const GL_LINEAR_DETAIL_SGIS = 0x8097
// export const GL_LINEAR_MIPMAP_LINEAR = 0x2703
// export const GL_LINEAR_MIPMAP_NEAREST = 0x2701
// export const GL_LINEAR_SHARPEN_ALPHA_SGIS = 0x80AE
// export const GL_LINEAR_SHARPEN_COLOR_SGIS = 0x80AF
// export const GL_LINEAR_SHARPEN_SGIS = 0x80AD
// export const GL_LINES = 0x0001
// export const GL_LINES_ADJACENCY_ARB = 0x000A
// export const GL_LINES_ADJACENCY_EXT = 0x000A
// export const GL_LINE_BIT = 0x00000004
// export const GL_LINE_LOOP = 0x0002
// export const GL_LINE_RESET_TOKEN = 0x0707
// export const GL_LINE_SMOOTH = 0x0B20
// export const GL_LINE_SMOOTH_HINT = 0x0C52
// export const GL_LINE_STIPPLE = 0x0B24
// export const GL_LINE_STIPPLE_PATTERN = 0x0B25
// export const GL_LINE_STIPPLE_REPEAT = 0x0B26
// export const GL_LINE_STRIP = 0x0003
// export const GL_LINE_STRIP_ADJACENCY_ARB = 0x000B
// export const GL_LINE_STRIP_ADJACENCY_EXT = 0x000B
// export const GL_LINE_TOKEN = 0x0702
// export const GL_LINE_WIDTH = 0x0B21
// export const GL_LINE_WIDTH_GRANULARITY = 0x0B23
// export const GL_LINE_WIDTH_RANGE = 0x0B22
// export const GL_LINK_STATUS = 0x8B82
// export const GL_LIST_BASE = 0x0B32
// export const GL_LIST_BIT = 0x00020000
// export const GL_LIST_INDEX = 0x0B33
// export const GL_LIST_MODE = 0x0B30
// export const GL_LIST_PRIORITY_SGIX = 0x8182
// export const GL_LOAD = 0x0101
// export const GL_LOCAL_CONSTANT_DATATYPE_EXT = 0x87ED
// export const GL_LOCAL_CONSTANT_EXT = 0x87C3
// export const GL_LOCAL_CONSTANT_VALUE_EXT = 0x87EC
// export const GL_LOCAL_EXT = 0x87C4
// export const GL_LOGIC_OP = 0x0BF1
// export const GL_LOGIC_OP_MODE = 0x0BF0
// export const GL_LOWER_LEFT = 0x8CA1
// export const GL_LO_BIAS_NV = 0x8715
// export const GL_LO_SCALE_NV = 0x870F
// export const GL_LUMINANCE = 0x1909
// export const GL_LUMINANCE12 = 0x8041
// export const GL_LUMINANCE12_ALPHA12 = 0x8047
// export const GL_LUMINANCE12_ALPHA12_EXT = 0x8047
// export const GL_LUMINANCE12_ALPHA4 = 0x8046
// export const GL_LUMINANCE12_ALPHA4_EXT = 0x8046
// export const GL_LUMINANCE12_EXT = 0x8041
// export const GL_LUMINANCE16 = 0x8042
// export const GL_LUMINANCE16F_ARB = 0x881E
// export const GL_LUMINANCE16I_EXT = 0x8D8C
// export const GL_LUMINANCE16UI_EXT = 0x8D7A
// export const GL_LUMINANCE16_ALPHA16 = 0x8048
// export const GL_LUMINANCE16_ALPHA16_EXT = 0x8048
// export const GL_LUMINANCE16_EXT = 0x8042
// export const GL_LUMINANCE32F_ARB = 0x8818
// export const GL_LUMINANCE32I_EXT = 0x8D86
// export const GL_LUMINANCE32UI_EXT = 0x8D74
// export const GL_LUMINANCE4 = 0x803F
// export const GL_LUMINANCE4_ALPHA4 = 0x8043
// export const GL_LUMINANCE4_ALPHA4_EXT = 0x8043
// export const GL_LUMINANCE4_EXT = 0x803F
// export const GL_LUMINANCE6_ALPHA2 = 0x8044
// export const GL_LUMINANCE6_ALPHA2_EXT = 0x8044
// export const GL_LUMINANCE8 = 0x8040
// export const GL_LUMINANCE8I_EXT = 0x8D92
// export const GL_LUMINANCE8UI_EXT = 0x8D80
// export const GL_LUMINANCE8_ALPHA8 = 0x8045
// export const GL_LUMINANCE8_ALPHA8_EXT = 0x8045
// export const GL_LUMINANCE8_EXT = 0x8040
// export const GL_LUMINANCE_ALPHA = 0x190A
// export const GL_LUMINANCE_ALPHA16F_ARB = 0x881F
// export const GL_LUMINANCE_ALPHA16I_EXT = 0x8D8D
// export const GL_LUMINANCE_ALPHA16UI_EXT = 0x8D7B
// export const GL_LUMINANCE_ALPHA32F_ARB = 0x8819
// export const GL_LUMINANCE_ALPHA32I_EXT = 0x8D87
// export const GL_LUMINANCE_ALPHA32UI_EXT = 0x8D75
// export const GL_LUMINANCE_ALPHA8I_EXT = 0x8D93
// export const GL_LUMINANCE_ALPHA8UI_EXT = 0x8D81
// export const GL_LUMINANCE_ALPHA_FLOAT16_ATI = 0x881F
// export const GL_LUMINANCE_ALPHA_FLOAT32_ATI = 0x8819
// export const GL_LUMINANCE_ALPHA_INTEGER_EXT = 0x8D9D
// export const GL_LUMINANCE_FLOAT16_ATI = 0x881E
// export const GL_LUMINANCE_FLOAT32_ATI = 0x8818
// export const GL_LUMINANCE_INTEGER_EXT = 0x8D9C
// export const GL_MAD_ATI = 0x8968
// export const GL_MAGNITUDE_BIAS_NV = 0x8718
// export const GL_MAGNITUDE_SCALE_NV = 0x8712
// export const GL_MAJOR_VERSION = 0x821B
// export const GL_MAP1_BINORMAL_EXT = 0x8446
// export const GL_MAP1_COLOR_4 = 0x0D90
// export const GL_MAP1_GRID_DOMAIN = 0x0DD0
// export const GL_MAP1_GRID_SEGMENTS = 0x0DD1
// export const GL_MAP1_INDEX = 0x0D91
// export const GL_MAP1_NORMAL = 0x0D92
// export const GL_MAP1_TANGENT_EXT = 0x8444
// export const GL_MAP1_TEXTURE_COORD_1 = 0x0D93
// export const GL_MAP1_TEXTURE_COORD_2 = 0x0D94
// export const GL_MAP1_TEXTURE_COORD_3 = 0x0D95
// export const GL_MAP1_TEXTURE_COORD_4 = 0x0D96
// export const GL_MAP1_VERTEX_3 = 0x0D97
// export const GL_MAP1_VERTEX_4 = 0x0D98
// export const GL_MAP1_VERTEX_ATTRIB0_4_NV = 0x8660
// export const GL_MAP1_VERTEX_ATTRIB10_4_NV = 0x866A
// export const GL_MAP1_VERTEX_ATTRIB11_4_NV = 0x866B
// export const GL_MAP1_VERTEX_ATTRIB12_4_NV = 0x866C
// export const GL_MAP1_VERTEX_ATTRIB13_4_NV = 0x866D
// export const GL_MAP1_VERTEX_ATTRIB14_4_NV = 0x866E
// export const GL_MAP1_VERTEX_ATTRIB15_4_NV = 0x866F
// export const GL_MAP1_VERTEX_ATTRIB1_4_NV = 0x8661
// export const GL_MAP1_VERTEX_ATTRIB2_4_NV = 0x8662
// export const GL_MAP1_VERTEX_ATTRIB3_4_NV = 0x8663
// export const GL_MAP1_VERTEX_ATTRIB4_4_NV = 0x8664
// export const GL_MAP1_VERTEX_ATTRIB5_4_NV = 0x8665
// export const GL_MAP1_VERTEX_ATTRIB6_4_NV = 0x8666
// export const GL_MAP1_VERTEX_ATTRIB7_4_NV = 0x8667
// export const GL_MAP1_VERTEX_ATTRIB8_4_NV = 0x8668
// export const GL_MAP1_VERTEX_ATTRIB9_4_NV = 0x8669
// export const GL_MAP2_BINORMAL_EXT = 0x8447
// export const GL_MAP2_COLOR_4 = 0x0DB0
// export const GL_MAP2_GRID_DOMAIN = 0x0DD2
// export const GL_MAP2_GRID_SEGMENTS = 0x0DD3
// export const GL_MAP2_INDEX = 0x0DB1
// export const GL_MAP2_NORMAL = 0x0DB2
// export const GL_MAP2_TANGENT_EXT = 0x8445
// export const GL_MAP2_TEXTURE_COORD_1 = 0x0DB3
// export const GL_MAP2_TEXTURE_COORD_2 = 0x0DB4
// export const GL_MAP2_TEXTURE_COORD_3 = 0x0DB5
// export const GL_MAP2_TEXTURE_COORD_4 = 0x0DB6
// export const GL_MAP2_VERTEX_3 = 0x0DB7
// export const GL_MAP2_VERTEX_4 = 0x0DB8
// export const GL_MAP2_VERTEX_ATTRIB0_4_NV = 0x8670
// export const GL_MAP2_VERTEX_ATTRIB10_4_NV = 0x867A
// export const GL_MAP2_VERTEX_ATTRIB11_4_NV = 0x867B
// export const GL_MAP2_VERTEX_ATTRIB12_4_NV = 0x867C
// export const GL_MAP2_VERTEX_ATTRIB13_4_NV = 0x867D
// export const GL_MAP2_VERTEX_ATTRIB14_4_NV = 0x867E
// export const GL_MAP2_VERTEX_ATTRIB15_4_NV = 0x867F
// export const GL_MAP2_VERTEX_ATTRIB1_4_NV = 0x8671
// export const GL_MAP2_VERTEX_ATTRIB2_4_NV = 0x8672
// export const GL_MAP2_VERTEX_ATTRIB3_4_NV = 0x8673
// export const GL_MAP2_VERTEX_ATTRIB4_4_NV = 0x8674
// export const GL_MAP2_VERTEX_ATTRIB5_4_NV = 0x8675
// export const GL_MAP2_VERTEX_ATTRIB6_4_NV = 0x8676
// export const GL_MAP2_VERTEX_ATTRIB7_4_NV = 0x8677
// export const GL_MAP2_VERTEX_ATTRIB8_4_NV = 0x8678
// export const GL_MAP2_VERTEX_ATTRIB9_4_NV = 0x8679
// export const GL_MAP_ATTRIB_U_ORDER_NV = 0x86C3
// export const GL_MAP_ATTRIB_V_ORDER_NV = 0x86C4
// export const GL_MAP_COLOR = 0x0D10
// export const GL_MAP_FLUSH_EXPLICIT_BIT = 0x0010
// export const GL_MAP_INVALIDATE_BUFFER_BIT = 0x0008
// export const GL_MAP_INVALIDATE_RANGE_BIT = 0x0004
// export const GL_MAP_READ_BIT = 0x0001
// export const GL_MAP_STENCIL = 0x0D11
// export const GL_MAP_TESSELLATION_NV = 0x86C2
// export const GL_MAP_UNSYNCHRONIZED_BIT = 0x0020
// export const GL_MAP_WRITE_BIT = 0x0002
// export const GL_MATERIAL_SIDE_HINT_PGI = 0x1A22C
// export const GL_MATRIX0_ARB = 0x88C0
// export const GL_MATRIX0_NV = 0x8630
// export const GL_MATRIX10_ARB = 0x88CA
// export const GL_MATRIX11_ARB = 0x88CB
// export const GL_MATRIX12_ARB = 0x88CC
// export const GL_MATRIX13_ARB = 0x88CD
// export const GL_MATRIX14_ARB = 0x88CE
// export const GL_MATRIX15_ARB = 0x88CF
// export const GL_MATRIX16_ARB = 0x88D0
// export const GL_MATRIX17_ARB = 0x88D1
// export const GL_MATRIX18_ARB = 0x88D2
// export const GL_MATRIX19_ARB = 0x88D3
// export const GL_MATRIX1_ARB = 0x88C1
// export const GL_MATRIX1_NV = 0x8631
// export const GL_MATRIX20_ARB = 0x88D4
// export const GL_MATRIX21_ARB = 0x88D5
// export const GL_MATRIX22_ARB = 0x88D6
// export const GL_MATRIX23_ARB = 0x88D7
// export const GL_MATRIX24_ARB = 0x88D8
// export const GL_MATRIX25_ARB = 0x88D9
// export const GL_MATRIX26_ARB = 0x88DA
// export const GL_MATRIX27_ARB = 0x88DB
// export const GL_MATRIX28_ARB = 0x88DC
// export const GL_MATRIX29_ARB = 0x88DD
// export const GL_MATRIX2_ARB = 0x88C2
// export const GL_MATRIX2_NV = 0x8632
// export const GL_MATRIX30_ARB = 0x88DE
// export const GL_MATRIX31_ARB = 0x88DF
// export const GL_MATRIX3_ARB = 0x88C3
// export const GL_MATRIX3_NV = 0x8633
// export const GL_MATRIX4_ARB = 0x88C4
// export const GL_MATRIX4_NV = 0x8634
// export const GL_MATRIX5_ARB = 0x88C5
// export const GL_MATRIX5_NV = 0x8635
// export const GL_MATRIX6_ARB = 0x88C6
// export const GL_MATRIX6_NV = 0x8636
// export const GL_MATRIX7_ARB = 0x88C7
// export const GL_MATRIX7_NV = 0x8637
// export const GL_MATRIX8_ARB = 0x88C8
// export const GL_MATRIX9_ARB = 0x88C9
// export const GL_MATRIX_EXT = 0x87C0
// export const GL_MATRIX_INDEX_ARRAY_ARB = 0x8844
// export const GL_MATRIX_INDEX_ARRAY_POINTER_ARB = 0x8849
// export const GL_MATRIX_INDEX_ARRAY_SIZE_ARB = 0x8846
// export const GL_MATRIX_INDEX_ARRAY_STRIDE_ARB = 0x8848
// export const GL_MATRIX_INDEX_ARRAY_TYPE_ARB = 0x8847
// export const GL_MATRIX_MODE = 0x0BA0
// export const GL_MATRIX_PALETTE_ARB = 0x8840
// export const GL_MAT_AMBIENT_AND_DIFFUSE_BIT_PGI = 0x00200000
// export const GL_MAT_AMBIENT_BIT_PGI = 0x00100000
// export const GL_MAT_COLOR_INDEXES_BIT_PGI = 0x01000000
// export const GL_MAT_DIFFUSE_BIT_PGI = 0x00400000
// export const GL_MAT_EMISSION_BIT_PGI = 0x00800000
// export const GL_MAT_SHININESS_BIT_PGI = 0x02000000
// export const GL_MAT_SPECULAR_BIT_PGI = 0x04000000
// export const GL_MAX = 0x8008
// export const GL_MAX_3D_TEXTURE_SIZE = 0x8073
// export const GL_MAX_3D_TEXTURE_SIZE_EXT = 0x8073
// export const GL_MAX_4D_TEXTURE_SIZE_SGIS = 0x8138
// export const GL_MAX_ACTIVE_LIGHTS_SGIX = 0x8405
// export const GL_MAX_ARRAY_TEXTURE_LAYERS = 0x88FF
// export const GL_MAX_ARRAY_TEXTURE_LAYERS_EXT = 0x88FF
// export const GL_MAX_ASYNC_DRAW_PIXELS_SGIX = 0x8360
// export const GL_MAX_ASYNC_HISTOGRAM_SGIX = 0x832D
// export const GL_MAX_ASYNC_READ_PIXELS_SGIX = 0x8361
// export const GL_MAX_ASYNC_TEX_IMAGE_SGIX = 0x835F
// export const GL_MAX_ATTRIB_STACK_DEPTH = 0x0D35
// export const GL_MAX_BINDABLE_UNIFORM_SIZE_EXT = 0x8DED
// export const GL_MAX_CLIENT_ATTRIB_STACK_DEPTH = 0x0D3B
// export const GL_MAX_CLIPMAP_DEPTH_SGIX = 0x8177
// export const GL_MAX_CLIPMAP_VIRTUAL_DEPTH_SGIX = 0x8178
// export const GL_MAX_CLIP_PLANES = 0x0D32
// export const GL_MAX_CLIP_DISTANCES = GL_MAX_CLIP_PLANES
// export const GL_MAX_COLOR_ATTACHMENTS = 0x8CDF
// export const GL_MAX_COLOR_ATTACHMENTS_EXT = 0x8CDF
// export const GL_MAX_COLOR_MATRIX_STACK_DEPTH = 0x80B3
// export const GL_MAX_COLOR_MATRIX_STACK_DEPTH_SGI = 0x80B3
// export const GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D
// export const GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS_ARB = 0x8B4D
// export const GL_MAX_CONVOLUTION_HEIGHT = 0x801B
// export const GL_MAX_CONVOLUTION_HEIGHT_EXT = 0x801B
// export const GL_MAX_CONVOLUTION_WIDTH = 0x801A
// export const GL_MAX_CONVOLUTION_WIDTH_EXT = 0x801A
// export const GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C
// export const GL_MAX_CUBE_MAP_TEXTURE_SIZE_ARB = 0x851C
// export const GL_MAX_CUBE_MAP_TEXTURE_SIZE_EXT = 0x851C
// export const GL_MAX_DEFORMATION_ORDER_SGIX = 0x8197
// export const GL_MAX_DRAW_BUFFERS = 0x8824
// export const GL_MAX_DRAW_BUFFERS_ARB = 0x8824
// export const GL_MAX_DRAW_BUFFERS_ATI = 0x8824
// export const GL_MAX_ELEMENTS_INDICES = 0x80E9
// export const GL_MAX_ELEMENTS_INDICES_EXT = 0x80E9
// export const GL_MAX_ELEMENTS_VERTICES = 0x80E8
// export const GL_MAX_ELEMENTS_VERTICES_EXT = 0x80E8
// export const GL_MAX_EVAL_ORDER = 0x0D30
// export const GL_MAX_EXT = 0x8008
// export const GL_MAX_FOG_FUNC_POINTS_SGIS = 0x812C
// export const GL_MAX_FRAGMENT_BINDABLE_UNIFORMS_EXT = 0x8DE3
// export const GL_MAX_FRAGMENT_LIGHTS_SGIX = 0x8404
// export const GL_MAX_FRAGMENT_PROGRAM_LOCAL_PARAMETERS_NV = 0x8868
// export const GL_MAX_FRAGMENT_UNIFORM_COMPONENTS = 0x8B49
// export const GL_MAX_FRAGMENT_UNIFORM_COMPONENTS_ARB = 0x8B49
// export const GL_MAX_FRAMEZOOM_FACTOR_SGIX = 0x818D
// export const GL_MAX_GENERAL_COMBINERS_NV = 0x854D
// export const GL_MAX_GEOMETRY_BINDABLE_UNIFORMS_EXT = 0x8DE4
// export const GL_MAX_GEOMETRY_OUTPUT_VERTICES_ARB = 0x8DE0
// export const GL_MAX_GEOMETRY_OUTPUT_VERTICES_EXT = 0x8DE0
// export const GL_MAX_GEOMETRY_TEXTURE_IMAGE_UNITS_ARB = 0x8C29
// export const GL_MAX_GEOMETRY_TEXTURE_IMAGE_UNITS_EXT = 0x8C29
// export const GL_MAX_GEOMETRY_TOTAL_OUTPUT_COMPONENTS_ARB = 0x8DE1
// export const GL_MAX_GEOMETRY_TOTAL_OUTPUT_COMPONENTS_EXT = 0x8DE1
// export const GL_MAX_GEOMETRY_UNIFORM_COMPONENTS_ARB = 0x8DDF
// export const GL_MAX_GEOMETRY_UNIFORM_COMPONENTS_EXT = 0x8DDF
// export const GL_MAX_GEOMETRY_VARYING_COMPONENTS_ARB = 0x8DDD
// export const GL_MAX_GEOMETRY_VARYING_COMPONENTS_EXT = 0x8DDD
// export const GL_MAX_LIGHTS = 0x0D31
// export const GL_MAX_LIST_NESTING = 0x0B31
// export const GL_MAX_MAP_TESSELLATION_NV = 0x86D6
// export const GL_MAX_MATRIX_PALETTE_STACK_DEPTH_ARB = 0x8841
// export const GL_MAX_MODELVIEW_STACK_DEPTH = 0x0D36
// export const GL_MAX_MULTISAMPLE_COVERAGE_MODES_NV = 0x8E11
// export const GL_MAX_NAME_STACK_DEPTH = 0x0D37
// export const GL_MAX_OPTIMIZED_VERTEX_SHADER_INSTRUCTIONS_EXT = 0x87CA
// export const GL_MAX_OPTIMIZED_VERTEX_SHADER_INVARIANTS_EXT = 0x87CD
// export const GL_MAX_OPTIMIZED_VERTEX_SHADER_LOCALS_EXT = 0x87CE
// export const GL_MAX_OPTIMIZED_VERTEX_SHADER_LOCAL_CONSTANTS_EXT = 0x87CC
// export const GL_MAX_OPTIMIZED_VERTEX_SHADER_VARIANTS_EXT = 0x87CB
// export const GL_MAX_PALETTE_MATRICES_ARB = 0x8842
// export const GL_MAX_PIXEL_MAP_TABLE = 0x0D34
// export const GL_MAX_PIXEL_TRANSFORM_2D_STACK_DEPTH_EXT = 0x8337
// export const GL_MAX_PN_TRIANGLES_TESSELATION_LEVEL_ATI = 0x87F1
// export const GL_MAX_PROGRAM_ADDRESS_REGISTERS_ARB = 0x88B1
// export const GL_MAX_PROGRAM_ALU_INSTRUCTIONS_ARB = 0x880B
// export const GL_MAX_PROGRAM_ATTRIBS_ARB = 0x88AD
// export const GL_MAX_PROGRAM_ATTRIB_COMPONENTS_NV = 0x8908
// export const GL_MAX_PROGRAM_CALL_DEPTH_NV = 0x88F5
// export const GL_MAX_PROGRAM_ENV_PARAMETERS_ARB = 0x88B5
// export const GL_MAX_PROGRAM_EXEC_INSTRUCTIONS_NV = 0x88F4
// export const GL_MAX_PROGRAM_GENERIC_ATTRIBS_NV = 0x8DA5
// export const GL_MAX_PROGRAM_GENERIC_RESULTS_NV = 0x8DA6
// export const GL_MAX_PROGRAM_IF_DEPTH_NV = 0x88F6
// export const GL_MAX_PROGRAM_INSTRUCTIONS_ARB = 0x88A1
// export const GL_MAX_PROGRAM_LOCAL_PARAMETERS_ARB = 0x88B4
// export const GL_MAX_PROGRAM_LOOP_COUNT_NV = 0x88F8
// export const GL_MAX_PROGRAM_LOOP_DEPTH_NV = 0x88F7
// export const GL_MAX_PROGRAM_MATRICES_ARB = 0x862F
// export const GL_MAX_PROGRAM_MATRIX_STACK_DEPTH_ARB = 0x862E
// export const GL_MAX_PROGRAM_NATIVE_ADDRESS_REGISTERS_ARB = 0x88B3
// export const GL_MAX_PROGRAM_NATIVE_ALU_INSTRUCTIONS_ARB = 0x880E
// export const GL_MAX_PROGRAM_NATIVE_ATTRIBS_ARB = 0x88AF
// export const GL_MAX_PROGRAM_NATIVE_INSTRUCTIONS_ARB = 0x88A3
// export const GL_MAX_PROGRAM_NATIVE_PARAMETERS_ARB = 0x88AB
// export const GL_MAX_PROGRAM_NATIVE_TEMPORARIES_ARB = 0x88A7
// export const GL_MAX_PROGRAM_NATIVE_TEX_INDIRECTIONS_ARB = 0x8810
// export const GL_MAX_PROGRAM_NATIVE_TEX_INSTRUCTIONS_ARB = 0x880F
// export const GL_MAX_PROGRAM_OUTPUT_VERTICES_NV = 0x8C27
// export const GL_MAX_PROGRAM_PARAMETERS_ARB = 0x88A9
// export const GL_MAX_PROGRAM_PARAMETER_BUFFER_BINDINGS_NV = 0x8DA0
// export const GL_MAX_PROGRAM_PARAMETER_BUFFER_SIZE_NV = 0x8DA1
// export const GL_MAX_PROGRAM_RESULT_COMPONENTS_NV = 0x8909
// export const GL_MAX_PROGRAM_TEMPORARIES_ARB = 0x88A5
// export const GL_MAX_PROGRAM_TEXEL_OFFSET = 0x8905
// export const GL_MAX_PROGRAM_TEXEL_OFFSET_NV = 0x8905
// export const GL_MAX_PROGRAM_TEX_INDIRECTIONS_ARB = 0x880D
// export const GL_MAX_PROGRAM_TEX_INSTRUCTIONS_ARB = 0x880C
// export const GL_MAX_PROGRAM_TOTAL_OUTPUT_COMPONENTS_NV = 0x8C28
// export const GL_MAX_PROJECTION_STACK_DEPTH = 0x0D38
// export const GL_MAX_RATIONAL_EVAL_ORDER_NV = 0x86D7
// export const GL_MAX_RECTANGLE_TEXTURE_SIZE_ARB = 0x84F8
// export const GL_MAX_RECTANGLE_TEXTURE_SIZE_NV = 0x84F8
// export const GL_MAX_RENDERBUFFER_SIZE = 0x84E8
// export const GL_MAX_RENDERBUFFER_SIZE_EXT = 0x84E8
// export const GL_MAX_SAMPLES = 0x8D57
// export const GL_MAX_SAMPLES_EXT = 0x8D57
// export const GL_MAX_SAMPLE_MASK_WORDS_NV = 0x8E59
// export const GL_MAX_SHININESS_NV = 0x8504
// export const GL_MAX_SPOT_EXPONENT_NV = 0x8505
// export const GL_MAX_TEXTURE_BUFFER_SIZE_ARB = 0x8C2B
// export const GL_MAX_TEXTURE_BUFFER_SIZE_EXT = 0x8C2B
// export const GL_MAX_TEXTURE_COORDS = 0x8871
// export const GL_MAX_TEXTURE_COORDS_ARB = 0x8871
// export const GL_MAX_TEXTURE_COORDS_NV = 0x8871
// export const GL_MAX_TEXTURE_IMAGE_UNITS = 0x8872
// export const GL_MAX_TEXTURE_IMAGE_UNITS_ARB = 0x8872
// export const GL_MAX_TEXTURE_IMAGE_UNITS_NV = 0x8872
// export const GL_MAX_TEXTURE_LOD_BIAS = 0x84FD
// export const GL_MAX_TEXTURE_LOD_BIAS_EXT = 0x84FD
// export const GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF
// export const GL_MAX_TEXTURE_SIZE = 0x0D33
// export const GL_MAX_TEXTURE_STACK_DEPTH = 0x0D39
// export const GL_MAX_TEXTURE_UNITS = 0x84E2
// export const GL_MAX_TEXTURE_UNITS_ARB = 0x84E2
// export const GL_MAX_TRACK_MATRICES_NV = 0x862F
// export const GL_MAX_TRACK_MATRIX_STACK_DEPTH_NV = 0x862E
// export const GL_MAX_TRANSFORM_FEEDBACK_INTERLEAVED_ATTRIBS_NV = 0x8C8A
// export const GL_MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 0x8C8A
// export const GL_MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS_EXT = 0x8C8A
// export const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 0x8C8B
// export const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS_EXT = 0x8C8B
// export const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS_NV = 0x8C8B
// export const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 0x8C80
// export const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS_EXT = 0x8C80
// export const GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS_NV = 0x8C80
// export const GL_MAX_VARYING_COMPONENTS_EXT = 0x8B4B
// export const GL_MAX_VARYING_FLOATS = 0x8B4B
// export const GL_MAX_VARYING_COMPONENTS = GL_MAX_VARYING_FLOATS
// export const GL_MAX_VARYING_FLOATS_ARB = 0x8B4B
// export const GL_MAX_VERTEX_ARRAY_RANGE_ELEMENT_NV = 0x8520
// export const GL_MAX_VERTEX_ATTRIBS = 0x8869
// export const GL_MAX_VERTEX_ATTRIBS_ARB = 0x8869
// export const GL_MAX_VERTEX_BINDABLE_UNIFORMS_EXT = 0x8DE2
// export const GL_MAX_VERTEX_HINT_PGI = 0x1A22D
// export const GL_MAX_VERTEX_SHADER_INSTRUCTIONS_EXT = 0x87C5
// export const GL_MAX_VERTEX_SHADER_INVARIANTS_EXT = 0x87C7
// export const GL_MAX_VERTEX_SHADER_LOCALS_EXT = 0x87C9
// export const GL_MAX_VERTEX_SHADER_LOCAL_CONSTANTS_EXT = 0x87C8
// export const GL_MAX_VERTEX_SHADER_VARIANTS_EXT = 0x87C6
// export const GL_MAX_VERTEX_STREAMS_ATI = 0x876B
// export const GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C
// export const GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS_ARB = 0x8B4C
// export const GL_MAX_VERTEX_UNIFORM_COMPONENTS = 0x8B4A
// export const GL_MAX_VERTEX_UNIFORM_COMPONENTS_ARB = 0x8B4A
// export const GL_MAX_VERTEX_UNITS_ARB = 0x86A4
// export const GL_MAX_VERTEX_VARYING_COMPONENTS_ARB = 0x8DDE
// export const GL_MAX_VERTEX_VARYING_COMPONENTS_EXT = 0x8DDE
// export const GL_MAX_VIEWPORT_DIMS = 0x0D3A
// export const GL_MIN = 0x8007
// export const GL_MINMAX = 0x802E
// export const GL_MINMAX_EXT = 0x802E
// export const GL_MINMAX_FORMAT = 0x802F
// export const GL_MINMAX_FORMAT_EXT = 0x802F
// export const GL_MINMAX_SINK = 0x8030
// export const GL_MINMAX_SINK_EXT = 0x8030
// export const GL_MINOR_VERSION = 0x821C
// export const GL_MIN_EXT = 0x8007
// export const GL_MIN_PROGRAM_TEXEL_OFFSET = 0x8904
// export const GL_MIN_PROGRAM_TEXEL_OFFSET_NV = 0x8904
// export const GL_MIRRORED_REPEAT = 0x8370
// export const GL_MIRRORED_REPEAT_ARB = 0x8370
// export const GL_MIRRORED_REPEAT_IBM = 0x8370
// export const GL_MIRROR_CLAMP_ATI = 0x8742
// export const GL_MIRROR_CLAMP_EXT = 0x8742
// export const GL_MIRROR_CLAMP_TO_BORDER_EXT = 0x8912
// export const GL_MIRROR_CLAMP_TO_EDGE_ATI = 0x8743
// export const GL_MIRROR_CLAMP_TO_EDGE_EXT = 0x8743
// export const GL_MODELVIEW = 0x1700
// export const GL_MODELVIEW0_ARB = 0x1700
// export const GL_MODELVIEW0_EXT = GL_MODELVIEW
// export const GL_MODELVIEW10_ARB = 0x872A
// export const GL_MODELVIEW11_ARB = 0x872B
// export const GL_MODELVIEW12_ARB = 0x872C
// export const GL_MODELVIEW13_ARB = 0x872D
// export const GL_MODELVIEW14_ARB = 0x872E
// export const GL_MODELVIEW15_ARB = 0x872F
// export const GL_MODELVIEW16_ARB = 0x8730
// export const GL_MODELVIEW17_ARB = 0x8731
// export const GL_MODELVIEW18_ARB = 0x8732
// export const GL_MODELVIEW19_ARB = 0x8733
// export const GL_MODELVIEW1_ARB = 0x850A
// export const GL_MODELVIEW1_EXT = 0x850A
// export const GL_MODELVIEW1_MATRIX_EXT = 0x8506
// export const GL_MODELVIEW1_STACK_DEPTH_EXT = 0x8502
// export const GL_MODELVIEW20_ARB = 0x8734
// export const GL_MODELVIEW21_ARB = 0x8735
// export const GL_MODELVIEW22_ARB = 0x8736
// export const GL_MODELVIEW23_ARB = 0x8737
// export const GL_MODELVIEW24_ARB = 0x8738
// export const GL_MODELVIEW25_ARB = 0x8739
// export const GL_MODELVIEW26_ARB = 0x873A
// export const GL_MODELVIEW27_ARB = 0x873B
// export const GL_MODELVIEW28_ARB = 0x873C
// export const GL_MODELVIEW29_ARB = 0x873D
// export const GL_MODELVIEW2_ARB = 0x8722
// export const GL_MODELVIEW30_ARB = 0x873E
// export const GL_MODELVIEW31_ARB = 0x873F
// export const GL_MODELVIEW3_ARB = 0x8723
// export const GL_MODELVIEW4_ARB = 0x8724
// export const GL_MODELVIEW5_ARB = 0x8725
// export const GL_MODELVIEW6_ARB = 0x8726
// export const GL_MODELVIEW7_ARB = 0x8727
// export const GL_MODELVIEW8_ARB = 0x8728
// export const GL_MODELVIEW9_ARB = 0x8729
// export const GL_MODELVIEW_MATRIX = 0x0BA6
// export const GL_MODELVIEW0_MATRIX_EXT = GL_MODELVIEW_MATRIX
// export const GL_MODELVIEW_PROJECTION_NV = 0x8629
// export const GL_MODELVIEW_STACK_DEPTH = 0x0BA3
// export const GL_MODELVIEW0_STACK_DEPTH_EXT = GL_MODELVIEW_STACK_DEPTH
// export const GL_MODULATE = 0x2100
// export const GL_MODULATE_ADD_ATI = 0x8744
// export const GL_MODULATE_SIGNED_ADD_ATI = 0x8745
// export const GL_MODULATE_SUBTRACT_ATI = 0x8746
// export const GL_MOV_ATI = 0x8961
// export const GL_MULT = 0x0103
// export const GL_MULTISAMPLE = 0x809D
// export const GL_MULTISAMPLE_3DFX = 0x86B2
// export const GL_MULTISAMPLE_ARB = 0x809D
// export const GL_MULTISAMPLE_BIT = 0x20000000
// export const GL_MULTISAMPLE_BIT_3DFX = 0x20000000
// export const GL_MULTISAMPLE_BIT_ARB = 0x20000000
// export const GL_MULTISAMPLE_BIT_EXT = 0x20000000
// export const GL_MULTISAMPLE_COVERAGE_MODES_NV = 0x8E12
// export const GL_MULTISAMPLE_EXT = 0x809D
// export const GL_MULTISAMPLE_FILTER_HINT_NV = 0x8534
// export const GL_MULTISAMPLE_SGIS = 0x809D
// export const GL_MUL_ATI = 0x8964
// export const GL_MVP_MATRIX_EXT = 0x87E3
// export const GL_N3F_V3F = 0x2A25
// export const GL_NAME_STACK_DEPTH = 0x0D70
// export const GL_NAND = 0x150E
// export const GL_NATIVE_GRAPHICS_BEGIN_HINT_PGI = 0x1A203
// export const GL_NATIVE_GRAPHICS_END_HINT_PGI = 0x1A204
// export const GL_NATIVE_GRAPHICS_HANDLE_PGI = 0x1A202
// export const GL_NEAREST = 0x2600
// export const GL_NEAREST_CLIPMAP_LINEAR_SGIX = 0x844E
// export const GL_NEAREST_CLIPMAP_NEAREST_SGIX = 0x844D
// export const GL_NEAREST_MIPMAP_LINEAR = 0x2702
// export const GL_NEAREST_MIPMAP_NEAREST = 0x2700
// export const GL_NEGATE_BIT_ATI = 0x00000004
// export const GL_NEGATIVE_ONE_EXT = 0x87DF
// export const GL_NEGATIVE_W_EXT = 0x87DC
// export const GL_NEGATIVE_X_EXT = 0x87D9
// export const GL_NEGATIVE_Y_EXT = 0x87DA
// export const GL_NEGATIVE_Z_EXT = 0x87DB
// export const GL_NEVER = 0x0200
// export const GL_NICEST = 0x1102
// export const GL_NONE = 0
// export const GL_NOOP = 0x1505
// export const GL_NOR = 0x1508
// export const GL_NORMALIZE = 0x0BA1
// export const GL_NORMALIZED_RANGE_EXT = 0x87E0
// export const GL_NORMAL_ARRAY = 0x8075
// export const GL_NORMAL_ARRAY_BUFFER_BINDING = 0x8897
// export const GL_NORMAL_ARRAY_BUFFER_BINDING_ARB = 0x8897
// export const GL_NORMAL_ARRAY_COUNT_EXT = 0x8080
// export const GL_NORMAL_ARRAY_EXT = 0x8075
// export const GL_NORMAL_ARRAY_LIST_IBM = 103071
// export const GL_NORMAL_ARRAY_LIST_STRIDE_IBM = 103081
// export const GL_NORMAL_ARRAY_PARALLEL_POINTERS_INTEL = 0x83F6
// export const GL_NORMAL_ARRAY_POINTER = 0x808F
// export const GL_NORMAL_ARRAY_POINTER_EXT = 0x808F
// export const GL_NORMAL_ARRAY_STRIDE = 0x807F
// export const GL_NORMAL_ARRAY_STRIDE_EXT = 0x807F
// export const GL_NORMAL_ARRAY_TYPE = 0x807E
// export const GL_NORMAL_ARRAY_TYPE_EXT = 0x807E
// export const GL_NORMAL_BIT_PGI = 0x08000000
// export const GL_NORMAL_MAP = 0x8511
// export const GL_NORMAL_MAP_ARB = 0x8511
// export const GL_NORMAL_MAP_EXT = 0x8511
// export const GL_NORMAL_MAP_NV = 0x8511
// export const GL_NOTEQUAL = 0x0205
// export const GL_NO_ERROR = 0
// export const GL_NUM_COMPRESSED_TEXTURE_FORMATS = 0x86A2
// export const GL_NUM_COMPRESSED_TEXTURE_FORMATS_ARB = 0x86A2
// export const GL_NUM_EXTENSIONS = 0x821D
// export const GL_NUM_FILL_STREAMS_NV = 0x8E29
// export const GL_NUM_FRAGMENT_CONSTANTS_ATI = 0x896F
// export const GL_NUM_FRAGMENT_REGISTERS_ATI = 0x896E
// export const GL_NUM_GENERAL_COMBINERS_NV = 0x854E
// export const GL_NUM_INPUT_INTERPOLATOR_COMPONENTS_ATI = 0x8973
// export const GL_NUM_INSTRUCTIONS_PER_PASS_ATI = 0x8971
// export const GL_NUM_INSTRUCTIONS_TOTAL_ATI = 0x8972
// export const GL_NUM_LOOPBACK_COMPONENTS_ATI = 0x8974
// export const GL_NUM_PASSES_ATI = 0x8970
// export const GL_OBJECT_ACTIVE_ATTRIBUTES_ARB = 0x8B89
// export const GL_OBJECT_ACTIVE_ATTRIBUTE_MAX_LENGTH_ARB = 0x8B8A
// export const GL_OBJECT_ACTIVE_UNIFORMS_ARB = 0x8B86
// export const GL_OBJECT_ACTIVE_UNIFORM_MAX_LENGTH_ARB = 0x8B87
// export const GL_OBJECT_ATTACHED_OBJECTS_ARB = 0x8B85
// export const GL_OBJECT_BUFFER_SIZE_ATI = 0x8764
// export const GL_OBJECT_BUFFER_USAGE_ATI = 0x8765
// export const GL_OBJECT_COMPILE_STATUS_ARB = 0x8B81
// export const GL_OBJECT_DELETE_STATUS_ARB = 0x8B80
// export const GL_OBJECT_DISTANCE_TO_LINE_SGIS = 0x81F3
// export const GL_OBJECT_DISTANCE_TO_POINT_SGIS = 0x81F1
// export const GL_OBJECT_INFO_LOG_LENGTH_ARB = 0x8B84
// export const GL_OBJECT_LINEAR = 0x2401
// export const GL_OBJECT_LINE_SGIS = 0x81F7
// export const GL_OBJECT_LINK_STATUS_ARB = 0x8B82
// export const GL_OBJECT_PLANE = 0x2501
// export const GL_OBJECT_POINT_SGIS = 0x81F5
// export const GL_OBJECT_SHADER_SOURCE_LENGTH_ARB = 0x8B88
// export const GL_OBJECT_SUBTYPE_ARB = 0x8B4F
// export const GL_OBJECT_TYPE_ARB = 0x8B4E
// export const GL_OBJECT_VALIDATE_STATUS_ARB = 0x8B83
// export const GL_OCCLUSION_TEST_HP = 0x8165
// export const GL_OCCLUSION_TEST_RESULT_HP = 0x8166
// export const GL_OFFSET_HILO_PROJECTIVE_TEXTURE_2D_NV = 0x8856
// export const GL_OFFSET_HILO_PROJECTIVE_TEXTURE_RECTANGLE_NV = 0x8857
// export const GL_OFFSET_HILO_TEXTURE_2D_NV = 0x8854
// export const GL_OFFSET_HILO_TEXTURE_RECTANGLE_NV = 0x8855
// export const GL_OFFSET_PROJECTIVE_TEXTURE_2D_NV = 0x8850
// export const GL_OFFSET_PROJECTIVE_TEXTURE_2D_SCALE_NV = 0x8851
// export const GL_OFFSET_PROJECTIVE_TEXTURE_RECTANGLE_NV = 0x8852
// export const GL_OFFSET_PROJECTIVE_TEXTURE_RECTANGLE_SCALE_NV = 0x8853
// export const GL_OFFSET_TEXTURE_2D_NV = 0x86E8
// export const GL_OFFSET_TEXTURE_BIAS_NV = 0x86E3
// export const GL_OFFSET_TEXTURE_MATRIX_NV = 0x86E1
// export const GL_OFFSET_TEXTURE_RECTANGLE_NV = 0x864C
// export const GL_OFFSET_TEXTURE_RECTANGLE_SCALE_NV = 0x864D
// export const GL_OFFSET_TEXTURE_SCALE_NV = 0x86E2
// export const GL_OFFSET_TEXTURE_2D_BIAS_NV = GL_OFFSET_TEXTURE_BIAS_NV
// export const GL_OFFSET_TEXTURE_2D_MATRIX_NV = GL_OFFSET_TEXTURE_MATRIX_NV
// export const GL_OFFSET_TEXTURE_2D_SCALE_NV = GL_OFFSET_TEXTURE_SCALE_NV
// export const GL_ONE = 1
// export const GL_ONE_EXT = 0x87DE
// export const GL_ONE_MINUS_CONSTANT_ALPHA = 0x8004
// export const GL_ONE_MINUS_CONSTANT_ALPHA_EXT = 0x8004
// export const GL_ONE_MINUS_CONSTANT_COLOR = 0x8002
// export const GL_ONE_MINUS_CONSTANT_COLOR_EXT = 0x8002
// export const GL_ONE_MINUS_DST_ALPHA = 0x0305
// export const GL_ONE_MINUS_DST_COLOR = 0x0307
// export const GL_ONE_MINUS_SRC_ALPHA = 0x0303
// export const GL_ONE_MINUS_SRC_COLOR = 0x0301
// export const GL_OPERAND0_ALPHA = 0x8598
// export const GL_OPERAND0_ALPHA_ARB = 0x8598
// export const GL_OPERAND0_ALPHA_EXT = 0x8598
// export const GL_OPERAND0_RGB = 0x8590
// export const GL_OPERAND0_RGB_ARB = 0x8590
// export const GL_OPERAND0_RGB_EXT = 0x8590
// export const GL_OPERAND1_ALPHA = 0x8599
// export const GL_OPERAND1_ALPHA_ARB = 0x8599
// export const GL_OPERAND1_ALPHA_EXT = 0x8599
// export const GL_OPERAND1_RGB = 0x8591
// export const GL_OPERAND1_RGB_ARB = 0x8591
// export const GL_OPERAND1_RGB_EXT = 0x8591
// export const GL_OPERAND2_ALPHA = 0x859A
// export const GL_OPERAND2_ALPHA_ARB = 0x859A
// export const GL_OPERAND2_ALPHA_EXT = 0x859A
// export const GL_OPERAND2_RGB = 0x8592
// export const GL_OPERAND2_RGB_ARB = 0x8592
// export const GL_OPERAND2_RGB_EXT = 0x8592
// export const GL_OPERAND3_ALPHA_NV = 0x859B
// export const GL_OPERAND3_RGB_NV = 0x8593
// export const GL_OP_ADD_EXT = 0x8787
// export const GL_OP_CLAMP_EXT = 0x878E
// export const GL_OP_CROSS_PRODUCT_EXT = 0x8797
// export const GL_OP_DOT3_EXT = 0x8784
// export const GL_OP_DOT4_EXT = 0x8785
// export const GL_OP_EXP_BASE_2_EXT = 0x8791
// export const GL_OP_FLOOR_EXT = 0x878F
// export const GL_OP_FRAC_EXT = 0x8789
// export const GL_OP_INDEX_EXT = 0x8782
// export const GL_OP_LOG_BASE_2_EXT = 0x8792
// export const GL_OP_MADD_EXT = 0x8788
// export const GL_OP_MAX_EXT = 0x878A
// export const GL_OP_MIN_EXT = 0x878B
// export const GL_OP_MOV_EXT = 0x8799
// export const GL_OP_MULTIPLY_MATRIX_EXT = 0x8798
// export const GL_OP_MUL_EXT = 0x8786
// export const GL_OP_NEGATE_EXT = 0x8783
// export const GL_OP_POWER_EXT = 0x8793
// export const GL_OP_RECIP_EXT = 0x8794
// export const GL_OP_RECIP_SQRT_EXT = 0x8795
// export const GL_OP_ROUND_EXT = 0x8790
// export const GL_OP_SET_GE_EXT = 0x878C
// export const GL_OP_SET_LT_EXT = 0x878D
// export const GL_OP_SUB_EXT = 0x8796
// export const GL_OR = 0x1507
// export const GL_ORDER = 0x0A01
// export const GL_OR_INVERTED = 0x150D
// export const GL_OR_REVERSE = 0x150B
// export const GL_OUTPUT_COLOR0_EXT = 0x879B
// export const GL_OUTPUT_COLOR1_EXT = 0x879C
// export const GL_OUTPUT_FOG_EXT = 0x87BD
// export const GL_OUTPUT_TEXTURE_COORD0_EXT = 0x879D
// export const GL_OUTPUT_TEXTURE_COORD10_EXT = 0x87A7
// export const GL_OUTPUT_TEXTURE_COORD11_EXT = 0x87A8
// export const GL_OUTPUT_TEXTURE_COORD12_EXT = 0x87A9
// export const GL_OUTPUT_TEXTURE_COORD13_EXT = 0x87AA
// export const GL_OUTPUT_TEXTURE_COORD14_EXT = 0x87AB
// export const GL_OUTPUT_TEXTURE_COORD15_EXT = 0x87AC
// export const GL_OUTPUT_TEXTURE_COORD16_EXT = 0x87AD
// export const GL_OUTPUT_TEXTURE_COORD17_EXT = 0x87AE
// export const GL_OUTPUT_TEXTURE_COORD18_EXT = 0x87AF
// export const GL_OUTPUT_TEXTURE_COORD19_EXT = 0x87B0
// export const GL_OUTPUT_TEXTURE_COORD1_EXT = 0x879E
// export const GL_OUTPUT_TEXTURE_COORD20_EXT = 0x87B1
// export const GL_OUTPUT_TEXTURE_COORD21_EXT = 0x87B2
// export const GL_OUTPUT_TEXTURE_COORD22_EXT = 0x87B3
// export const GL_OUTPUT_TEXTURE_COORD23_EXT = 0x87B4
// export const GL_OUTPUT_TEXTURE_COORD24_EXT = 0x87B5
// export const GL_OUTPUT_TEXTURE_COORD25_EXT = 0x87B6
// export const GL_OUTPUT_TEXTURE_COORD26_EXT = 0x87B7
// export const GL_OUTPUT_TEXTURE_COORD27_EXT = 0x87B8
// export const GL_OUTPUT_TEXTURE_COORD28_EXT = 0x87B9
// export const GL_OUTPUT_TEXTURE_COORD29_EXT = 0x87BA
// export const GL_OUTPUT_TEXTURE_COORD2_EXT = 0x879F
// export const GL_OUTPUT_TEXTURE_COORD30_EXT = 0x87BB
// export const GL_OUTPUT_TEXTURE_COORD31_EXT = 0x87BC
// export const GL_OUTPUT_TEXTURE_COORD3_EXT = 0x87A0
// export const GL_OUTPUT_TEXTURE_COORD4_EXT = 0x87A1
// export const GL_OUTPUT_TEXTURE_COORD5_EXT = 0x87A2
// export const GL_OUTPUT_TEXTURE_COORD6_EXT = 0x87A3
// export const GL_OUTPUT_TEXTURE_COORD7_EXT = 0x87A4
// export const GL_OUTPUT_TEXTURE_COORD8_EXT = 0x87A5
// export const GL_OUTPUT_TEXTURE_COORD9_EXT = 0x87A6
// export const GL_OUTPUT_VERTEX_EXT = 0x879A
// export const GL_OUT_OF_MEMORY = 0x0505
// export const GL_PACK_ALIGNMENT = 0x0D05
// export const GL_PACK_CMYK_HINT_EXT = 0x800E
// export const GL_PACK_IMAGE_DEPTH_SGIS = 0x8131
// export const GL_PACK_IMAGE_HEIGHT = 0x806C
// export const GL_PACK_IMAGE_HEIGHT_EXT = 0x806C
// export const GL_PACK_INVERT_MESA = 0x8758
// export const GL_PACK_LSB_FIRST = 0x0D01
// export const GL_PACK_RESAMPLE_OML = 0x8984
// export const GL_PACK_RESAMPLE_SGIX = 0x842C
// export const GL_PACK_ROW_LENGTH = 0x0D02
// export const GL_PACK_SKIP_IMAGES = 0x806B
// export const GL_PACK_SKIP_IMAGES_EXT = 0x806B
// export const GL_PACK_SKIP_PIXELS = 0x0D04
// export const GL_PACK_SKIP_ROWS = 0x0D03
// export const GL_PACK_SKIP_VOLUMES_SGIS = 0x8130
// export const GL_PACK_SUBSAMPLE_RATE_SGIX = 0x85A0
// export const GL_PACK_SWAP_BYTES = 0x0D00
// export const GL_PARALLEL_ARRAYS_INTEL = 0x83F4
// export const GL_PASS_THROUGH_NV = 0x86E6
// export const GL_PASS_THROUGH_TOKEN = 0x0700
// export const GL_PERSPECTIVE_CORRECTION_HINT = 0x0C50
// export const GL_PERTURB_EXT = 0x85AE
// export const GL_PER_STAGE_CONSTANTS_NV = 0x8535
// export const GL_PHONG_HINT_WIN = 0x80EB
// export const GL_PHONG_WIN = 0x80EA
// export const GL_PIXEL_COUNTER_BITS_NV = 0x8864
// export const GL_PIXEL_COUNT_AVAILABLE_NV = 0x8867
// export const GL_PIXEL_COUNT_NV = 0x8866
// export const GL_PIXEL_CUBIC_WEIGHT_EXT = 0x8333
// export const GL_PIXEL_FRAGMENT_ALPHA_SOURCE_SGIS = 0x8355
// export const GL_PIXEL_FRAGMENT_RGB_SOURCE_SGIS = 0x8354
// export const GL_PIXEL_GROUP_COLOR_SGIS = 0x8356
// export const GL_PIXEL_MAG_FILTER_EXT = 0x8331
// export const GL_PIXEL_MAP_A_TO_A = 0x0C79
// export const GL_PIXEL_MAP_A_TO_A_SIZE = 0x0CB9
// export const GL_PIXEL_MAP_B_TO_B = 0x0C78
// export const GL_PIXEL_MAP_B_TO_B_SIZE = 0x0CB8
// export const GL_PIXEL_MAP_G_TO_G = 0x0C77
// export const GL_PIXEL_MAP_G_TO_G_SIZE = 0x0CB7
// export const GL_PIXEL_MAP_I_TO_A = 0x0C75
// export const GL_PIXEL_MAP_I_TO_A_SIZE = 0x0CB5
// export const GL_PIXEL_MAP_I_TO_B = 0x0C74
// export const GL_PIXEL_MAP_I_TO_B_SIZE = 0x0CB4
// export const GL_PIXEL_MAP_I_TO_G = 0x0C73
// export const GL_PIXEL_MAP_I_TO_G_SIZE = 0x0CB3
// export const GL_PIXEL_MAP_I_TO_I = 0x0C70
// export const GL_PIXEL_MAP_I_TO_I_SIZE = 0x0CB0
// export const GL_PIXEL_MAP_I_TO_R = 0x0C72
// export const GL_PIXEL_MAP_I_TO_R_SIZE = 0x0CB2
// export const GL_PIXEL_MAP_R_TO_R = 0x0C76
// export const GL_PIXEL_MAP_R_TO_R_SIZE = 0x0CB6
// export const GL_PIXEL_MAP_S_TO_S = 0x0C71
// export const GL_PIXEL_MAP_S_TO_S_SIZE = 0x0CB1
// export const GL_PIXEL_MIN_FILTER_EXT = 0x8332
// export const GL_PIXEL_MODE_BIT = 0x00000020
// export const GL_PIXEL_PACK_BUFFER = 0x88EB
// export const GL_PIXEL_PACK_BUFFER_ARB = 0x88EB
// export const GL_PIXEL_PACK_BUFFER_BINDING = 0x88ED
// export const GL_PIXEL_PACK_BUFFER_BINDING_ARB = 0x88ED
// export const GL_PIXEL_PACK_BUFFER_BINDING_EXT = 0x88ED
// export const GL_PIXEL_PACK_BUFFER_EXT = 0x88EB
// export const GL_PIXEL_SUBSAMPLE_2424_SGIX = 0x85A3
// export const GL_PIXEL_SUBSAMPLE_4242_SGIX = 0x85A4
// export const GL_PIXEL_SUBSAMPLE_4444_SGIX = 0x85A2
// export const GL_PIXEL_TEXTURE_SGIS = 0x8353
// export const GL_PIXEL_TEX_GEN_ALPHA_LS_SGIX = 0x8189
// export const GL_PIXEL_TEX_GEN_ALPHA_MS_SGIX = 0x818A
// export const GL_PIXEL_TEX_GEN_ALPHA_NO_REPLACE_SGIX = 0x8188
// export const GL_PIXEL_TEX_GEN_ALPHA_REPLACE_SGIX = 0x8187
// export const GL_PIXEL_TEX_GEN_MODE_SGIX = 0x832B
// export const GL_PIXEL_TEX_GEN_Q_CEILING_SGIX = 0x8184
// export const GL_PIXEL_TEX_GEN_Q_FLOOR_SGIX = 0x8186
// export const GL_PIXEL_TEX_GEN_Q_ROUND_SGIX = 0x8185
// export const GL_PIXEL_TEX_GEN_SGIX = 0x8139
// export const GL_PIXEL_TILE_BEST_ALIGNMENT_SGIX = 0x813E
// export const GL_PIXEL_TILE_CACHE_INCREMENT_SGIX = 0x813F
// export const GL_PIXEL_TILE_CACHE_SIZE_SGIX = 0x8145
// export const GL_PIXEL_TILE_GRID_DEPTH_SGIX = 0x8144
// export const GL_PIXEL_TILE_GRID_HEIGHT_SGIX = 0x8143
// export const GL_PIXEL_TILE_GRID_WIDTH_SGIX = 0x8142
// export const GL_PIXEL_TILE_HEIGHT_SGIX = 0x8141
// export const GL_PIXEL_TILE_WIDTH_SGIX = 0x8140
// export const GL_PIXEL_TRANSFORM_2D_EXT = 0x8330
// export const GL_PIXEL_TRANSFORM_2D_MATRIX_EXT = 0x8338
// export const GL_PIXEL_TRANSFORM_2D_STACK_DEPTH_EXT = 0x8336
// export const GL_PIXEL_UNPACK_BUFFER = 0x88EC
// export const GL_PIXEL_UNPACK_BUFFER_ARB = 0x88EC
// export const GL_PIXEL_UNPACK_BUFFER_BINDING = 0x88EF
// export const GL_PIXEL_UNPACK_BUFFER_BINDING_ARB = 0x88EF
// export const GL_PIXEL_UNPACK_BUFFER_BINDING_EXT = 0x88EF
// export const GL_PIXEL_UNPACK_BUFFER_EXT = 0x88EC
// export const GL_PN_TRIANGLES_ATI = 0x87F0
// export const GL_PN_TRIANGLES_NORMAL_MODE_ATI = 0x87F3
// export const GL_PN_TRIANGLES_NORMAL_MODE_LINEAR_ATI = 0x87F7
// export const GL_PN_TRIANGLES_NORMAL_MODE_QUADRATIC_ATI = 0x87F8
// export const GL_PN_TRIANGLES_POINT_MODE_ATI = 0x87F2
// export const GL_PN_TRIANGLES_POINT_MODE_CUBIC_ATI = 0x87F6
// export const GL_PN_TRIANGLES_POINT_MODE_LINEAR_ATI = 0x87F5
// export const GL_PN_TRIANGLES_TESSELATION_LEVEL_ATI = 0x87F4
// export const GL_POINT = 0x1B00
// export const GL_POINTS = 0x0000
// export const GL_POINT_BIT = 0x00000002
// export const GL_POINT_DISTANCE_ATTENUATION = 0x8129
// export const GL_POINT_DISTANCE_ATTENUATION_ARB = 0x8129
// export const GL_POINT_FADE_THRESHOLD_SIZE = 0x8128
// export const GL_POINT_FADE_THRESHOLD_SIZE_ARB = 0x8128
// export const GL_POINT_FADE_THRESHOLD_SIZE_EXT = 0x8128
// export const GL_POINT_FADE_THRESHOLD_SIZE_SGIS = 0x8128
// export const GL_POINT_SIZE = 0x0B11
// export const GL_POINT_SIZE_GRANULARITY = 0x0B13
// export const GL_POINT_SIZE_MAX = 0x8127
// export const GL_POINT_SIZE_MAX_ARB = 0x8127
// export const GL_POINT_SIZE_MAX_EXT = 0x8127
// export const GL_POINT_SIZE_MAX_SGIS = 0x8127
// export const GL_POINT_SIZE_MIN = 0x8126
// export const GL_POINT_SIZE_MIN_ARB = 0x8126
// export const GL_POINT_SIZE_MIN_EXT = 0x8126
// export const GL_POINT_SIZE_MIN_SGIS = 0x8126
// export const GL_POINT_SIZE_RANGE = 0x0B12
// export const GL_POINT_SMOOTH = 0x0B10
// export const GL_POINT_SMOOTH_HINT = 0x0C51
// export const GL_POINT_SPRITE = 0x8861
// export const GL_POINT_SPRITE_ARB = 0x8861
// export const GL_POINT_SPRITE_COORD_ORIGIN = 0x8CA0
// export const GL_POINT_SPRITE_NV = 0x8861
// export const GL_POINT_SPRITE_R_MODE_NV = 0x8863
// export const GL_POINT_TOKEN = 0x0701
// export const GL_POLYGON = 0x0009
// export const GL_POLYGON_BIT = 0x00000008
// export const GL_POLYGON_MODE = 0x0B40
// export const GL_POLYGON_OFFSET_BIAS_EXT = 0x8039
// export const GL_POLYGON_OFFSET_EXT = 0x8037
// export const GL_POLYGON_OFFSET_FACTOR = 0x8038
// export const GL_POLYGON_OFFSET_FACTOR_EXT = 0x8038
// export const GL_POLYGON_OFFSET_FILL = 0x8037
// export const GL_POLYGON_OFFSET_LINE = 0x2A02
// export const GL_POLYGON_OFFSET_POINT = 0x2A01
// export const GL_POLYGON_OFFSET_UNITS = 0x2A00
// export const GL_POLYGON_SMOOTH = 0x0B41
// export const GL_POLYGON_SMOOTH_HINT = 0x0C53
// export const GL_POLYGON_STIPPLE = 0x0B42
// export const GL_POLYGON_STIPPLE_BIT = 0x00000010
// export const GL_POLYGON_TOKEN = 0x0703
// export const GL_POSITION = 0x1203
// export const GL_POST_COLOR_MATRIX_ALPHA_BIAS = 0x80BB
// export const GL_POST_COLOR_MATRIX_ALPHA_BIAS_SGI = 0x80BB
// export const GL_POST_COLOR_MATRIX_ALPHA_SCALE = 0x80B7
// export const GL_POST_COLOR_MATRIX_ALPHA_SCALE_SGI = 0x80B7
// export const GL_POST_COLOR_MATRIX_BLUE_BIAS = 0x80BA
// export const GL_POST_COLOR_MATRIX_BLUE_BIAS_SGI = 0x80BA
// export const GL_POST_COLOR_MATRIX_BLUE_SCALE = 0x80B6
// export const GL_POST_COLOR_MATRIX_BLUE_SCALE_SGI = 0x80B6
// export const GL_POST_COLOR_MATRIX_COLOR_TABLE = 0x80D2
// export const GL_POST_COLOR_MATRIX_COLOR_TABLE_SGI = 0x80D2
// export const GL_POST_COLOR_MATRIX_GREEN_BIAS = 0x80B9
// export const GL_POST_COLOR_MATRIX_GREEN_BIAS_SGI = 0x80B9
// export const GL_POST_COLOR_MATRIX_GREEN_SCALE = 0x80B5
// export const GL_POST_COLOR_MATRIX_GREEN_SCALE_SGI = 0x80B5
// export const GL_POST_COLOR_MATRIX_RED_BIAS = 0x80B8
// export const GL_POST_COLOR_MATRIX_RED_BIAS_SGI = 0x80B8
// export const GL_POST_COLOR_MATRIX_RED_SCALE = 0x80B4
// export const GL_POST_COLOR_MATRIX_RED_SCALE_SGI = 0x80B4
// export const GL_POST_CONVOLUTION_ALPHA_BIAS = 0x8023
// export const GL_POST_CONVOLUTION_ALPHA_BIAS_EXT = 0x8023
// export const GL_POST_CONVOLUTION_ALPHA_SCALE = 0x801F
// export const GL_POST_CONVOLUTION_ALPHA_SCALE_EXT = 0x801F
// export const GL_POST_CONVOLUTION_BLUE_BIAS = 0x8022
// export const GL_POST_CONVOLUTION_BLUE_BIAS_EXT = 0x8022
// export const GL_POST_CONVOLUTION_BLUE_SCALE = 0x801E
// export const GL_POST_CONVOLUTION_BLUE_SCALE_EXT = 0x801E
// export const GL_POST_CONVOLUTION_COLOR_TABLE = 0x80D1
// export const GL_POST_CONVOLUTION_COLOR_TABLE_SGI = 0x80D1
// export const GL_POST_CONVOLUTION_GREEN_BIAS = 0x8021
// export const GL_POST_CONVOLUTION_GREEN_BIAS_EXT = 0x8021
// export const GL_POST_CONVOLUTION_GREEN_SCALE = 0x801D
// export const GL_POST_CONVOLUTION_GREEN_SCALE_EXT = 0x801D
// export const GL_POST_CONVOLUTION_RED_BIAS = 0x8020
// export const GL_POST_CONVOLUTION_RED_BIAS_EXT = 0x8020
// export const GL_POST_CONVOLUTION_RED_SCALE = 0x801C
// export const GL_POST_CONVOLUTION_RED_SCALE_EXT = 0x801C
// export const GL_POST_IMAGE_TRANSFORM_COLOR_TABLE_HP = 0x8162
// export const GL_POST_TEXTURE_FILTER_BIAS_RANGE_SGIX = 0x817B
// export const GL_POST_TEXTURE_FILTER_BIAS_SGIX = 0x8179
// export const GL_POST_TEXTURE_FILTER_SCALE_RANGE_SGIX = 0x817C
// export const GL_POST_TEXTURE_FILTER_SCALE_SGIX = 0x817A
// export const GL_PREFER_DOUBLEBUFFER_HINT_PGI = 0x1A1F8
// export const GL_PRESENT_DURATION_NV = 0x8E2B
// export const GL_PRESENT_TIME_NV = 0x8E2A
// export const GL_PRESERVE_ATI = 0x8762
// export const GL_PREVIOUS = 0x8578
// export const GL_PREVIOUS_ARB = 0x8578
// export const GL_PREVIOUS_EXT = 0x8578
// export const GL_PREVIOUS_TEXTURE_INPUT_NV = 0x86E4
// export const GL_PRIMARY_COLOR = 0x8577
// export const GL_PRIMARY_COLOR_ARB = 0x8577
// export const GL_PRIMARY_COLOR_EXT = 0x8577
// export const GL_PRIMARY_COLOR_NV = 0x852C
// export const GL_PRIMITIVES_GENERATED = 0x8C87
// export const GL_PRIMITIVES_GENERATED_EXT = 0x8C87
// export const GL_PRIMITIVES_GENERATED_NV = 0x8C87
// export const GL_PRIMITIVE_ID_NV = 0x8C7C
// export const GL_PRIMITIVE_RESTART_INDEX_NV = 0x8559
// export const GL_PRIMITIVE_RESTART_NV = 0x8558
// export const GL_PROGRAM_ADDRESS_REGISTERS_ARB = 0x88B0
// export const GL_PROGRAM_ALU_INSTRUCTIONS_ARB = 0x8805
// export const GL_PROGRAM_ATTRIBS_ARB = 0x88AC
// export const GL_PROGRAM_ATTRIB_COMPONENTS_NV = 0x8906
// export const GL_PROGRAM_BINDING_ARB = 0x8677
// export const GL_PROGRAM_ERROR_POSITION_ARB = 0x864B
// export const GL_PROGRAM_ERROR_POSITION_NV = 0x864B
// export const GL_PROGRAM_ERROR_STRING_ARB = 0x8874
// export const GL_PROGRAM_ERROR_STRING_NV = 0x8874
// export const GL_PROGRAM_FORMAT_ARB = 0x8876
// export const GL_PROGRAM_FORMAT_ASCII_ARB = 0x8875
// export const GL_PROGRAM_INSTRUCTIONS_ARB = 0x88A0
// export const GL_PROGRAM_LENGTH_ARB = 0x8627
// export const GL_PROGRAM_LENGTH_NV = 0x8627
// export const GL_PROGRAM_MATRIX_EXT = 0x8E2D
// export const GL_PROGRAM_MATRIX_STACK_DEPTH_EXT = 0x8E2F
// export const GL_PROGRAM_NATIVE_ADDRESS_REGISTERS_ARB = 0x88B2
// export const GL_PROGRAM_NATIVE_ALU_INSTRUCTIONS_ARB = 0x8808
// export const GL_PROGRAM_NATIVE_ATTRIBS_ARB = 0x88AE
// export const GL_PROGRAM_NATIVE_INSTRUCTIONS_ARB = 0x88A2
// export const GL_PROGRAM_NATIVE_PARAMETERS_ARB = 0x88AA
// export const GL_PROGRAM_NATIVE_TEMPORARIES_ARB = 0x88A6
// export const GL_PROGRAM_NATIVE_TEX_INDIRECTIONS_ARB = 0x880A
// export const GL_PROGRAM_NATIVE_TEX_INSTRUCTIONS_ARB = 0x8809
// export const GL_PROGRAM_OBJECT_ARB = 0x8B40
// export const GL_PROGRAM_PARAMETERS_ARB = 0x88A8
// export const GL_PROGRAM_PARAMETER_NV = 0x8644
// export const GL_PROGRAM_POINT_SIZE_ARB = 0x8642
// export const GL_PROGRAM_POINT_SIZE_EXT = 0x8642
// export const GL_PROGRAM_RESIDENT_NV = 0x8647
// export const GL_PROGRAM_RESULT_COMPONENTS_NV = 0x8907
// export const GL_PROGRAM_STRING_ARB = 0x8628
// export const GL_PROGRAM_STRING_NV = 0x8628
// export const GL_PROGRAM_TARGET_NV = 0x8646
// export const GL_PROGRAM_TEMPORARIES_ARB = 0x88A4
// export const GL_PROGRAM_TEX_INDIRECTIONS_ARB = 0x8807
// export const GL_PROGRAM_TEX_INSTRUCTIONS_ARB = 0x8806
// export const GL_PROGRAM_UNDER_NATIVE_LIMITS_ARB = 0x88B6
// export const GL_PROJECTION = 0x1701
// export const GL_PROJECTION_MATRIX = 0x0BA7
// export const GL_PROJECTION_STACK_DEPTH = 0x0BA4
// export const GL_PROXY_COLOR_TABLE = 0x80D3
// export const GL_PROXY_COLOR_TABLE_SGI = 0x80D3
// export const GL_PROXY_HISTOGRAM = 0x8025
// export const GL_PROXY_HISTOGRAM_EXT = 0x8025
// export const GL_PROXY_POST_COLOR_MATRIX_COLOR_TABLE = 0x80D5
// export const GL_PROXY_POST_COLOR_MATRIX_COLOR_TABLE_SGI = 0x80D5
// export const GL_PROXY_POST_CONVOLUTION_COLOR_TABLE = 0x80D4
// export const GL_PROXY_POST_CONVOLUTION_COLOR_TABLE_SGI = 0x80D4
// export const GL_PROXY_POST_IMAGE_TRANSFORM_COLOR_TABLE_HP = 0x8163
// export const GL_PROXY_TEXTURE_1D = 0x8063
// export const GL_PROXY_TEXTURE_1D_ARRAY = 0x8C19
// export const GL_PROXY_TEXTURE_1D_ARRAY_EXT = 0x8C19
// export const GL_PROXY_TEXTURE_1D_EXT = 0x8063
// export const GL_PROXY_TEXTURE_1D_STACK_MESAX = 0x875B
// export const GL_PROXY_TEXTURE_2D = 0x8064
// export const GL_PROXY_TEXTURE_2D_ARRAY = 0x8C1B
// export const GL_PROXY_TEXTURE_2D_ARRAY_EXT = 0x8C1B
// export const GL_PROXY_TEXTURE_2D_EXT = 0x8064
// export const GL_PROXY_TEXTURE_2D_STACK_MESAX = 0x875C
// export const GL_PROXY_TEXTURE_3D = 0x8070
// export const GL_PROXY_TEXTURE_3D_EXT = 0x8070
// export const GL_PROXY_TEXTURE_4D_SGIS = 0x8135
// export const GL_PROXY_TEXTURE_COLOR_TABLE_SGI = 0x80BD
// export const GL_PROXY_TEXTURE_CUBE_MAP = 0x851B
// export const GL_PROXY_TEXTURE_CUBE_MAP_ARB = 0x851B
// export const GL_PROXY_TEXTURE_CUBE_MAP_EXT = 0x851B
// export const GL_PROXY_TEXTURE_RECTANGLE_ARB = 0x84F7
// export const GL_PROXY_TEXTURE_RECTANGLE_NV = 0x84F7
// export const GL_Q = 0x2003
// export const GL_QUADRATIC_ATTENUATION = 0x1209
// export const GL_QUADS = 0x0007
// export const GL_QUAD_ALPHA4_SGIS = 0x811E
// export const GL_QUAD_ALPHA8_SGIS = 0x811F
// export const GL_QUAD_INTENSITY4_SGIS = 0x8122
// export const GL_QUAD_INTENSITY8_SGIS = 0x8123
// export const GL_QUAD_LUMINANCE4_SGIS = 0x8120
// export const GL_QUAD_LUMINANCE8_SGIS = 0x8121
// export const GL_QUAD_MESH_SUN = 0x8614
// export const GL_QUAD_STRIP = 0x0008
// export const GL_QUAD_TEXTURE_SELECT_SGIS = 0x8125
// export const GL_QUARTER_BIT_ATI = 0x00000010
// export const GL_QUERY_BY_REGION_NO_WAIT = 0x8E16
// export const GL_QUERY_BY_REGION_NO_WAIT_NV = 0x8E16
// export const GL_QUERY_BY_REGION_WAIT = 0x8E15
// export const GL_QUERY_BY_REGION_WAIT_NV = 0x8E15
// export const GL_QUERY_COUNTER_BITS = 0x8864
// export const GL_QUERY_COUNTER_BITS_ARB = 0x8864
// export const GL_QUERY_NO_WAIT = 0x8E14
// export const GL_QUERY_NO_WAIT_NV = 0x8E14
// export const GL_QUERY_RESULT = 0x8866
// export const GL_QUERY_RESULT_ARB = 0x8866
// export const GL_QUERY_RESULT_AVAILABLE = 0x8867
// export const GL_QUERY_RESULT_AVAILABLE_ARB = 0x8867
// export const GL_QUERY_WAIT = 0x8E13
// export const GL_QUERY_WAIT_NV = 0x8E13
// export const GL_R = 0x2002
// export const GL_R11F_G11F_B10F = 0x8C3A
// export const GL_R11F_G11F_B10F_EXT = 0x8C3A
// export const GL_R16 = 0x822A
// export const GL_R16F = 0x822D
// export const GL_R16I = 0x8233
// export const GL_R16UI = 0x8234
// export const GL_R1UI_C3F_V3F_SUN = 0x85C6
// export const GL_R1UI_C4F_N3F_V3F_SUN = 0x85C8
// export const GL_R1UI_C4UB_V3F_SUN = 0x85C5
// export const GL_R1UI_N3F_V3F_SUN = 0x85C7
// export const GL_R1UI_T2F_C4F_N3F_V3F_SUN = 0x85CB
// export const GL_R1UI_T2F_N3F_V3F_SUN = 0x85CA
// export const GL_R1UI_T2F_V3F_SUN = 0x85C9
// export const GL_R1UI_V3F_SUN = 0x85C4
// export const GL_R32F = 0x822E
// export const GL_R32I = 0x8235
// export const GL_R32UI = 0x8236
// export const GL_R3_G3_B2 = 0x2A10
// export const GL_R8 = 0x8229
// export const GL_R8I = 0x8231
// export const GL_R8UI = 0x8232
// export const GL_RASTERIZER_DISCARD = 0x8C89
// export const GL_RASTERIZER_DISCARD_EXT = 0x8C89
// export const GL_RASTERIZER_DISCARD_NV = 0x8C89
// export const GL_RASTER_POSITION_UNCLIPPED_IBM = 0x19262
// export const GL_READ_BUFFER = 0x0C02
// export const GL_READ_FRAMEBUFFER = 0x8CA8
// export const GL_READ_FRAMEBUFFER_BINDING = 0x8CAA
// export const GL_READ_FRAMEBUFFER_BINDING_EXT = 0x8CAA
// export const GL_READ_FRAMEBUFFER_EXT = 0x8CA8
// export const GL_READ_ONLY = 0x88B8
// export const GL_READ_ONLY_ARB = 0x88B8
// export const GL_READ_PIXEL_DATA_RANGE_LENGTH_NV = 0x887B
// export const GL_READ_PIXEL_DATA_RANGE_NV = 0x8879
// export const GL_READ_PIXEL_DATA_RANGE_POINTER_NV = 0x887D
// export const GL_READ_WRITE = 0x88BA
// export const GL_READ_WRITE_ARB = 0x88BA
// export const GL_RECLAIM_MEMORY_HINT_PGI = 0x1A1FE
// export const GL_RED = 0x1903
// export const GL_REDUCE = 0x8016
// export const GL_REDUCE_EXT = 0x8016
// export const GL_RED_BIAS = 0x0D15
// export const GL_RED_BITS = 0x0D52
// export const GL_RED_BIT_ATI = 0x00000001
// export const GL_RED_INTEGER = 0x8D94
// export const GL_RED_INTEGER_EXT = 0x8D94
// export const GL_RED_MAX_CLAMP_INGR = 0x8564
// export const GL_RED_MIN_CLAMP_INGR = 0x8560
// export const GL_RED_SCALE = 0x0D14
// export const GL_REFERENCE_PLANE_EQUATION_SGIX = 0x817E
// export const GL_REFERENCE_PLANE_SGIX = 0x817D
// export const GL_REFLECTION_MAP = 0x8512
// export const GL_REFLECTION_MAP_ARB = 0x8512
// export const GL_REFLECTION_MAP_EXT = 0x8512
// export const GL_REFLECTION_MAP_NV = 0x8512
// export const GL_REGISTER_COMBINERS_NV = 0x8522
// export const GL_REG_0_ATI = 0x8921
// export const GL_REG_10_ATI = 0x892B
// export const GL_REG_11_ATI = 0x892C
// export const GL_REG_12_ATI = 0x892D
// export const GL_REG_13_ATI = 0x892E
// export const GL_REG_14_ATI = 0x892F
// export const GL_REG_15_ATI = 0x8930
// export const GL_REG_16_ATI = 0x8931
// export const GL_REG_17_ATI = 0x8932
// export const GL_REG_18_ATI = 0x8933
// export const GL_REG_19_ATI = 0x8934
// export const GL_REG_1_ATI = 0x8922
// export const GL_REG_20_ATI = 0x8935
// export const GL_REG_21_ATI = 0x8936
// export const GL_REG_22_ATI = 0x8937
// export const GL_REG_23_ATI = 0x8938
// export const GL_REG_24_ATI = 0x8939
// export const GL_REG_25_ATI = 0x893A
// export const GL_REG_26_ATI = 0x893B
// export const GL_REG_27_ATI = 0x893C
// export const GL_REG_28_ATI = 0x893D
// export const GL_REG_29_ATI = 0x893E
// export const GL_REG_2_ATI = 0x8923
// export const GL_REG_30_ATI = 0x893F
// export const GL_REG_31_ATI = 0x8940
// export const GL_REG_3_ATI = 0x8924
// export const GL_REG_4_ATI = 0x8925
// export const GL_REG_5_ATI = 0x8926
// export const GL_REG_6_ATI = 0x8927
// export const GL_REG_7_ATI = 0x8928
// export const GL_REG_8_ATI = 0x8929
// export const GL_REG_9_ATI = 0x892A
// export const GL_RENDER = 0x1C00
// export const GL_RENDERBUFFER = 0x8D41
// export const GL_RENDERBUFFER_ALPHA_SIZE = 0x8D53
// export const GL_RENDERBUFFER_ALPHA_SIZE_EXT = 0x8D53
// export const GL_RENDERBUFFER_BINDING = 0x8CA7
// export const GL_RENDERBUFFER_BINDING_EXT = 0x8CA7
// export const GL_RENDERBUFFER_BLUE_SIZE = 0x8D52
// export const GL_RENDERBUFFER_BLUE_SIZE_EXT = 0x8D52
// export const GL_RENDERBUFFER_COLOR_SAMPLES_NV = 0x8E10
// export const GL_RENDERBUFFER_COVERAGE_SAMPLES_NV = 0x8CAB
// export const GL_RENDERBUFFER_DEPTH_SIZE = 0x8D54
// export const GL_RENDERBUFFER_DEPTH_SIZE_EXT = 0x8D54
// export const GL_RENDERBUFFER_EXT = 0x8D41
// export const GL_RENDERBUFFER_GREEN_SIZE = 0x8D51
// export const GL_RENDERBUFFER_GREEN_SIZE_EXT = 0x8D51
// export const GL_RENDERBUFFER_HEIGHT = 0x8D43
// export const GL_RENDERBUFFER_HEIGHT_EXT = 0x8D43
// export const GL_RENDERBUFFER_INTERNAL_FORMAT = 0x8D44
// export const GL_RENDERBUFFER_INTERNAL_FORMAT_EXT = 0x8D44
// export const GL_RENDERBUFFER_RED_SIZE = 0x8D50
// export const GL_RENDERBUFFER_RED_SIZE_EXT = 0x8D50
// export const GL_RENDERBUFFER_SAMPLES = 0x8CAB
// export const GL_RENDERBUFFER_SAMPLES_EXT = 0x8CAB
// export const GL_RENDERBUFFER_STENCIL_SIZE = 0x8D55
// export const GL_RENDERBUFFER_STENCIL_SIZE_EXT = 0x8D55
// export const GL_RENDERBUFFER_WIDTH = 0x8D42
// export const GL_RENDERBUFFER_WIDTH_EXT = 0x8D42
// export const GL_RENDERER = 0x1F01
// export const GL_RENDER_MODE = 0x0C40
// export const GL_REPEAT = 0x2901
// export const GL_REPLACE = 0x1E01
// export const GL_REPLACEMENT_CODE_ARRAY_POINTER_SUN = 0x85C3
// export const GL_REPLACEMENT_CODE_ARRAY_STRIDE_SUN = 0x85C2
// export const GL_REPLACEMENT_CODE_ARRAY_SUN = 0x85C0
// export const GL_REPLACEMENT_CODE_ARRAY_TYPE_SUN = 0x85C1
// export const GL_REPLACEMENT_CODE_SUN = 0x81D8
// export const GL_REPLACE_EXT = 0x8062
// export const GL_REPLACE_MIDDLE_SUN = 0x0002
// export const GL_REPLACE_OLDEST_SUN = 0x0003
// export const GL_REPLICATE_BORDER = 0x8153
// export const GL_REPLICATE_BORDER_HP = 0x8153
// export const GL_RESAMPLE_AVERAGE_OML = 0x8988
// export const GL_RESAMPLE_DECIMATE_OML = 0x8989
// export const GL_RESAMPLE_DECIMATE_SGIX = 0x8430
// export const GL_RESAMPLE_REPLICATE_OML = 0x8986
// export const GL_RESAMPLE_REPLICATE_SGIX = 0x842E
// export const GL_RESAMPLE_ZERO_FILL_OML = 0x8987
// export const GL_RESAMPLE_ZERO_FILL_SGIX = 0x842F
// export const GL_RESCALE_NORMAL = 0x803A
// export const GL_RESCALE_NORMAL_EXT = 0x803A
// export const GL_RESTART_SUN = 0x0001
// export const GL_RETURN = 0x0102
// export const GL_RG = 0x8227
// export const GL_RG16 = 0x822C
// export const GL_RG16F = 0x822F
// export const GL_RG16I = 0x8239
// export const GL_RG16UI = 0x823A
// export const GL_RG32F = 0x8230
// export const GL_RG32I = 0x823B
// export const GL_RG32UI = 0x823C
// export const GL_RG8 = 0x822B
// export const GL_RG8I = 0x8237
// export const GL_RG8UI = 0x8238
// export const GL_RGB = 0x1907
// export const GL_RGB10 = 0x8052
// export const GL_RGB10_A2 = 0x8059
// export const GL_RGB10_A2_EXT = 0x8059
// export const GL_RGB10_EXT = 0x8052
// export const GL_RGB12 = 0x8053
// export const GL_RGB12_EXT = 0x8053
// export const GL_RGB16 = 0x8054
// export const GL_RGB16F = 0x881B
// export const GL_RGB16F_ARB = 0x881B
// export const GL_RGB16I = 0x8D89
// export const GL_RGB16I_EXT = 0x8D89
// export const GL_RGB16UI = 0x8D77
// export const GL_RGB16UI_EXT = 0x8D77
// export const GL_RGB16_EXT = 0x8054
// export const GL_RGB2_EXT = 0x804E
// export const GL_RGB32F = 0x8815
// export const GL_RGB32F_ARB = 0x8815
// export const GL_RGB32I = 0x8D83
// export const GL_RGB32I_EXT = 0x8D83
// export const GL_RGB32UI = 0x8D71
// export const GL_RGB32UI_EXT = 0x8D71
// export const GL_RGB4 = 0x804F
// export const GL_RGB4_EXT = 0x804F
// export const GL_RGB4_S3TC = 0x83A1
// export const GL_RGB5 = 0x8050
// export const GL_RGB5_A1 = 0x8057
// export const GL_RGB5_A1_EXT = 0x8057
// export const GL_RGB5_EXT = 0x8050
// export const GL_RGB8 = 0x8051
// export const GL_RGB8I = 0x8D8F
// export const GL_RGB8I_EXT = 0x8D8F
// export const GL_RGB8UI = 0x8D7D
// export const GL_RGB8UI_EXT = 0x8D7D
// export const GL_RGB8_EXT = 0x8051
// export const GL_RGB9_E5 = 0x8C3D
// export const GL_RGB9_E5_EXT = 0x8C3D
// export const GL_RGBA = 0x1908
// export const GL_RGBA12 = 0x805A
// export const GL_RGBA12_EXT = 0x805A
// export const GL_RGBA16 = 0x805B
// export const GL_RGBA16F = 0x881A
// export const GL_RGBA16F_ARB = 0x881A
// export const GL_RGBA16I = 0x8D88
// export const GL_RGBA16I_EXT = 0x8D88
// export const GL_RGBA16UI = 0x8D76
// export const GL_RGBA16UI_EXT = 0x8D76
// export const GL_RGBA16_EXT = 0x805B
// export const GL_RGBA2 = 0x8055
// export const GL_RGBA2_EXT = 0x8055
// export const GL_RGBA32F = 0x8814
// export const GL_RGBA32F_ARB = 0x8814
// export const GL_RGBA32I = 0x8D82
// export const GL_RGBA32I_EXT = 0x8D82
// export const GL_RGBA32UI = 0x8D70
// export const GL_RGBA32UI_EXT = 0x8D70
// export const GL_RGBA4 = 0x8056
// export const GL_RGBA4_EXT = 0x8056
// export const GL_RGBA4_S3TC = 0x83A3
// export const GL_RGBA8 = 0x8058
// export const GL_RGBA8I = 0x8D8E
// export const GL_RGBA8I_EXT = 0x8D8E
// export const GL_RGBA8UI = 0x8D7C
// export const GL_RGBA8UI_EXT = 0x8D7C
// export const GL_RGBA8_EXT = 0x8058
// export const GL_RGBA_FLOAT16_ATI = 0x881A
// export const GL_RGBA_FLOAT32_ATI = 0x8814
// export const GL_RGBA_FLOAT_MODE_ARB = 0x8820
// export const GL_RGBA_INTEGER = 0x8D99
// export const GL_RGBA_INTEGER_EXT = 0x8D99
// export const GL_RGBA_INTEGER_MODE_EXT = 0x8D9E
// export const GL_RGBA_MODE = 0x0C31
// export const GL_RGBA_S3TC = 0x83A2
// export const GL_RGBA_SIGNED_COMPONENTS_EXT = 0x8C3C
// export const GL_RGBA_UNSIGNED_DOT_PRODUCT_MAPPING_NV = 0x86D9
// export const GL_RGB_FLOAT16_ATI = 0x881B
// export const GL_RGB_FLOAT32_ATI = 0x8815
// export const GL_RGB_INTEGER = 0x8D98
// export const GL_RGB_INTEGER_EXT = 0x8D98
// export const GL_RGB_S3TC = 0x83A0
// export const GL_RGB_SCALE = 0x8573
// export const GL_RGB_SCALE_ARB = 0x8573
// export const GL_RGB_SCALE_EXT = 0x8573
// export const GL_RG_INTEGER = 0x8228
// export const GL_RIGHT = 0x0407
// export const GL_S = 0x2000
// export const GL_SAMPLER_1D = 0x8B5D
// export const GL_SAMPLER_1D_ARB = 0x8B5D
// export const GL_SAMPLER_1D_ARRAY = 0x8DC0
// export const GL_SAMPLER_1D_ARRAY_EXT = 0x8DC0
// export const GL_SAMPLER_1D_ARRAY_SHADOW = 0x8DC3
// export const GL_SAMPLER_1D_ARRAY_SHADOW_EXT = 0x8DC3
// export const GL_SAMPLER_1D_SHADOW = 0x8B61
// export const GL_SAMPLER_1D_SHADOW_ARB = 0x8B61
// export const GL_SAMPLER_2D = 0x8B5E
// export const GL_SAMPLER_2D_ARB = 0x8B5E
// export const GL_SAMPLER_2D_ARRAY = 0x8DC1
// export const GL_SAMPLER_2D_ARRAY_EXT = 0x8DC1
// export const GL_SAMPLER_2D_ARRAY_SHADOW = 0x8DC4
// export const GL_SAMPLER_2D_ARRAY_SHADOW_EXT = 0x8DC4
// export const GL_SAMPLER_2D_RECT_ARB = 0x8B63
// export const GL_SAMPLER_2D_RECT_SHADOW_ARB = 0x8B64
// export const GL_SAMPLER_2D_SHADOW = 0x8B62
// export const GL_SAMPLER_2D_SHADOW_ARB = 0x8B62
// export const GL_SAMPLER_3D = 0x8B5F
// export const GL_SAMPLER_3D_ARB = 0x8B5F
// export const GL_SAMPLER_BUFFER_EXT = 0x8DC2
// export const GL_SAMPLER_CUBE = 0x8B60
// export const GL_SAMPLER_CUBE_ARB = 0x8B60
// export const GL_SAMPLER_CUBE_SHADOW = 0x8DC5
// export const GL_SAMPLER_CUBE_SHADOW_EXT = 0x8DC5
// export const GL_SAMPLER_RENDERBUFFER_NV = 0x8E56
// export const GL_SAMPLES = 0x80A9
// export const GL_SAMPLES_3DFX = 0x86B4
// export const GL_SAMPLES_ARB = 0x80A9
// export const GL_SAMPLES_EXT = 0x80A9
// export const GL_SAMPLES_PASSED = 0x8914
// export const GL_SAMPLES_PASSED_ARB = 0x8914
// export const GL_SAMPLES_SGIS = 0x80A9
// export const GL_SAMPLE_ALPHA_TO_COVERAGE = 0x809E
// export const GL_SAMPLE_ALPHA_TO_COVERAGE_ARB = 0x809E
// export const GL_SAMPLE_ALPHA_TO_MASK_EXT = 0x809E
// export const GL_SAMPLE_ALPHA_TO_MASK_SGIS = 0x809E
// export const GL_SAMPLE_ALPHA_TO_ONE = 0x809F
// export const GL_SAMPLE_ALPHA_TO_ONE_ARB = 0x809F
// export const GL_SAMPLE_ALPHA_TO_ONE_EXT = 0x809F
// export const GL_SAMPLE_ALPHA_TO_ONE_SGIS = 0x809F
// export const GL_SAMPLE_BUFFERS = 0x80A8
// export const GL_SAMPLE_BUFFERS_3DFX = 0x86B3
// export const GL_SAMPLE_BUFFERS_ARB = 0x80A8
// export const GL_SAMPLE_BUFFERS_EXT = 0x80A8
// export const GL_SAMPLE_BUFFERS_SGIS = 0x80A8
// export const GL_SAMPLE_COVERAGE = 0x80A0
// export const GL_SAMPLE_COVERAGE_ARB = 0x80A0
// export const GL_SAMPLE_COVERAGE_INVERT = 0x80AB
// export const GL_SAMPLE_COVERAGE_INVERT_ARB = 0x80AB
// export const GL_SAMPLE_COVERAGE_VALUE = 0x80AA
// export const GL_SAMPLE_COVERAGE_VALUE_ARB = 0x80AA
// export const GL_SAMPLE_MASK_EXT = 0x80A0
// export const GL_SAMPLE_MASK_INVERT_EXT = 0x80AB
// export const GL_SAMPLE_MASK_INVERT_SGIS = 0x80AB
// export const GL_SAMPLE_MASK_NV = 0x8E51
// export const GL_SAMPLE_MASK_SGIS = 0x80A0
// export const GL_SAMPLE_MASK_VALUE_EXT = 0x80AA
// export const GL_SAMPLE_MASK_VALUE_NV = 0x8E52
// export const GL_SAMPLE_MASK_VALUE_SGIS = 0x80AA
// export const GL_SAMPLE_PATTERN_EXT = 0x80AC
// export const GL_SAMPLE_PATTERN_SGIS = 0x80AC
// export const GL_SAMPLE_POSITION_NV = 0x8E50
// export const GL_SATURATE_BIT_ATI = 0x00000040
// export const GL_SCALAR_EXT = 0x87BE
// export const GL_SCALEBIAS_HINT_SGIX = 0x8322
// export const GL_SCALE_BY_FOUR_NV = 0x853F
// export const GL_SCALE_BY_ONE_HALF_NV = 0x8540
// export const GL_SCALE_BY_TWO_NV = 0x853E
// export const GL_SCISSOR_BIT = 0x00080000
// export const GL_SCISSOR_BOX = 0x0C10
// export const GL_SCISSOR_TEST = 0x0C11
// export const GL_SCREEN_COORDINATES_REND = 0x8490
// export const GL_SECONDARY_COLOR_ARRAY = 0x845E
// export const GL_SECONDARY_COLOR_ARRAY_BUFFER_BINDING = 0x889C
// export const GL_SECONDARY_COLOR_ARRAY_BUFFER_BINDING_ARB = 0x889C
// export const GL_SECONDARY_COLOR_ARRAY_EXT = 0x845E
// export const GL_SECONDARY_COLOR_ARRAY_LIST_IBM = 103077
// export const GL_SECONDARY_COLOR_ARRAY_LIST_STRIDE_IBM = 103087
// export const GL_SECONDARY_COLOR_ARRAY_POINTER = 0x845D
// export const GL_SECONDARY_COLOR_ARRAY_POINTER_EXT = 0x845D
// export const GL_SECONDARY_COLOR_ARRAY_SIZE = 0x845A
// export const GL_SECONDARY_COLOR_ARRAY_SIZE_EXT = 0x845A
// export const GL_SECONDARY_COLOR_ARRAY_STRIDE = 0x845C
// export const GL_SECONDARY_COLOR_ARRAY_STRIDE_EXT = 0x845C
// export const GL_SECONDARY_COLOR_ARRAY_TYPE = 0x845B
// export const GL_SECONDARY_COLOR_ARRAY_TYPE_EXT = 0x845B
// export const GL_SECONDARY_COLOR_NV = 0x852D
// export const GL_SECONDARY_INTERPOLATOR_ATI = 0x896D
// export const GL_SELECT = 0x1C02
// export const GL_SELECTION_BUFFER_POINTER = 0x0DF3
// export const GL_SELECTION_BUFFER_SIZE = 0x0DF4
// export const GL_SEPARABLE_2D = 0x8012
// export const GL_SEPARABLE_2D_EXT = 0x8012
// export const GL_SEPARATE_ATTRIBS = 0x8C8D
// export const GL_SEPARATE_ATTRIBS_EXT = 0x8C8D
// export const GL_SEPARATE_ATTRIBS_NV = 0x8C8D
// export const GL_SEPARATE_SPECULAR_COLOR = 0x81FA
// export const GL_SEPARATE_SPECULAR_COLOR_EXT = 0x81FA
// export const GL_SET = 0x150F
// export const GL_SGIS_detail_texture = 1
// export const GL_SGIS_fog_function = 1
// export const GL_SGIS_generate_mipmap = 1
// export const GL_SGIS_multisample = 1
// export const GL_SGIS_pixel_texture = 1
// export const GL_SGIS_point_line_texgen = 1
// export const GL_SGIS_point_parameters = 1
// export const GL_SGIS_sharpen_texture = 1
// export const GL_SGIS_texture4D = 1
// export const GL_SGIS_texture_border_clamp = 1
// export const GL_SGIS_texture_edge_clamp = 1
// export const GL_SGIS_texture_filter4 = 1
// export const GL_SGIS_texture_lod = 1
// export const GL_SGIS_texture_select = 1
// export const GL_SGIX_async = 1
// export const GL_SGIX_async_histogram = 1
// export const GL_SGIX_async_pixel = 1
// export const GL_SGIX_blend_alpha_minmax = 1
// export const GL_SGIX_calligraphic_fragment = 1
// export const GL_SGIX_clipmap = 1
// export const GL_SGIX_convolution_accuracy = 1
// export const GL_SGIX_depth_texture = 1
// export const GL_SGIX_flush_raster = 1
// export const GL_SGIX_fog_offset = 1
// export const GL_SGIX_fragment_lighting = 1
// export const GL_SGIX_framezoom = 1
// export const GL_SGIX_icc_texture = 1
// export const GL_SGIX_impact_pixel_texture = 1
// export const GL_SGIX_instruments = 1
// export const GL_SGIX_interlace = 1
// export const GL_SGIX_ir_instrument1 = 1
// export const GL_SGIX_list_priority = 1
// export const GL_SGIX_pixel_texture = 1
// export const GL_SGIX_pixel_tiles = 1
// export const GL_SGIX_polynomial_ffd = 1
// export const GL_SGIX_reference_plane = 1
// export const GL_SGIX_resample = 1
// export const GL_SGIX_scalebias_hint = 1
// export const GL_SGIX_shadow = 1
// export const GL_SGIX_shadow_ambient = 1
// export const GL_SGIX_sprite = 1
// export const GL_SGIX_subsample = 1
// export const GL_SGIX_tag_sample_buffer = 1
// export const GL_SGIX_texture_add_env = 1
// export const GL_SGIX_texture_coordinate_clamp = 1
// export const GL_SGIX_texture_lod_bias = 1
// export const GL_SGIX_texture_multi_buffer = 1
// export const GL_SGIX_texture_scale_bias = 1
// export const GL_SGIX_vertex_preclip = 1
// export const GL_SGIX_ycrcb = 1
// export const GL_SGI_color_matrix = 1
// export const GL_SGI_color_table = 1
// export const GL_SGI_texture_color_table = 1
// export const GL_SHADER_CONSISTENT_NV = 0x86DD
// export const GL_SHADER_OBJECT_ARB = 0x8B48
// export const GL_SHADER_OPERATION_NV = 0x86DF
// export const GL_SHADER_SOURCE_LENGTH = 0x8B88
// export const GL_SHADER_TYPE = 0x8B4F
// export const GL_SHADE_MODEL = 0x0B54
// export const GL_SHADING_LANGUAGE_VERSION = 0x8B8C
// export const GL_SHADING_LANGUAGE_VERSION_ARB = 0x8B8C
// export const GL_SHADOW_AMBIENT_SGIX = 0x80BF
// export const GL_SHADOW_ATTENUATION_EXT = 0x834E
// export const GL_SHARED_TEXTURE_PALETTE_EXT = 0x81FB
// export const GL_SHARPEN_TEXTURE_FUNC_POINTS_SGIS = 0x80B0
// export const GL_SHININESS = 0x1601
// export const GL_SHORT = 0x1402
// export const GL_SIGNED_ALPHA8_NV = 0x8706
// export const GL_SIGNED_ALPHA_NV = 0x8705
// export const GL_SIGNED_HILO16_NV = 0x86FA
// export const GL_SIGNED_HILO8_NV = 0x885F
// export const GL_SIGNED_HILO_NV = 0x86F9
// export const GL_SIGNED_IDENTITY_NV = 0x853C
// export const GL_SIGNED_INTENSITY8_NV = 0x8708
// export const GL_SIGNED_INTENSITY_NV = 0x8707
// export const GL_SIGNED_LUMINANCE8_ALPHA8_NV = 0x8704
// export const GL_SIGNED_LUMINANCE8_NV = 0x8702
// export const GL_SIGNED_LUMINANCE_ALPHA_NV = 0x8703
// export const GL_SIGNED_LUMINANCE_NV = 0x8701
// export const GL_SIGNED_NEGATE_NV = 0x853D
// export const GL_SIGNED_RGB8_NV = 0x86FF
// export const GL_SIGNED_RGB8_UNSIGNED_ALPHA8_NV = 0x870D
// export const GL_SIGNED_RGBA8_NV = 0x86FC
// export const GL_SIGNED_RGBA_NV = 0x86FB
// export const GL_SIGNED_RGB_NV = 0x86FE
// export const GL_SIGNED_RGB_UNSIGNED_ALPHA_NV = 0x870C
// export const GL_SINGLE_COLOR = 0x81F9
// export const GL_SINGLE_COLOR_EXT = 0x81F9
// export const GL_SLICE_ACCUM_SUN = 0x85CC
// export const GL_SLUMINANCE = 0x8C46
// export const GL_SLUMINANCE8 = 0x8C47
// export const GL_SLUMINANCE8_ALPHA8 = 0x8C45
// export const GL_SLUMINANCE8_ALPHA8_EXT = 0x8C45
// export const GL_SLUMINANCE8_EXT = 0x8C47
// export const GL_SLUMINANCE_ALPHA = 0x8C44
// export const GL_SLUMINANCE_ALPHA_EXT = 0x8C44
// export const GL_SLUMINANCE_EXT = 0x8C46
// export const GL_SMOOTH = 0x1D01
// export const GL_SMOOTH_LINE_WIDTH_GRANULARITY = 0x0B23
// export const GL_SMOOTH_LINE_WIDTH_RANGE = 0x0B22
// export const GL_SMOOTH_POINT_SIZE_GRANULARITY = 0x0B13
// export const GL_SMOOTH_POINT_SIZE_RANGE = 0x0B12
// export const GL_SOURCE0_ALPHA = 0x8588
// export const GL_SOURCE0_ALPHA_ARB = 0x8588
// export const GL_SOURCE0_ALPHA_EXT = 0x8588
// export const GL_SOURCE0_RGB = 0x8580
// export const GL_SOURCE0_RGB_ARB = 0x8580
// export const GL_SOURCE0_RGB_EXT = 0x8580
// export const GL_SOURCE1_ALPHA = 0x8589
// export const GL_SOURCE1_ALPHA_ARB = 0x8589
// export const GL_SOURCE1_ALPHA_EXT = 0x8589
// export const GL_SOURCE1_RGB = 0x8581
// export const GL_SOURCE1_RGB_ARB = 0x8581
// export const GL_SOURCE1_RGB_EXT = 0x8581
// export const GL_SOURCE2_ALPHA = 0x858A
// export const GL_SOURCE2_ALPHA_ARB = 0x858A
// export const GL_SOURCE2_ALPHA_EXT = 0x858A
// export const GL_SOURCE2_RGB = 0x8582
// export const GL_SOURCE2_RGB_ARB = 0x8582
// export const GL_SOURCE2_RGB_EXT = 0x8582
// export const GL_SOURCE3_ALPHA_NV = 0x858B
// export const GL_SOURCE3_RGB_NV = 0x8583
// export const GL_SPARE0_NV = 0x852E
// export const GL_SPARE0_PLUS_SECONDARY_COLOR_NV = 0x8532
// export const GL_SPARE1_NV = 0x852F
// export const GL_SPECULAR = 0x1202
// export const GL_SPHERE_MAP = 0x2402
// export const GL_SPOT_CUTOFF = 0x1206
// export const GL_SPOT_DIRECTION = 0x1204
// export const GL_SPOT_EXPONENT = 0x1205
// export const GL_SPRITE_AXIAL_SGIX = 0x814C
// export const GL_SPRITE_AXIS_SGIX = 0x814A
// export const GL_SPRITE_EYE_ALIGNED_SGIX = 0x814E
// export const GL_SPRITE_MODE_SGIX = 0x8149
// export const GL_SPRITE_OBJECT_ALIGNED_SGIX = 0x814D
// export const GL_SPRITE_SGIX = 0x8148
// export const GL_SPRITE_TRANSLATION_SGIX = 0x814B
// export const GL_SRC0_ALPHA = GL_SOURCE0_ALPHA
// export const GL_SRC0_RGB = GL_SOURCE0_RGB
// export const GL_SRC1_ALPHA = GL_SOURCE1_ALPHA
// export const GL_SRC1_RGB = GL_SOURCE1_RGB
// export const GL_SRC2_ALPHA = GL_SOURCE2_ALPHA
// export const GL_SRC2_RGB = GL_SOURCE2_RGB
// export const GL_SRC_ALPHA = 0x0302
// export const GL_SRC_ALPHA_SATURATE = 0x0308
// export const GL_SRC_COLOR = 0x0300
// export const GL_SRGB = 0x8C40
// export const GL_SRGB8 = 0x8C41
// export const GL_SRGB8_ALPHA8 = 0x8C43
// export const GL_SRGB8_ALPHA8_EXT = 0x8C43
// export const GL_SRGB8_EXT = 0x8C41
// export const GL_SRGB_ALPHA = 0x8C42
// export const GL_SRGB_ALPHA_EXT = 0x8C42
// export const GL_SRGB_EXT = 0x8C40
// export const GL_STACK_OVERFLOW = 0x0503
// export const GL_STACK_UNDERFLOW = 0x0504
// export const GL_STATIC_ATI = 0x8760
// export const GL_STATIC_COPY = 0x88E6
// export const GL_STATIC_COPY_ARB = 0x88E6
// export const GL_STATIC_DRAW = 0x88E4
// export const GL_STATIC_DRAW_ARB = 0x88E4
// export const GL_STATIC_READ = 0x88E5
// export const GL_STATIC_READ_ARB = 0x88E5
// export const GL_STENCIL = 0x1802
// export const GL_STENCIL_ATTACHMENT = 0x8D20
// export const GL_STENCIL_ATTACHMENT_EXT = 0x8D20
// export const GL_STENCIL_BACK_FAIL = 0x8801
// export const GL_STENCIL_BACK_FAIL_ATI = 0x8801
// export const GL_STENCIL_BACK_FUNC = 0x8800
// export const GL_STENCIL_BACK_FUNC_ATI = 0x8800
// export const GL_STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802
// export const GL_STENCIL_BACK_PASS_DEPTH_FAIL_ATI = 0x8802
// export const GL_STENCIL_BACK_PASS_DEPTH_PASS = 0x8803
// export const GL_STENCIL_BACK_PASS_DEPTH_PASS_ATI = 0x8803
// export const GL_STENCIL_BACK_REF = 0x8CA3
// export const GL_STENCIL_BACK_VALUE_MASK = 0x8CA4
// export const GL_STENCIL_BACK_WRITEMASK = 0x8CA5
// export const GL_STENCIL_BITS = 0x0D57
// export const GL_STENCIL_BUFFER = 0x8224
// export const GL_STENCIL_BUFFER_BIT = 0x00000400
// export const GL_STENCIL_CLEAR_TAG_VALUE_EXT = 0x88F3
// export const GL_STENCIL_CLEAR_VALUE = 0x0B91
// export const GL_STENCIL_FAIL = 0x0B94
// export const GL_STENCIL_FUNC = 0x0B92
// export const GL_STENCIL_INDEX = 0x1901
// export const GL_STENCIL_INDEX1 = 0x8D46
// export const GL_STENCIL_INDEX16 = 0x8D49
// export const GL_STENCIL_INDEX16_EXT = 0x8D49
// export const GL_STENCIL_INDEX1_EXT = 0x8D46
// export const GL_STENCIL_INDEX4 = 0x8D47
// export const GL_STENCIL_INDEX4_EXT = 0x8D47
// export const GL_STENCIL_INDEX8 = 0x8D48
// export const GL_STENCIL_INDEX8_EXT = 0x8D48
// export const GL_STENCIL_PASS_DEPTH_FAIL = 0x0B95
// export const GL_STENCIL_PASS_DEPTH_PASS = 0x0B96
// export const GL_STENCIL_REF = 0x0B97
// export const GL_STENCIL_TAG_BITS_EXT = 0x88F2
// export const GL_STENCIL_TEST = 0x0B90
// export const GL_STENCIL_TEST_TWO_SIDE_EXT = 0x8910
// export const GL_STENCIL_VALUE_MASK = 0x0B93
// export const GL_STENCIL_WRITEMASK = 0x0B98
// export const GL_STEREO = 0x0C33
// export const GL_STORAGE_CACHED_APPLE = 0x85BE
// export const GL_STORAGE_SHARED_APPLE = 0x85BF
// export const GL_STREAM_COPY = 0x88E2
// export const GL_STREAM_COPY_ARB = 0x88E2
// export const GL_STREAM_DRAW = 0x88E0
// export const GL_STREAM_DRAW_ARB = 0x88E0
// export const GL_STREAM_READ = 0x88E1
// export const GL_STREAM_READ_ARB = 0x88E1
// export const GL_STRICT_DEPTHFUNC_HINT_PGI = 0x1A216
// export const GL_STRICT_LIGHTING_HINT_PGI = 0x1A217
// export const GL_STRICT_SCISSOR_HINT_PGI = 0x1A218
// export const GL_SUBPIXEL_BITS = 0x0D50
// export const GL_SUBTRACT = 0x84E7
// export const GL_SUBTRACT_ARB = 0x84E7
// export const GL_SUB_ATI = 0x8965
// export const GL_SWIZZLE_STQ_ATI = 0x8977
// export const GL_SWIZZLE_STQ_DQ_ATI = 0x8979
// export const GL_SWIZZLE_STRQ_ATI = 0x897A
// export const GL_SWIZZLE_STRQ_DQ_ATI = 0x897B
// export const GL_SWIZZLE_STR_ATI = 0x8976
// export const GL_SWIZZLE_STR_DR_ATI = 0x8978
// export const GL_T = 0x2001
// export const GL_T2F_C3F_V3F = 0x2A2A
// export const GL_T2F_C4F_N3F_V3F = 0x2A2C
// export const GL_T2F_C4UB_V3F = 0x2A29
// export const GL_T2F_IUI_N3F_V2F_EXT = 0x81B3
// export const GL_T2F_IUI_N3F_V3F_EXT = 0x81B4
// export const GL_T2F_IUI_V2F_EXT = 0x81B1
// export const GL_T2F_IUI_V3F_EXT = 0x81B2
// export const GL_T2F_N3F_V3F = 0x2A2B
// export const GL_T2F_V3F = 0x2A27
// export const GL_T4F_C4F_N3F_V4F = 0x2A2D
// export const GL_T4F_V4F = 0x2A28
// export const GL_TABLE_TOO_LARGE = 0x8031
// export const GL_TABLE_TOO_LARGE_EXT = 0x8031
// export const GL_TANGENT_ARRAY_EXT = 0x8439
// export const GL_TANGENT_ARRAY_POINTER_EXT = 0x8442
// export const GL_TANGENT_ARRAY_STRIDE_EXT = 0x843F
// export const GL_TANGENT_ARRAY_TYPE_EXT = 0x843E
// export const GL_TEXCOORD1_BIT_PGI = 0x10000000
// export const GL_TEXCOORD2_BIT_PGI = 0x20000000
// export const GL_TEXCOORD3_BIT_PGI = 0x40000000
// export const GL_TEXCOORD4_BIT_PGI = 0x80000000
// export const GL_TEXTURE = 0x1702
// export const GL_TEXTURE0 = 0x84C0
// export const GL_TEXTURE0_ARB = 0x84C0
// export const GL_TEXTURE1 = 0x84C1
// export const GL_TEXTURE10 = 0x84CA
// export const GL_TEXTURE10_ARB = 0x84CA
// export const GL_TEXTURE11 = 0x84CB
// export const GL_TEXTURE11_ARB = 0x84CB
// export const GL_TEXTURE12 = 0x84CC
// export const GL_TEXTURE12_ARB = 0x84CC
// export const GL_TEXTURE13 = 0x84CD
// export const GL_TEXTURE13_ARB = 0x84CD
// export const GL_TEXTURE14 = 0x84CE
// export const GL_TEXTURE14_ARB = 0x84CE
// export const GL_TEXTURE15 = 0x84CF
// export const GL_TEXTURE15_ARB = 0x84CF
// export const GL_TEXTURE16 = 0x84D0
// export const GL_TEXTURE16_ARB = 0x84D0
// export const GL_TEXTURE17 = 0x84D1
// export const GL_TEXTURE17_ARB = 0x84D1
// export const GL_TEXTURE18 = 0x84D2
// export const GL_TEXTURE18_ARB = 0x84D2
// export const GL_TEXTURE19 = 0x84D3
// export const GL_TEXTURE19_ARB = 0x84D3
// export const GL_TEXTURE1_ARB = 0x84C1
// export const GL_TEXTURE2 = 0x84C2
// export const GL_TEXTURE20 = 0x84D4
// export const GL_TEXTURE20_ARB = 0x84D4
// export const GL_TEXTURE21 = 0x84D5
// export const GL_TEXTURE21_ARB = 0x84D5
// export const GL_TEXTURE22 = 0x84D6
// export const GL_TEXTURE22_ARB = 0x84D6
// export const GL_TEXTURE23 = 0x84D7
// export const GL_TEXTURE23_ARB = 0x84D7
// export const GL_TEXTURE24 = 0x84D8
// export const GL_TEXTURE24_ARB = 0x84D8
// export const GL_TEXTURE25 = 0x84D9
// export const GL_TEXTURE25_ARB = 0x84D9
// export const GL_TEXTURE26 = 0x84DA
// export const GL_TEXTURE26_ARB = 0x84DA
// export const GL_TEXTURE27 = 0x84DB
// export const GL_TEXTURE27_ARB = 0x84DB
// export const GL_TEXTURE28 = 0x84DC
// export const GL_TEXTURE28_ARB = 0x84DC
// export const GL_TEXTURE29 = 0x84DD
// export const GL_TEXTURE29_ARB = 0x84DD
// export const GL_TEXTURE2_ARB = 0x84C2
// export const GL_TEXTURE3 = 0x84C3
// export const GL_TEXTURE30 = 0x84DE
// export const GL_TEXTURE30_ARB = 0x84DE
// export const GL_TEXTURE31 = 0x84DF
// export const GL_TEXTURE31_ARB = 0x84DF
// export const GL_TEXTURE3_ARB = 0x84C3
// export const GL_TEXTURE4 = 0x84C4
// export const GL_TEXTURE4_ARB = 0x84C4
// export const GL_TEXTURE5 = 0x84C5
// export const GL_TEXTURE5_ARB = 0x84C5
// export const GL_TEXTURE6 = 0x84C6
// export const GL_TEXTURE6_ARB = 0x84C6
// export const GL_TEXTURE7 = 0x84C7
// export const GL_TEXTURE7_ARB = 0x84C7
// export const GL_TEXTURE8 = 0x84C8
// export const GL_TEXTURE8_ARB = 0x84C8
// export const GL_TEXTURE9 = 0x84C9
// export const GL_TEXTURE9_ARB = 0x84C9
// export const GL_TEXTURE_1D = 0x0DE0
// export const GL_TEXTURE_1D_ARRAY = 0x8C18
// export const GL_TEXTURE_1D_ARRAY_EXT = 0x8C18
// export const GL_TEXTURE_1D_BINDING_EXT = 0x8068
// export const GL_TEXTURE_1D_STACK_BINDING_MESAX = 0x875D
// export const GL_TEXTURE_1D_STACK_MESAX = 0x8759
// export const GL_TEXTURE_2D = 0x0DE1
// export const GL_TEXTURE_2D_ARRAY = 0x8C1A
// export const GL_TEXTURE_2D_ARRAY_EXT = 0x8C1A
// export const GL_TEXTURE_2D_BINDING_EXT = 0x8069
// export const GL_TEXTURE_2D_STACK_BINDING_MESAX = 0x875E
// export const GL_TEXTURE_2D_STACK_MESAX = 0x875A
// export const GL_TEXTURE_3D = 0x806F
// export const GL_TEXTURE_3D_BINDING_EXT = 0x806A
// export const GL_TEXTURE_3D_EXT = 0x806F
// export const GL_TEXTURE_4DSIZE_SGIS = 0x8136
// export const GL_TEXTURE_4D_BINDING_SGIS = 0x814F
// export const GL_TEXTURE_4D_SGIS = 0x8134
// export const GL_TEXTURE_ALPHA_SIZE = 0x805F
// export const GL_TEXTURE_ALPHA_SIZE_EXT = 0x805F
// export const GL_TEXTURE_ALPHA_TYPE = 0x8C13
// export const GL_TEXTURE_ALPHA_TYPE_ARB = 0x8C13
// export const GL_TEXTURE_APPLICATION_MODE_EXT = 0x834F
// export const GL_TEXTURE_BASE_LEVEL = 0x813C
// export const GL_TEXTURE_BASE_LEVEL_SGIS = 0x813C
// export const GL_TEXTURE_BINDING_1D = 0x8068
// export const GL_TEXTURE_BINDING_1D_ARRAY = 0x8C1C
// export const GL_TEXTURE_BINDING_1D_ARRAY_EXT = 0x8C1C
// export const GL_TEXTURE_BINDING_2D = 0x8069
// export const GL_TEXTURE_BINDING_2D_ARRAY = 0x8C1D
// export const GL_TEXTURE_BINDING_2D_ARRAY_EXT = 0x8C1D
// export const GL_TEXTURE_BINDING_3D = 0x806A
// export const GL_TEXTURE_BINDING_BUFFER_ARB = 0x8C2C
// export const GL_TEXTURE_BINDING_BUFFER_EXT = 0x8C2C
// export const GL_TEXTURE_BINDING_CUBE_MAP = 0x8514
// export const GL_TEXTURE_BINDING_CUBE_MAP_ARB = 0x8514
// export const GL_TEXTURE_BINDING_CUBE_MAP_EXT = 0x8514
// export const GL_TEXTURE_BINDING_RECTANGLE_ARB = 0x84F6
// export const GL_TEXTURE_BINDING_RECTANGLE_NV = 0x84F6
// export const GL_TEXTURE_BINDING_RENDERBUFFER_NV = 0x8E53
// export const GL_TEXTURE_BIT = 0x00040000
// export const GL_TEXTURE_BLUE_SIZE = 0x805E
// export const GL_TEXTURE_BLUE_SIZE_EXT = 0x805E
// export const GL_TEXTURE_BLUE_TYPE = 0x8C12
// export const GL_TEXTURE_BLUE_TYPE_ARB = 0x8C12
// export const GL_TEXTURE_BORDER = 0x1005
// export const GL_TEXTURE_BORDER_COLOR = 0x1004
// export const GL_TEXTURE_BORDER_VALUES_NV = 0x871A
// export const GL_TEXTURE_BUFFER_ARB = 0x8C2A
// export const GL_TEXTURE_BUFFER_DATA_STORE_BINDING_ARB = 0x8C2D
// export const GL_TEXTURE_BUFFER_DATA_STORE_BINDING_EXT = 0x8C2D
// export const GL_TEXTURE_BUFFER_EXT = 0x8C2A
// export const GL_TEXTURE_BUFFER_FORMAT_ARB = 0x8C2E
// export const GL_TEXTURE_BUFFER_FORMAT_EXT = 0x8C2E
// export const GL_TEXTURE_CLIPMAP_CENTER_SGIX = 0x8171
// export const GL_TEXTURE_CLIPMAP_DEPTH_SGIX = 0x8176
// export const GL_TEXTURE_CLIPMAP_FRAME_SGIX = 0x8172
// export const GL_TEXTURE_CLIPMAP_LOD_OFFSET_SGIX = 0x8175
// export const GL_TEXTURE_CLIPMAP_OFFSET_SGIX = 0x8173
// export const GL_TEXTURE_CLIPMAP_VIRTUAL_DEPTH_SGIX = 0x8174
// export const GL_TEXTURE_COLOR_TABLE_SGI = 0x80BC
// export const GL_TEXTURE_COLOR_WRITEMASK_SGIS = 0x81EF
// export const GL_TEXTURE_COMPARE_FAIL_VALUE_ARB = 0x80BF
// export const GL_TEXTURE_COMPARE_FUNC = 0x884D
// export const GL_TEXTURE_COMPARE_FUNC_ARB = 0x884D
// export const GL_TEXTURE_COMPARE_MODE = 0x884C
// export const GL_TEXTURE_COMPARE_MODE_ARB = 0x884C
// export const GL_TEXTURE_COMPARE_OPERATOR_SGIX = 0x819B
// export const GL_TEXTURE_COMPARE_SGIX = 0x819A
// export const GL_TEXTURE_COMPONENTS = 0x1003
// export const GL_TEXTURE_COMPRESSED = 0x86A1
// export const GL_TEXTURE_COMPRESSED_ARB = 0x86A1
// export const GL_TEXTURE_COMPRESSED_IMAGE_SIZE = 0x86A0
// export const GL_TEXTURE_COMPRESSED_IMAGE_SIZE_ARB = 0x86A0
// export const GL_TEXTURE_COMPRESSION_HINT = 0x84EF
// export const GL_TEXTURE_COMPRESSION_HINT_ARB = 0x84EF
// export const GL_TEXTURE_CONSTANT_DATA_SUNX = 0x81D6
// export const GL_TEXTURE_COORD_ARRAY = 0x8078
// export const GL_TEXTURE_COORD_ARRAY_BUFFER_BINDING = 0x889A
// export const GL_TEXTURE_COORD_ARRAY_BUFFER_BINDING_ARB = 0x889A
// export const GL_TEXTURE_COORD_ARRAY_COUNT_EXT = 0x808B
// export const GL_TEXTURE_COORD_ARRAY_EXT = 0x8078
// export const GL_TEXTURE_COORD_ARRAY_LIST_IBM = 103074
// export const GL_TEXTURE_COORD_ARRAY_LIST_STRIDE_IBM = 103084
// export const GL_TEXTURE_COORD_ARRAY_PARALLEL_POINTERS_INTEL = 0x83F8
// export const GL_TEXTURE_COORD_ARRAY_POINTER = 0x8092
// export const GL_TEXTURE_COORD_ARRAY_POINTER_EXT = 0x8092
// export const GL_TEXTURE_COORD_ARRAY_SIZE = 0x8088
// export const GL_TEXTURE_COORD_ARRAY_SIZE_EXT = 0x8088
// export const GL_TEXTURE_COORD_ARRAY_STRIDE = 0x808A
// export const GL_TEXTURE_COORD_ARRAY_STRIDE_EXT = 0x808A
// export const GL_TEXTURE_COORD_ARRAY_TYPE = 0x8089
// export const GL_TEXTURE_COORD_ARRAY_TYPE_EXT = 0x8089
// export const GL_TEXTURE_COORD_NV = 0x8C79
// export const GL_TEXTURE_CUBE_MAP = 0x8513
// export const GL_TEXTURE_CUBE_MAP_ARB = 0x8513
// export const GL_TEXTURE_CUBE_MAP_EXT = 0x8513
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_X_ARB = 0x8516
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_X_EXT = 0x8516
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Y_ARB = 0x8518
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Y_EXT = 0x8518
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Z_ARB = 0x851A
// export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Z_EXT = 0x851A
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_X_ARB = 0x8515
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_X_EXT = 0x8515
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_Y_ARB = 0x8517
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_Y_EXT = 0x8517
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_Z_ARB = 0x8519
// export const GL_TEXTURE_CUBE_MAP_POSITIVE_Z_EXT = 0x8519
// export const GL_TEXTURE_DEFORMATION_BIT_SGIX = 0x00000001
// export const GL_TEXTURE_DEFORMATION_SGIX = 0x8195
// export const GL_TEXTURE_DEPTH = 0x8071
// export const GL_TEXTURE_DEPTH_EXT = 0x8071
// export const GL_TEXTURE_DEPTH_SIZE = 0x884A
// export const GL_TEXTURE_DEPTH_SIZE_ARB = 0x884A
// export const GL_TEXTURE_DEPTH_TYPE = 0x8C16
// export const GL_TEXTURE_DEPTH_TYPE_ARB = 0x8C16
// export const GL_TEXTURE_DS_SIZE_NV = 0x871D
// export const GL_TEXTURE_DT_SIZE_NV = 0x871E
// export const GL_TEXTURE_ENV = 0x2300
// export const GL_TEXTURE_ENV_BIAS_SGIX = 0x80BE
// export const GL_TEXTURE_ENV_COLOR = 0x2201
// export const GL_TEXTURE_ENV_MODE = 0x2200
// export const GL_TEXTURE_FILTER4_SIZE_SGIS = 0x8147
// export const GL_TEXTURE_FILTER_CONTROL = 0x8500
// export const GL_TEXTURE_FILTER_CONTROL_EXT = 0x8500
// export const GL_TEXTURE_FLOAT_COMPONENTS_NV = 0x888C
// export const GL_TEXTURE_GEN_MODE = 0x2500
// export const GL_TEXTURE_GEN_Q = 0x0C63
// export const GL_TEXTURE_GEN_R = 0x0C62
// export const GL_TEXTURE_GEN_S = 0x0C60
// export const GL_TEXTURE_GEN_T = 0x0C61
// export const GL_TEXTURE_GEQUAL_R_SGIX = 0x819D
// export const GL_TEXTURE_GREEN_SIZE = 0x805D
// export const GL_TEXTURE_GREEN_SIZE_EXT = 0x805D
// export const GL_TEXTURE_GREEN_TYPE = 0x8C11
// export const GL_TEXTURE_GREEN_TYPE_ARB = 0x8C11
// export const GL_TEXTURE_HEIGHT = 0x1001
// export const GL_TEXTURE_HI_SIZE_NV = 0x871B
// export const GL_TEXTURE_INDEX_SIZE_EXT = 0x80ED
// export const GL_TEXTURE_INTENSITY_SIZE = 0x8061
// export const GL_TEXTURE_INTENSITY_SIZE_EXT = 0x8061
// export const GL_TEXTURE_INTENSITY_TYPE = 0x8C15
// export const GL_TEXTURE_INTENSITY_TYPE_ARB = 0x8C15
// export const GL_TEXTURE_INTERNAL_FORMAT = 0x1003
// export const GL_TEXTURE_LEQUAL_R_SGIX = 0x819C
// export const GL_TEXTURE_LIGHTING_MODE_HP = 0x8167
// export const GL_TEXTURE_LIGHT_EXT = 0x8350
// export const GL_TEXTURE_LOD_BIAS = 0x8501
// export const GL_TEXTURE_LOD_BIAS_EXT = 0x8501
// export const GL_TEXTURE_LOD_BIAS_R_SGIX = 0x8190
// export const GL_TEXTURE_LOD_BIAS_S_SGIX = 0x818E
// export const GL_TEXTURE_LOD_BIAS_T_SGIX = 0x818F
// export const GL_TEXTURE_LO_SIZE_NV = 0x871C
// export const GL_TEXTURE_LUMINANCE_SIZE = 0x8060
// export const GL_TEXTURE_LUMINANCE_SIZE_EXT = 0x8060
// export const GL_TEXTURE_LUMINANCE_TYPE = 0x8C14
// export const GL_TEXTURE_LUMINANCE_TYPE_ARB = 0x8C14
// export const GL_TEXTURE_MAG_FILTER = 0x2800
// export const GL_TEXTURE_MAG_SIZE_NV = 0x871F
// export const GL_TEXTURE_MATERIAL_FACE_EXT = 0x8351
// export const GL_TEXTURE_MATERIAL_PARAMETER_EXT = 0x8352
// export const GL_TEXTURE_MATRIX = 0x0BA8
// export const GL_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE
// export const GL_TEXTURE_MAX_CLAMP_R_SGIX = 0x836B
// export const GL_TEXTURE_MAX_CLAMP_S_SGIX = 0x8369
// export const GL_TEXTURE_MAX_CLAMP_T_SGIX = 0x836A
// export const GL_TEXTURE_MAX_LEVEL = 0x813D
// export const GL_TEXTURE_MAX_LEVEL_SGIS = 0x813D
// export const GL_TEXTURE_MAX_LOD = 0x813B
// export const GL_TEXTURE_MAX_LOD_SGIS = 0x813B
// export const GL_TEXTURE_MIN_FILTER = 0x2801
// export const GL_TEXTURE_MIN_LOD = 0x813A
// export const GL_TEXTURE_MIN_LOD_SGIS = 0x813A
// export const GL_TEXTURE_MULTI_BUFFER_HINT_SGIX = 0x812E
// export const GL_TEXTURE_NORMAL_EXT = 0x85AF
// export const GL_TEXTURE_POST_SPECULAR_HP = 0x8168
// export const GL_TEXTURE_PRE_SPECULAR_HP = 0x8169
// export const GL_TEXTURE_PRIORITY = 0x8066
// export const GL_TEXTURE_PRIORITY_EXT = 0x8066
// export const GL_TEXTURE_RECTANGLE_ARB = 0x84F5
// export const GL_TEXTURE_RECTANGLE_NV = 0x84F5
// export const GL_TEXTURE_RED_SIZE = 0x805C
// export const GL_TEXTURE_RED_SIZE_EXT = 0x805C
// export const GL_TEXTURE_RED_TYPE = 0x8C10
// export const GL_TEXTURE_RED_TYPE_ARB = 0x8C10
// export const GL_TEXTURE_RENDERBUFFER_DATA_STORE_BINDING_NV = 0x8E54
// export const GL_TEXTURE_RENDERBUFFER_NV = 0x8E55
// export const GL_TEXTURE_RESIDENT = 0x8067
// export const GL_TEXTURE_RESIDENT_EXT = 0x8067
// export const GL_TEXTURE_SHADER_NV = 0x86DE
// export const GL_TEXTURE_SHARED_SIZE = 0x8C3F
// export const GL_TEXTURE_SHARED_SIZE_EXT = 0x8C3F
// export const GL_TEXTURE_STACK_DEPTH = 0x0BA5
// export const GL_TEXTURE_STENCIL_SIZE = 0x88F1
// export const GL_TEXTURE_STENCIL_SIZE_EXT = 0x88F1
// export const GL_TEXTURE_SWIZZLE_A_EXT = 0x8E45
// export const GL_TEXTURE_SWIZZLE_B_EXT = 0x8E44
// export const GL_TEXTURE_SWIZZLE_G_EXT = 0x8E43
// export const GL_TEXTURE_SWIZZLE_RGBA_EXT = 0x8E46
// export const GL_TEXTURE_SWIZZLE_R_EXT = 0x8E42
// export const GL_TEXTURE_TOO_LARGE_EXT = 0x8065
// export const GL_TEXTURE_UNSIGNED_REMAP_MODE_NV = 0x888F
// export const GL_TEXTURE_WIDTH = 0x1000
// export const GL_TEXTURE_WRAP_Q_SGIS = 0x8137
// export const GL_TEXTURE_WRAP_R = 0x8072
// export const GL_TEXTURE_WRAP_R_EXT = 0x8072
// export const GL_TEXTURE_WRAP_S = 0x2802
// export const GL_TEXTURE_WRAP_T = 0x2803
// export const GL_TEXT_FRAGMENT_SHADER_ATI = 0x8200
// export const GL_TIME_ELAPSED_EXT = 0x88BF
// export const GL_TRACK_MATRIX_NV = 0x8648
// export const GL_TRACK_MATRIX_TRANSFORM_NV = 0x8649
// export const GL_TRANSFORM_BIT = 0x00001000
// export const GL_TRANSFORM_FEEDBACK_ATTRIBS_NV = 0x8C7E
// export const GL_TRANSFORM_FEEDBACK_BINDING_NV = 0x8E25
// export const GL_TRANSFORM_FEEDBACK_BUFFER = 0x8C8E
// export const GL_TRANSFORM_FEEDBACK_BUFFER_ACTIVE_NV = 0x8E24
// export const GL_TRANSFORM_FEEDBACK_BUFFER_BINDING = 0x8C8F
// export const GL_TRANSFORM_FEEDBACK_BUFFER_BINDING_EXT = 0x8C8F
// export const GL_TRANSFORM_FEEDBACK_BUFFER_BINDING_NV = 0x8C8F
// export const GL_TRANSFORM_FEEDBACK_BUFFER_EXT = 0x8C8E
// export const GL_TRANSFORM_FEEDBACK_BUFFER_MODE = 0x8C7F
// export const GL_TRANSFORM_FEEDBACK_BUFFER_MODE_EXT = 0x8C7F
// export const GL_TRANSFORM_FEEDBACK_BUFFER_MODE_NV = 0x8C7F
// export const GL_TRANSFORM_FEEDBACK_BUFFER_NV = 0x8C8E
// export const GL_TRANSFORM_FEEDBACK_BUFFER_PAUSED_NV = 0x8E23
// export const GL_TRANSFORM_FEEDBACK_BUFFER_SIZE = 0x8C85
// export const GL_TRANSFORM_FEEDBACK_BUFFER_SIZE_EXT = 0x8C85
// export const GL_TRANSFORM_FEEDBACK_BUFFER_SIZE_NV = 0x8C85
// export const GL_TRANSFORM_FEEDBACK_BUFFER_START = 0x8C84
// export const GL_TRANSFORM_FEEDBACK_BUFFER_START_EXT = 0x8C84
// export const GL_TRANSFORM_FEEDBACK_BUFFER_START_NV = 0x8C84
// export const GL_TRANSFORM_FEEDBACK_NV = 0x8E22
// export const GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 0x8C88
// export const GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN_EXT = 0x8C88
// export const GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN_NV = 0x8C88
// export const GL_TRANSFORM_FEEDBACK_RECORD_NV = 0x8C86
// export const GL_TRANSFORM_FEEDBACK_VARYINGS = 0x8C83
// export const GL_TRANSFORM_FEEDBACK_VARYINGS_EXT = 0x8C83
// export const GL_TRANSFORM_FEEDBACK_VARYINGS_NV = 0x8C83
// export const GL_TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH = 0x8C76
// export const GL_TRANSFORM_FEEDBACK_VARYING_MAX_LENGTH_EXT = 0x8C76
// export const GL_TRANSFORM_HINT_APPLE = 0x85B1
// export const GL_TRANSPOSE_COLOR_MATRIX = 0x84E6
// export const GL_TRANSPOSE_COLOR_MATRIX_ARB = 0x84E6
// export const GL_TRANSPOSE_CURRENT_MATRIX_ARB = 0x88B7
// export const GL_TRANSPOSE_MODELVIEW_MATRIX = 0x84E3
// export const GL_TRANSPOSE_MODELVIEW_MATRIX_ARB = 0x84E3
// export const GL_TRANSPOSE_NV = 0x862C
// export const GL_TRANSPOSE_PROGRAM_MATRIX_EXT = 0x8E2E
// export const GL_TRANSPOSE_PROJECTION_MATRIX = 0x84E4
// export const GL_TRANSPOSE_PROJECTION_MATRIX_ARB = 0x84E4
// export const GL_TRANSPOSE_TEXTURE_MATRIX = 0x84E5
// export const GL_TRANSPOSE_TEXTURE_MATRIX_ARB = 0x84E5
// export const GL_TRIANGLES = 0x0004
// export const GL_TRIANGLES_ADJACENCY_ARB = 0x000C
// export const GL_TRIANGLES_ADJACENCY_EXT = 0x000C
// export const GL_TRIANGLE_FAN = 0x0006
// export const GL_TRIANGLE_LIST_SUN = 0x81D7
// export const GL_TRIANGLE_MESH_SUN = 0x8615
// export const GL_TRIANGLE_STRIP = 0x0005
// export const GL_TRIANGLE_STRIP_ADJACENCY_ARB = 0x000D
// export const GL_TRIANGLE_STRIP_ADJACENCY_EXT = 0x000D
// export const GL_TYPE_RGBA_FLOAT_ATI = 0x8820
// export const GL_UNIFORM_BUFFER_BINDING_EXT = 0x8DEF
// export const GL_UNIFORM_BUFFER_EXT = 0x8DEE
// export const GL_UNPACK_ALIGNMENT = 0x0CF5
// export const GL_UNPACK_CLIENT_STORAGE_APPLE = 0x85B2
// export const GL_UNPACK_CMYK_HINT_EXT = 0x800F
// export const GL_UNPACK_CONSTANT_DATA_SUNX = 0x81D5
// export const GL_UNPACK_IMAGE_DEPTH_SGIS = 0x8133
// export const GL_UNPACK_IMAGE_HEIGHT = 0x806E
// export const GL_UNPACK_IMAGE_HEIGHT_EXT = 0x806E
// export const GL_UNPACK_LSB_FIRST = 0x0CF1
// export const GL_UNPACK_RESAMPLE_OML = 0x8985
// export const GL_UNPACK_RESAMPLE_SGIX = 0x842D
// export const GL_UNPACK_ROW_LENGTH = 0x0CF2
// export const GL_UNPACK_SKIP_IMAGES = 0x806D
// export const GL_UNPACK_SKIP_IMAGES_EXT = 0x806D
// export const GL_UNPACK_SKIP_PIXELS = 0x0CF4
// export const GL_UNPACK_SKIP_ROWS = 0x0CF3
// export const GL_UNPACK_SKIP_VOLUMES_SGIS = 0x8132
// export const GL_UNPACK_SUBSAMPLE_RATE_SGIX = 0x85A1
// export const GL_UNPACK_SWAP_BYTES = 0x0CF0
// export const GL_UNSIGNED_BYTE = 0x1401
// export const GL_UNSIGNED_BYTE_2_3_3_REV = 0x8362
// export const GL_UNSIGNED_BYTE_2_3_3_REV_EXT = 0x8362
// export const GL_UNSIGNED_BYTE_3_3_2 = 0x8032
// export const GL_UNSIGNED_BYTE_3_3_2_EXT = 0x8032
// export const GL_UNSIGNED_IDENTITY_NV = 0x8536
// export const GL_UNSIGNED_INT = 0x1405
// export const GL_UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B
// export const GL_UNSIGNED_INT_10F_11F_11F_REV_EXT = 0x8C3B
// export const GL_UNSIGNED_INT_10_10_10_2 = 0x8036
// export const GL_UNSIGNED_INT_10_10_10_2_EXT = 0x8036
// export const GL_UNSIGNED_INT_24_8 = 0x84FA
// export const GL_UNSIGNED_INT_24_8_EXT = 0x84FA
// export const GL_UNSIGNED_INT_24_8_NV = 0x84FA
// export const GL_UNSIGNED_INT_2_10_10_10_REV = 0x8368
// export const GL_UNSIGNED_INT_2_10_10_10_REV_EXT = 0x8368
// export const GL_UNSIGNED_INT_5_9_9_9_REV = 0x8C3E
// export const GL_UNSIGNED_INT_5_9_9_9_REV_EXT = 0x8C3E
// export const GL_UNSIGNED_INT_8_8_8_8 = 0x8035
// export const GL_UNSIGNED_INT_8_8_8_8_EXT = 0x8035
// export const GL_UNSIGNED_INT_8_8_8_8_REV = 0x8367
// export const GL_UNSIGNED_INT_8_8_8_8_REV_EXT = 0x8367
// export const GL_UNSIGNED_INT_8_8_S8_S8_REV_NV = 0x86DB
// export const GL_UNSIGNED_INT_S8_S8_8_8_NV = 0x86DA
// export const GL_UNSIGNED_INT_SAMPLER_1D = 0x8DD1
// export const GL_UNSIGNED_INT_SAMPLER_1D_ARRAY = 0x8DD6
// export const GL_UNSIGNED_INT_SAMPLER_1D_ARRAY_EXT = 0x8DD6
// export const GL_UNSIGNED_INT_SAMPLER_1D_EXT = 0x8DD1
// export const GL_UNSIGNED_INT_SAMPLER_2D = 0x8DD2
// export const GL_UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7
// export const GL_UNSIGNED_INT_SAMPLER_2D_ARRAY_EXT = 0x8DD7
// export const GL_UNSIGNED_INT_SAMPLER_2D_EXT = 0x8DD2
// export const GL_UNSIGNED_INT_SAMPLER_2D_RECT_EXT = 0x8DD5
// export const GL_UNSIGNED_INT_SAMPLER_3D = 0x8DD3
// export const GL_UNSIGNED_INT_SAMPLER_3D_EXT = 0x8DD3
// export const GL_UNSIGNED_INT_SAMPLER_BUFFER_EXT = 0x8DD8
// export const GL_UNSIGNED_INT_SAMPLER_CUBE = 0x8DD4
// export const GL_UNSIGNED_INT_SAMPLER_CUBE_EXT = 0x8DD4
// export const GL_UNSIGNED_INT_SAMPLER_RENDERBUFFER_NV = 0x8E58
// export const GL_UNSIGNED_INT_VEC2 = 0x8DC6
// export const GL_UNSIGNED_INT_VEC2_EXT = 0x8DC6
// export const GL_UNSIGNED_INT_VEC3 = 0x8DC7
// export const GL_UNSIGNED_INT_VEC3_EXT = 0x8DC7
// export const GL_UNSIGNED_INT_VEC4 = 0x8DC8
// export const GL_UNSIGNED_INT_VEC4_EXT = 0x8DC8
// export const GL_UNSIGNED_INVERT_NV = 0x8537
// export const GL_UNSIGNED_NORMALIZED = 0x8C17
// export const GL_UNSIGNED_NORMALIZED_ARB = 0x8C17
// export const GL_UNSIGNED_SHORT = 0x1403
// export const GL_UNSIGNED_SHORT_1_5_5_5_REV = 0x8366
// export const GL_UNSIGNED_SHORT_1_5_5_5_REV_EXT = 0x8366
// export const GL_UNSIGNED_SHORT_4_4_4_4 = 0x8033
// export const GL_UNSIGNED_SHORT_4_4_4_4_EXT = 0x8033
// export const GL_UNSIGNED_SHORT_4_4_4_4_REV = 0x8365
// export const GL_UNSIGNED_SHORT_4_4_4_4_REV_EXT = 0x8365
// export const GL_UNSIGNED_SHORT_5_5_5_1 = 0x8034
// export const GL_UNSIGNED_SHORT_5_5_5_1_EXT = 0x8034
// export const GL_UNSIGNED_SHORT_5_6_5 = 0x8363
// export const GL_UNSIGNED_SHORT_5_6_5_EXT = 0x8363
// export const GL_UNSIGNED_SHORT_5_6_5_REV = 0x8364
// export const GL_UNSIGNED_SHORT_5_6_5_REV_EXT = 0x8364
// export const GL_UNSIGNED_SHORT_8_8_APPLE = 0x85BA
// export const GL_UNSIGNED_SHORT_8_8_MESA = 0x85BA
// export const GL_UNSIGNED_SHORT_8_8_REV_APPLE = 0x85BB
// export const GL_UNSIGNED_SHORT_8_8_REV_MESA = 0x85BB
// export const GL_UPPER_LEFT = 0x8CA2
// export const GL_V2F = 0x2A20
// export const GL_V3F = 0x2A21
// export const GL_VALIDATE_STATUS = 0x8B83
// export const GL_VARIABLE_A_NV = 0x8523
// export const GL_VARIABLE_B_NV = 0x8524
// export const GL_VARIABLE_C_NV = 0x8525
// export const GL_VARIABLE_D_NV = 0x8526
// export const GL_VARIABLE_E_NV = 0x8527
// export const GL_VARIABLE_F_NV = 0x8528
// export const GL_VARIABLE_G_NV = 0x8529
// export const GL_VARIANT_ARRAY_EXT = 0x87E8
// export const GL_VARIANT_ARRAY_POINTER_EXT = 0x87E9
// export const GL_VARIANT_ARRAY_STRIDE_EXT = 0x87E6
// export const GL_VARIANT_ARRAY_TYPE_EXT = 0x87E7
// export const GL_VARIANT_DATATYPE_EXT = 0x87E5
// export const GL_VARIANT_EXT = 0x87C1
// export const GL_VARIANT_VALUE_EXT = 0x87E4
// export const GL_VECTOR_EXT = 0x87BF
// export const GL_VENDOR = 0x1F00
// export const GL_VERSION = 0x1F02
// export const GL_VERSION_1_1 = 1
// export const GL_VERSION_1_2 = 1
// export const GL_VERSION_1_3 = 1
// export const GL_VERSION_1_4 = 1
// export const GL_VERSION_1_5 = 1
// export const GL_VERSION_2_0 = 1
// export const GL_VERSION_2_1 = 1
// export const GL_VERSION_3_0 = 1
// export const GL_VERTEX23_BIT_PGI = 0x00000004
// export const GL_VERTEX4_BIT_PGI = 0x00000008
// export const GL_VERTEX_ARRAY = 0x8074
// export const GL_VERTEX_ARRAY_BINDING = 0x85B5
// export const GL_VERTEX_ARRAY_BINDING_APPLE = 0x85B5
// export const GL_VERTEX_ARRAY_BUFFER_BINDING = 0x8896
// export const GL_VERTEX_ARRAY_BUFFER_BINDING_ARB = 0x8896
// export const GL_VERTEX_ARRAY_COUNT_EXT = 0x807D
// export const GL_VERTEX_ARRAY_EXT = 0x8074
// export const GL_VERTEX_ARRAY_LIST_IBM = 103070
// export const GL_VERTEX_ARRAY_LIST_STRIDE_IBM = 103080
// export const GL_VERTEX_ARRAY_PARALLEL_POINTERS_INTEL = 0x83F5
// export const GL_VERTEX_ARRAY_POINTER = 0x808E
// export const GL_VERTEX_ARRAY_POINTER_EXT = 0x808E
// export const GL_VERTEX_ARRAY_RANGE_APPLE = 0x851D
// export const GL_VERTEX_ARRAY_RANGE_LENGTH_APPLE = 0x851E
// export const GL_VERTEX_ARRAY_RANGE_LENGTH_NV = 0x851E
// export const GL_VERTEX_ARRAY_RANGE_NV = 0x851D
// export const GL_VERTEX_ARRAY_RANGE_POINTER_APPLE = 0x8521
// export const GL_VERTEX_ARRAY_RANGE_POINTER_NV = 0x8521
// export const GL_VERTEX_ARRAY_RANGE_VALID_NV = 0x851F
// export const GL_VERTEX_ARRAY_RANGE_WITHOUT_FLUSH_NV = 0x8533
// export const GL_VERTEX_ARRAY_SIZE = 0x807A
// export const GL_VERTEX_ARRAY_SIZE_EXT = 0x807A
// export const GL_VERTEX_ARRAY_STORAGE_HINT_APPLE = 0x851F
// export const GL_VERTEX_ARRAY_STRIDE = 0x807C
// export const GL_VERTEX_ARRAY_STRIDE_EXT = 0x807C
// export const GL_VERTEX_ARRAY_TYPE = 0x807B
// export const GL_VERTEX_ARRAY_TYPE_EXT = 0x807B
// export const GL_VERTEX_ATTRIB_ARRAY0_NV = 0x8650
// export const GL_VERTEX_ATTRIB_ARRAY10_NV = 0x865A
// export const GL_VERTEX_ATTRIB_ARRAY11_NV = 0x865B
// export const GL_VERTEX_ATTRIB_ARRAY12_NV = 0x865C
// export const GL_VERTEX_ATTRIB_ARRAY13_NV = 0x865D
// export const GL_VERTEX_ATTRIB_ARRAY14_NV = 0x865E
// export const GL_VERTEX_ATTRIB_ARRAY15_NV = 0x865F
// export const GL_VERTEX_ATTRIB_ARRAY1_NV = 0x8651
// export const GL_VERTEX_ATTRIB_ARRAY2_NV = 0x8652
// export const GL_VERTEX_ATTRIB_ARRAY3_NV = 0x8653
// export const GL_VERTEX_ATTRIB_ARRAY4_NV = 0x8654
// export const GL_VERTEX_ATTRIB_ARRAY5_NV = 0x8655
// export const GL_VERTEX_ATTRIB_ARRAY6_NV = 0x8656
// export const GL_VERTEX_ATTRIB_ARRAY7_NV = 0x8657
// export const GL_VERTEX_ATTRIB_ARRAY8_NV = 0x8658
// export const GL_VERTEX_ATTRIB_ARRAY9_NV = 0x8659
// export const GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F
// export const GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING_ARB = 0x889F
// export const GL_VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622
// export const GL_VERTEX_ATTRIB_ARRAY_ENABLED_ARB = 0x8622
// export const GL_VERTEX_ATTRIB_ARRAY_INTEGER = 0x88FD
// export const GL_VERTEX_ATTRIB_ARRAY_INTEGER_NV = 0x88FD
// export const GL_VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A
// export const GL_VERTEX_ATTRIB_ARRAY_NORMALIZED_ARB = 0x886A
// export const GL_VERTEX_ATTRIB_ARRAY_POINTER = 0x8645
// export const GL_VERTEX_ATTRIB_ARRAY_POINTER_ARB = 0x8645
// export const GL_VERTEX_ATTRIB_ARRAY_SIZE = 0x8623
// export const GL_VERTEX_ATTRIB_ARRAY_SIZE_ARB = 0x8623
// export const GL_VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624
// export const GL_VERTEX_ATTRIB_ARRAY_STRIDE_ARB = 0x8624
// export const GL_VERTEX_ATTRIB_ARRAY_TYPE = 0x8625
// export const GL_VERTEX_ATTRIB_ARRAY_TYPE_ARB = 0x8625
// export const GL_VERTEX_BLEND_ARB = 0x86A7
// export const GL_VERTEX_CONSISTENT_HINT_PGI = 0x1A22B
// export const GL_VERTEX_DATA_HINT_PGI = 0x1A22A
// export const GL_VERTEX_ID_NV = 0x8C7B
// export const GL_VERTEX_PRECLIP_HINT_SGIX = 0x83EF
// export const GL_VERTEX_PRECLIP_SGIX = 0x83EE
// export const GL_VERTEX_PROGRAM_ARB = 0x8620
// export const GL_VERTEX_PROGRAM_BINDING_NV = 0x864A
// export const GL_VERTEX_PROGRAM_NV = 0x8620
// export const GL_VERTEX_PROGRAM_PARAMETER_BUFFER_NV = 0x8DA2
// export const GL_VERTEX_PROGRAM_POINT_SIZE = 0x8642
// export const GL_VERTEX_PROGRAM_POINT_SIZE_ARB = 0x8642
// export const GL_VERTEX_PROGRAM_POINT_SIZE_NV = 0x8642
// export const GL_VERTEX_PROGRAM_TWO_SIDE = 0x8643
// export const GL_VERTEX_PROGRAM_TWO_SIDE_ARB = 0x8643
// export const GL_VERTEX_PROGRAM_TWO_SIDE_NV = 0x8643
// export const GL_VERTEX_SHADER = 0x8B31
// export const GL_VERTEX_SHADER_ARB = 0x8B31
// export const GL_VERTEX_SHADER_BINDING_EXT = 0x8781
// export const GL_VERTEX_SHADER_EXT = 0x8780
// export const GL_VERTEX_SHADER_INSTRUCTIONS_EXT = 0x87CF
// export const GL_VERTEX_SHADER_INVARIANTS_EXT = 0x87D1
// export const GL_VERTEX_SHADER_LOCALS_EXT = 0x87D3
// export const GL_VERTEX_SHADER_LOCAL_CONSTANTS_EXT = 0x87D2
// export const GL_VERTEX_SHADER_OPTIMIZED_EXT = 0x87D4
// export const GL_VERTEX_SHADER_VARIANTS_EXT = 0x87D0
// export const GL_VERTEX_SOURCE_ATI = 0x8774
// export const GL_VERTEX_STATE_PROGRAM_NV = 0x8621
// export const GL_VERTEX_STREAM0_ATI = 0x876C
// export const GL_VERTEX_STREAM1_ATI = 0x876D
// export const GL_VERTEX_STREAM2_ATI = 0x876E
// export const GL_VERTEX_STREAM3_ATI = 0x876F
// export const GL_VERTEX_STREAM4_ATI = 0x8770
// export const GL_VERTEX_STREAM5_ATI = 0x8771
// export const GL_VERTEX_STREAM6_ATI = 0x8772
// export const GL_VERTEX_STREAM7_ATI = 0x8773
// export const GL_VERTEX_WEIGHTING_EXT = 0x8509
// export const GL_VERTEX_WEIGHT_ARRAY_EXT = 0x850C
// export const GL_VERTEX_WEIGHT_ARRAY_POINTER_EXT = 0x8510
// export const GL_VERTEX_WEIGHT_ARRAY_SIZE_EXT = 0x850D
// export const GL_VERTEX_WEIGHT_ARRAY_STRIDE_EXT = 0x850F
// export const GL_VERTEX_WEIGHT_ARRAY_TYPE_EXT = 0x850E
// export const GL_VIBRANCE_BIAS_NV = 0x8719
// export const GL_VIBRANCE_SCALE_NV = 0x8713
// export const GL_VIEWPORT = 0x0BA2
// export const GL_VIEWPORT_BIT = 0x00000800
// export const GL_WEIGHT_ARRAY_ARB = 0x86AD
// export const GL_WEIGHT_ARRAY_BUFFER_BINDING = 0x889E
// export const GL_WEIGHT_ARRAY_BUFFER_BINDING_ARB = 0x889E
// export const GL_WEIGHT_ARRAY_POINTER_ARB = 0x86AC
// export const GL_WEIGHT_ARRAY_SIZE_ARB = 0x86AB
// export const GL_WEIGHT_ARRAY_STRIDE_ARB = 0x86AA
// export const GL_WEIGHT_ARRAY_TYPE_ARB = 0x86A9
// export const GL_WEIGHT_SUM_UNITY_ARB = 0x86A6
// export const GL_WIDE_LINE_HINT_PGI = 0x1A222
// export const GL_WRAP_BORDER_SUN = 0x81D4
// export const GL_WRITE_ONLY = 0x88B9
// export const GL_WRITE_ONLY_ARB = 0x88B9
// export const GL_WRITE_PIXEL_DATA_RANGE_LENGTH_NV = 0x887A
// export const GL_WRITE_PIXEL_DATA_RANGE_NV = 0x8878
// export const GL_WRITE_PIXEL_DATA_RANGE_POINTER_NV = 0x887C
// export const GL_W_EXT = 0x87D8
// export const GL_XOR = 0x1506
// export const GL_X_EXT = 0x87D5
// export const GL_YCBCR_422_APPLE = 0x85B9
// export const GL_YCBCR_MESA = 0x8757
// export const GL_YCRCBA_SGIX = 0x8319
// export const GL_YCRCB_422_SGIX = 0x81BB
// export const GL_YCRCB_444_SGIX = 0x81BC
// export const GL_YCRCB_SGIX = 0x8318
// export const GL_Y_EXT = 0x87D6
// export const GL_ZERO = 0
// export const GL_ZERO_EXT = 0x87DD
// export const GL_ZOOM_X = 0x0D16
// export const GL_ZOOM_Y = 0x0D17
// export const GL_Z_EXT = 0x87D7





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

export const { 
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

export const { 
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

export const { 
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

export const { 
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
    glHint,
    glInvalidateBufferData,
    glInvalidateBufferSubData,
    glInvalidateFramebuffer,
    glInvalidateNamedFramebufferData,
    glGetString,
    glInvalidateSubFramebuffer,
    glInvalidateNamedFramebufferSubData,
    glInvalidateTexImage,
    glInvalidateTexSubImage,
    glIsBuffer,
    glIsEnabled,
    glIsEnabledi,
    glIsFramebuffer,
    glIsProgram,
    glIsProgramPipeline,
    glIsQuery,
    glIsRenderbuffer,
    glIsSampler,
    glIsShader,
    glIsSync,
    glIsTexture,
    glIsTransformFeedback,
    glIsVertexArray,
    glLineWidth,
    glLinkProgram,
    glLogicOp,
    glMapBuffer,
    glMapNamedBuffer,
    glMapBufferRange,
    glMapNamedBufferRange,
    glMemoryBarrier,
    glMemoryBarrierByRegion,
    glMinSampleShading,
    glMultiDrawArrays,
    glMultiDrawArraysIndirect,
    glMultiDrawElements,
    glMultiDrawElementsBaseVertex,
    glMultiDrawElementsIndirect,
    glReadBuffer,
    glNamedFramebufferReadBuffer,
    glRenderbufferStorage,
    glNamedRenderbufferStorage,
    glRenderbufferStorageMultisample,
    glNamedRenderbufferStorageMultisample,
    glObjectLabel,
    glObjectPtrLabel,
    glPatchParameteri
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

  glHint: {
    args: [GLenum, GLenum],
    returns: FFIType.void,
  },

  glInvalidateBufferData: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glInvalidateBufferSubData: {
    args: [GLuint, GLintptr, GLsizeiptr],
    returns: FFIType.void,
  },

  glInvalidateFramebuffer: {
    args: [GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glInvalidateNamedFramebufferData: {
    args: [GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glGetString: {
    args: [GLenum],
    returns: FFIType.ptr,
  },

  glInvalidateSubFramebuffer: {
    args: [GLenum, GLsizei, FFIType.ptr, GLint, GLint, GLint, GLint],
    returns: FFIType.void,
  },

  glInvalidateNamedFramebufferSubData: {
    args: [GLenum, GLsizei, FFIType.ptr, GLint, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glInvalidateTexImage: {
    args: [GLuint, GLint],
    returns: FFIType.void,
  },

  glInvalidateTexSubImage: {
    args: [GLuint, GLint, GLint, GLint, GLint, GLsizei, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glIsBuffer: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsEnabled: {
    args: [GLenum],
    returns: GLboolean,
  },

  glIsEnabledi: {
    args: [GLenum, GLuint],
    returns: GLboolean,
  },

  glIsFramebuffer: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsProgram: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsProgramPipeline: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsQuery: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsRenderbuffer: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsSampler: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsShader: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsSync: {
    args: [GLsync],
    returns: GLboolean,
  },

  glIsTexture: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsTransformFeedback: {
    args: [GLuint],
    returns: GLboolean,
  },

  glIsVertexArray: {
    args: [GLuint],
    returns: GLboolean,
  },

  glLineWidth: {
    args: [GLfloat],
    returns: FFIType.void,
  },

  glLinkProgram: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glLogicOp: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glMapBuffer: {
    args: [GLenum, GLenum],
    returns: FFIType.ptr,
  },

  glMapNamedBuffer: {
    args: [GLuint, GLenum],
    returns: FFIType.ptr,
  },

  glMapBufferRange: {
    args: [GLenum, GLintptr, GLsizeiptr, GLbitfield],
    returns: FFIType.ptr,
  },
  
  glMapNamedBufferRange: {
    args: [GLuint, GLintptr, GLsizeiptr, GLbitfield],
    returns: FFIType.ptr,
  },

  glMemoryBarrier: {
    args: [GLbitfield],
    returns: FFIType.void,
  },

  glMemoryBarrierByRegion: {
    args: [GLbitfield],
    returns: FFIType.void,
  },

  glMinSampleShading: {
    args: [GLfloat],
    returns: FFIType.void,
  },

  glMultiDrawArrays: {
    args: [GLenum, FFIType.ptr, FFIType.ptr, GLsizei],
    returns: FFIType.void,
  },

  glMultiDrawArraysIndirect: {
    args: [GLenum, FFIType.ptr, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glMultiDrawElements: {
    args: [GLenum, FFIType.ptr, GLenum, FFIType.ptr, GLsizei],
    returns: FFIType.void,
  },

  glMultiDrawElementsBaseVertex: {
    args: [GLenum, FFIType.ptr, GLenum, FFIType.ptr, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glMultiDrawElementsIndirect: {
    args: [GLenum, GLenum, FFIType.ptr, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glReadBuffer: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glNamedFramebufferReadBuffer: {
    args: [GLuint, GLenum],
    returns: FFIType.void,
  },

  glRenderbufferStorage: {
    args: [GLenum, GLenum, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glNamedRenderbufferStorage: {
    args: [GLuint, GLenum, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glRenderbufferStorageMultisample: {
    args: [GLenum, GLsizei, GLenum, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glNamedRenderbufferStorageMultisample: {
    args: [GLuint, GLsizei, GLenum, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glObjectLabel: {
    args: [GLenum, GLuint, GLsizei, FFIType.cstring],
    returns: FFIType.void,
  },

  glObjectPtrLabel: {
    args: [FFIType.ptr, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glPatchParameteri: {
    args: [GLenum, GLint],
    returns: FFIType.void,
  },

})

//* Bun FFI allows 64 function defs in one call, move onto the next.

export const { 
  symbols: {
    glPatchParameterfv,
    glPauseTransformFeedback,
    glPixelStoref,
    glPixelStorei,
    glPointParameterf,
    glPointParameteri,
    glPointParameterfv,
    glPointParameteriv,
    glPointSize,
    glPolygonMode,
    glPolygonOffset,
    glPopDebugGroup,
    glPrimitiveRestartIndex,
    glProgramBinary,
    glProgramParameteri,
    glProgramUniform1f,
    glProgramUniform2f,
    glProgramUniform3f,
    glProgramUniform4f,
    glProgramUniform1i,
    glProgramUniform2i,
    glProgramUniform3i,
    glProgramUniform4i,
    glProgramUniform1ui,
    glProgramUniform2ui,
    glProgramUniform3ui,
    glProgramUniform4ui,
    glProgramUniform1fv,
    glProgramUniform2fv,
    glProgramUniform3fv,
    glProgramUniform4fv,
    glProgramUniform1iv,
    glProgramUniform2iv,
    glProgramUniform3iv,
    glProgramUniform4iv,
    glProgramUniform1uiv,
    glProgramUniform2uiv,
    glProgramUniform3uiv,
    glProgramUniform4uiv,
    glProgramUniformMatrix2fv,
    glProgramUniformMatrix3fv,
    glProgramUniformMatrix4fv,
    glProgramUniformMatrix2x3fv,
    glProgramUniformMatrix3x2fv,
    glProgramUniformMatrix2x4fv,
    glProgramUniformMatrix4x2fv,
    glProgramUniformMatrix3x4fv,
    glProgramUniformMatrix4x3fv,
    glProvokingVertex,
    glPushDebugGroup,
    glQueryCounter,
    glReadPixels,
    glReadnPixels,
    glReleaseShaderCompiler,
    glResumeTransformFeedback,
    glSampleCoverage,
    glSampleMaski,
    glSamplerParameterf,
    glSamplerParameteri,
    glSamplerParameterfv,
    glSamplerParameteriv,
    glSamplerParameterIiv,
    glSamplerParameterIuiv,
    glScissor
  }
} = dlopen(path, {
  glPatchParameterfv: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glPauseTransformFeedback: {
    args: [],
    returns: FFIType.void,
  },

  glPixelStoref: {
    args: [GLenum, GLfloat],
    returns: FFIType.void,
  },
  
  glPixelStorei: {
    args: [GLenum, GLint],
    returns: FFIType.void,
  },

  glPointParameterf: {
    args: [GLenum, GLfloat],
    returns: FFIType.void,
  },

  glPointParameteri: {
    args: [GLenum, GLint],
    returns: FFIType.void,
  },

  glPointParameterfv: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glPointParameteriv: {
    args: [GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glPointSize: {
    args: [GLfloat],
    returns: FFIType.void,
  },

  glPolygonMode: {
    args: [GLenum, GLenum],
    returns: FFIType.void,
  },

  glPolygonOffset: {
    args: [GLfloat, GLfloat],
    returns: FFIType.void,
  },

  glPopDebugGroup: {
    args: [],
    returns: FFIType.void,
  },

  glPrimitiveRestartIndex: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glProgramBinary: {
    args: [GLuint, GLenum, FFIType.ptr, GLsizei],
    returns: FFIType.void,
  },

  glProgramParameteri: {
    args: [GLuint, GLenum, GLint],
    returns: FFIType.void,
  },

  glProgramUniform1f: {
    args: [GLuint, GLint, GLfloat],
    returns: FFIType.void,
  },

  glProgramUniform2f: {
    args: [GLuint, GLint, GLfloat, GLfloat],
    returns: FFIType.void,
  },

  glProgramUniform3f: {
    args: [GLuint, GLint, GLfloat, GLfloat, GLfloat],
    returns: FFIType.void,
  },

  glProgramUniform4f: {
    args: [GLuint, GLint, GLfloat, GLfloat, GLfloat, GLfloat],
    returns: FFIType.void,
  },

  glProgramUniform1i: {
    args: [GLuint, GLint, GLint],
    returns: FFIType.void,
  },

  glProgramUniform2i: {
    args: [GLuint, GLint, GLint, GLint],
    returns: FFIType.void,
  },

  glProgramUniform3i: {
    args: [GLuint, GLint, GLint, GLint, GLint],
    returns: FFIType.void,
  },

  glProgramUniform4i: {
    args: [GLuint, GLint, GLint, GLint, GLint, GLint],
    returns: FFIType.void,
  },

  glProgramUniform1ui: {
    args: [GLuint, GLint, GLuint],
    returns: FFIType.void,
  },

  glProgramUniform2ui: {
    args: [GLuint, GLint, GLuint, GLuint],
    returns: FFIType.void,
  },

  glProgramUniform3ui: {
    args: [GLuint, GLint, GLuint, GLuint, GLuint],
    returns: FFIType.void,
  },

  glProgramUniform4ui: {
    args: [GLuint, GLint, GLuint, GLuint, GLuint, GLuint],
    returns: FFIType.void,
  },

  glProgramUniform1fv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform2fv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform3fv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform4fv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform1iv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform2iv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform3iv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform4iv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform1uiv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform2uiv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform3uiv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniform4uiv: {
    args: [GLuint, GLint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniformMatrix2fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniformMatrix3fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniformMatrix4fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniformMatrix2x3fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },

  glProgramUniformMatrix3x2fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },
  
  glProgramUniformMatrix2x4fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },
  
  glProgramUniformMatrix4x2fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },
  
  glProgramUniformMatrix3x4fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },
  
  glProgramUniformMatrix4x3fv: {
    args: [GLuint, GLint, GLsizei, GLboolean, FFIType.ptr],
    returns: FFIType.void,
  },

  glProvokingVertex: {
    args: [GLenum],
    returns: FFIType.void,
  },

  glPushDebugGroup: {
    args: [GLenum, GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glQueryCounter: {
    args: [GLuint, GLenum],
    returns: FFIType.void,
  },

  glReadPixels: {
    args: [GLint, GLint, GLsizei, GLsizei, GLenum, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glReadnPixels: {
    args: [GLint, GLint, GLsizei, GLsizei, GLenum, GLenum, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },

  glReleaseShaderCompiler: {
    args: [],
    returns: FFIType.void,
  },

  glResumeTransformFeedback: {
    args: [],
    returns: FFIType.void,
  },

  glSampleCoverage: {
    args: [GLfloat, GLboolean],
    returns: FFIType.void,
  },

  glSampleMaski: {
    args: [GLuint, GLbitfield],
    returns: FFIType.void,
  },

  glSamplerParameterf: {
    args: [GLuint, GLenum, GLfloat],
    returns: FFIType.void,
  },

  glSamplerParameteri: {
    args: [GLuint, GLenum, GLint],
    returns: FFIType.void,
  },

  glSamplerParameterfv: {
    args: [GLuint, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glSamplerParameteriv: {
    args: [GLuint, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glSamplerParameterIiv: {
    args: [GLuint, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glSamplerParameterIuiv: {
    args: [GLuint, GLenum, FFIType.ptr],
    returns: FFIType.void,
  },

  glScissor: {
    args: [GLint, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },
  
})

//* Bun FFI allows 64 function defs in one call, move onto the next.

export const { 
  symbols: {
      glScissorArrayv,
      glScissorIndexed,
      glScissorIndexedv,
      glShaderBinary,
      glShaderSource,
      glShaderStorageBlockBinding,
      glStencilFunc,
      glStencilFuncSeparate,
      glStencilMask,
      glStencilMaskSeparate,
      glStencilOp,
      glStencilOpSeparate,
      //! was on glTexBuffer
  }
} = dlopen(path, {
  glScissorArrayv: {
    args: [GLuint, GLsizei, FFIType.ptr],
    returns: FFIType.void,
  },


  glScissorIndexed: {
    args: [GLuint, GLint, GLint, GLsizei, GLsizei],
    returns: FFIType.void,
  },

  glScissorIndexedv: {
    args: [GLuint, FFIType.ptr],
    returns: FFIType.void,
  },

  glShaderBinary: {
    args: [GLsizei, FFIType.ptr, GLenum, FFIType.ptr, GLsizei],
    returns: FFIType.void,
  },

  glShaderSource: {
    args: [GLuint, GLsizei, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },

  glShaderStorageBlockBinding: {
    args: [GLuint, GLuint, GLuint],
    returns: FFIType.void,
  },

  glStencilFunc: {
    args: [GLenum, GLint, GLuint],
    returns: FFIType.void,
  },

  glStencilFuncSeparate: {
    args: [GLenum, GLenum, GLint, GLuint],
    returns: FFIType.void,
  },

  glStencilMask: {
    args: [GLuint],
    returns: FFIType.void,
  },

  glStencilMaskSeparate: {
    args: [GLenum, GLuint],
    returns: FFIType.void,
  },

  glStencilOp: {
    args: [GLenum, GLenum, GLenum],
    returns: FFIType.void,
  },

  glStencilOpSeparate: {
    args: [GLenum, GLenum, GLenum, GLenum],
    returns: FFIType.void,
  },

})