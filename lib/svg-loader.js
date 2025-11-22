import fs from 'fs'
import path from 'path'

// Read SVG files from the assets directory
export function loadSvg(svgName) {
  const svgPath = path.join(process.cwd(), 'assets', `${svgName}.svg`)
  try {
    return fs.readFileSync(svgPath, 'utf8')
  } catch (error) {
    console.error(`Error loading SVG ${svgName}:`, error)
    return ''
  }
}

// Pre-load all SVG files
export const One = loadSvg('one')
export const Two = loadSvg('two')
export const Three = loadSvg('three')
export const Four = loadSvg('four')
export const Five = loadSvg('five')
export const Six = loadSvg('six')
export const Seven = loadSvg('seven')
export const Eight = loadSvg('eight')
export const Nine = loadSvg('nine')
export const Ten = loadSvg('ten')
export const Arrow = loadSvg('arrow')


