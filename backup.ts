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
* Exception: glGetError, glGetString, glGetShaderInfoLog
*
* glGetError is very important!

*/

//! END the no idea if this works section

export function getError(): number {
  return glGetError()
}

export function hint(target: number, mode: number) {
  glHint(target, mode)
}

export function invalidateBufferData(buffer: number) {
  glInvalidateBufferData(buffer)
}

export function invalidateBufferSubData(buffer: number, offset: number, length: number) {
  glInvalidateBufferSubData(buffer, offset, length)
}

export function invalidateFramebuffer(target: number, numAttachments: number, attachments: number[]) {
  let attachmentsPointer = new Uint32Array(attachments)
  glInvalidateFramebuffer(target, numAttachments, attachmentsPointer)
}

export function invalidateNamedFramebufferData(framebuffer: number, numAttachments: number, attachments: number[]) {
  let attachmentsPointer = new Uint32Array(attachments)
  glInvalidateNamedFramebufferData(framebuffer, numAttachments, attachmentsPointer)
}

export function getString(name: number): string {
  let stringPointer = glGetString(name)
  if (stringPointer == null) {return "NULL"}
  return new CString(stringPointer).toString()
}

export function invalidateSubFramebuffer(target: number, numAttachments: number, attachments: number[], x: number, y: number, width: number, height: number) {
  let attachmentsPointer = new Uint32Array(attachments)
  glInvalidateSubFramebuffer(target, numAttachments, attachmentsPointer, x, y, width, height)
}

export function invalidateNamedFramebufferSubData(framebuffer: number, numAttachments: number, attachments: number[], x: number, y: number, width: number, height: number) {
  let attachmentsPointer = new Uint32Array(attachments)
  glInvalidateNamedFramebufferSubData(framebuffer, numAttachments, attachmentsPointer, x, y, width, height)
}

export function invalidateTexImage(texture: number, level: number) {
  glInvalidateTexImage(texture, level)
}

export function invalidateTexSubImage(texture: number, level: number, xoffset: number, yoffset: number, zoffset: number, width: number, height: number, depth: number) {
  glInvalidateTexSubImage(texture, level, xoffset, yoffset, zoffset, width, height, depth)
}

export function isBuffer(buffer: number): boolean {
  return glIsBuffer(buffer)
}

export function isEnabled(cap: number): boolean {
  return glIsEnabled(cap)
}

export function isEnabledi(cap: number, index: number): boolean {
  return glIsEnabledi(cap, index)
}

export function isFramebuffer(framebuffer: number): boolean {
  return glIsFramebuffer(framebuffer)
}

export function isProgram(program: number): boolean {
  return glIsProgram(program)
}

export function isProgramPipeline(pipeline: number): boolean {
  return glIsProgramPipeline(pipeline)
}

export function isQuery(id: number): boolean {
  return glIsQuery(id)
}

export function isRenderbuffer(renderbuffer: number): boolean {
  return glIsRenderbuffer(renderbuffer)
}

export function isSampler(id: number): boolean {
  return glIsSampler(id)
}

export function isShader(shader: number): boolean {
  return glIsShader(shader)
}

export function isSync(sync: number): boolean {
  return glIsSync(sync)
}

export function isTexture(texture: number): boolean {
  return glIsTexture(texture)
}

export function isTransformFeedback(id: number): boolean {
  return glIsTransformFeedback(id)
}

export function isVertexArray(array: number): boolean {
  return glIsVertexArray(array)
}

export function lineWidth(width: number) {
  glLineWidth(width)
}

export function linkProgram(program: number) {
  glLinkProgram(program)
}

export function logicOp(opcode: number) {
  glLogicOp(opcode)
}

export function mapBuffer(target: number, access: number): FFIType.ptr | null {
  return glMapBuffer(target, access)
}

export function mapNamedBuffer(buffer: number, access: number): FFIType.ptr | null {
  return glMapNamedBuffer(buffer, access)
}

export function mapBufferRange(target: number, offset: number, length: number, access: number): FFIType.ptr | null {
  glMapBufferRange(target, offset, length, access)
}

export function mapNamedBufferRange(buffer: number, offset: number, length: number, access: number): FFIType.ptr | null {
  glMapNamedBufferRange(buffer, offset, length, access)
}

export function memoryBarrier(barriers: number) {
  glMemoryBarrier(barriers)
}

export function memoryBarrierByRegion(barriers: number) {
  glMemoryBarrierByRegion(barriers)
}

export function minSampleShading(value: number) {
  glMinSampleShading(value)
}

export function multiDrawArrays(mode: number, first: number[], count: number[], drawcount: number) {
  let firstPointer = new Int32Array(first)
  let countPointer = new Uint32Array(count)
  glMultiDrawArrays(mode, firstPointer, countPointer, drawcount)
}

export function multiDrawArraysIndirect(mode: number, indirect: TypedArray, drawcount: number, stride: number) {
  glMultiDrawArraysIndirect(mode, indirect, drawcount, stride)
}

export function multiDrawElements(mode: number, count: number[], type: number, indices: TypedArray, drawcount: number) {
  let countPointer = new Uint32Array(count)
  glMultiDrawElements(mode, countPointer, type, indices, drawcount)
}

export function multiDrawElementsBaseVertex(mode: number, count: number[], type: number, indices: TypedArray, drawcount: number, basevertex: number[]) {
  let countPointer = new Uint32Array(count)
  let basevertexPointer = new Int32Array(basevertex)
  glMultiDrawElementsBaseVertex(mode, countPointer, type, indices, drawcount, basevertexPointer)
}

export function multiDrawElementsIndirect(mode: number, type: number, indirect: TypedArray, drawcount: number, stride: number) {
  glMultiDrawElementsIndirect(mode, type, indirect, drawcount, stride)
}

export function readBuffer(mode: number) {
  glReadBuffer(mode)
}

export function namedFramebufferReadBuffer(framebuffer: number, mode: number) {
  glNamedFramebufferReadBuffer(framebuffer, mode)
}

export function renderbufferStorage(target: number, internalformat: number, width: number, height: number) {
  glRenderbufferStorage(target, internalformat, width, height)
}

export function namedRenderbufferStorage(renderbuffer: number, internalformat: number, width: number, height: number) {
  glNamedRenderbufferStorage(renderbuffer, internalformat, width, height)
}

export function renderbufferStorageMultisample(target: number, samples: number, internalformat: number, width: number, height: number) {
  glRenderbufferStorageMultisample(target, samples, internalformat, width, height)
}

export function namedRenderbufferStorageMultisample(renderbuffer: number, samples: number, internalformat: number, width: number, height: number) {
  glNamedRenderbufferStorageMultisample(renderbuffer, samples, internalformat, width, height)
}

export function objectLabel(identifier: number, name: number, length: number, label: string) {
  //!FIXME: this might randomly crash, need better solution
  let labelPointer = toBuffer(label)
  glObjectLabel(identifier, name, length, labelPointer)
}

export function objectPtrLabel(ptr: FFIType.ptr, length: number, label: string) {
  //!FIXME: this might randomly crash, need better solution
  let labelPointer = toBuffer(label)
  glObjectPtrLabel(ptr, length, labelPointer)
}

export function patchParameteri(pname: number, value: number) {
  glPatchParameteri(pname, value)
}

export function patchParameterfv(pname: number, values: number[]) {
  let valuesPointer = new Float32Array(values)
  glPatchParameterfv(pname, valuesPointer)
}

export function pauseTransformFeedback() {
  glPauseTransformFeedback()
}

