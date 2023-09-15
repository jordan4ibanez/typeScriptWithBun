import { print } from "./helpers"

declare global {
  var reloadCount: number
  var failedReloads: number
}

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

export default {}