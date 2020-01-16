export const portPosition = {
  getPortTop,
  getPortRight,
  getPortBottom,
  getPortLeft
}

function getPortTop (cx, cy, w, h) {
  let x, y
  x = cx
  y = cy - h / 2
  return [x, y]
}

function getPortRight (cx, cy, w, h) {
  let x, y
  x = cx + w / 2
  y = cy
  return [x, y]
}

function getPortBottom (cx, cy, w, h) {
  let x, y
  x = cx
  y = cy + h / 2
  return [x, y]
}

function getPortLeft (cx, cy, w, h) {
  let x, y
  x = cx - w / 2
  y = cy
  return [x, y]
}
