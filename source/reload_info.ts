import { print } from "./helpers"

declare global {
  var reloadCount: number
  var failedReloads: number
}

const global = globalThis

// Only assign to 0 if non-existent
global.reloadCount ??= -1
global.reloadCount += 1
global.failedReloads ??= -1
global.failedReloads += 1

export function reloadInfo(){
  print(`--------------------- 
Reloads:        ${reloadCount}
Failed Reloads: ${failedReloads}
---------------------`)
}

export function successfulRun() {
  global.failedReloads--
}

export function isReload(): boolean {
  return reloadCount > 0
}

export default {}