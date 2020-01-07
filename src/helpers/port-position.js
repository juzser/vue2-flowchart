export const portPosition = {
  getPortTop,
  getPortRight,
  getPortBottom,
  getPortLeft
}

// height, width of port
const hp = 16
const wp = 16

function getPortTop (cx, cy, w, h) {
  let x, y
  x = cx - wp / 2
  y = cy - h / 2 - hp / 2
  return [x, y]
}

function getPortRight (cx, cy, w, h) {
  let x, y
  x = cx + w / 2 - wp / 2
  y = cy - hp / 2
  return [x, y]
}

function getPortBottom (cx, cy, w, h) {
  let x, y
  x = cx - wp / 2
  y = cy + h / 2 - hp / 2
  return [x, y]
}

function getPortLeft (cx, cy, w, h) {
  let x, y
  x = cx - w / 2 - wp / 2
  y = cy - hp / 2
  return [x, y]
}
