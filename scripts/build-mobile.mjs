import { cp, mkdir, readFile, rm, access } from 'node:fs/promises'
import { join } from 'node:path'

const root = new URL('../', import.meta.url).pathname
const out = join(root, 'www')
await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })
for (const file of ['index.html', 'supabase-config.js']) {
  await access(join(root, file))
  await cp(join(root, file), join(out, file))
}
const playlist = JSON.parse(await readFile(join(root, 'audio/playlist.json'), 'utf8'))
for (const track of playlist.tracks ?? []) await access(join(root, 'audio', track.name))
await cp(join(root, 'audio'), join(out, 'audio'), { recursive: true })
console.log(`Prepared Android web assets with ${playlist.tracks?.length ?? 0} audio track(s).`)
