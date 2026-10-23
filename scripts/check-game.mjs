import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'
import { Script } from 'node:vm'
import assert from 'node:assert/strict'

const root = new URL('../', import.meta.url).pathname
const html = await readFile(join(root, 'index.html'), 'utf8')
const blocks = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter((match) => !/\bsrc\s*=/i.test(match[1]))
if (blocks.length !== 1) throw new Error(`Expected one inline game script; found ${blocks.length}`)
new Script(blocks[0][2], { filename: 'index.html:inline-script' })

const networkSource = html.match(/const ROAD_NETWORK\s*=\s*(\{[\s\S]*?\n\});/)
if (!networkSource) throw new Error('Road intersection network is missing')
const network = new Script(`(${networkSource[1]})`, { filename: 'ROAD_NETWORK' }).runInNewContext()
for (let route = 0; route < 20; route++) {
  assert.ok(network[route], `Route ${route} has no intersection links`)
  for (const turn of ['left', 'straight', 'right']) {
    assert.ok(Number.isInteger(network[route][turn]) && network[route][turn] >= 0 && network[route][turn] < 20,
      `Route ${route} has an invalid ${turn} link`)
  }
}
const inputCode = blocks[0][2].split('// input').at(-1) ?? ''
const turnInputConditions = inputCode.match(/if\(st==='play'[^)]*nextJunction-trip<\.85[^)]*\)/g) ?? []
if (turnInputConditions.length < 2 || turnInputConditions.some((condition) => condition.includes('roadRoute===0'))) {
  throw new Error('Turn input must be enabled for all connected routes')
}
if (!html.includes("const turns=[['شمال',130,62],['مستقيم',192,66],['يمين',258,66]]")) {
  throw new Error('Visible turn buttons are missing from the game HUD')
}

const config = await readFile(join(root, 'supabase-config.js'), 'utf8')
new Script(config, { filename: 'supabase-config.js' })

const playlist = JSON.parse(await readFile(join(root, 'audio/playlist.json'), 'utf8'))
if (!Array.isArray(playlist.tracks) || playlist.tracks.length === 0) throw new Error('Audio playlist is empty')
for (const track of playlist.tracks) {
  if (!track || typeof track.name !== 'string' || /[\\/]/.test(track.name)) throw new Error('Invalid audio track entry')
  await access(join(root, 'audio', track.name))
}
if (!html.includes("fetch('audio/playlist.json")) throw new Error('The game is not connected to the audio playlist')
console.log(`Game JavaScript valid; 20 road routes and ${playlist.tracks.length} audio track(s) found and connected.`)
