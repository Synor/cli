type TSNode = typeof import('ts-node')

export function registerTSNode() {
  const tsNode: TSNode = require('ts-node')
  tsNode.register({})
}
