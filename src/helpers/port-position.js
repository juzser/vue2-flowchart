import { WIDTH_OF_NODE, HEIGHT_OF_TEXT_NODE, HEIGHT_OF_BUTTON_NODE } from '@/helpers/constant'

export const portPosition = {
  getPortTop,
  getPortRight,
  getPortBottom,
  getPortLeft
}

function getHeight (nodeType) {
  let height = 0
  switch (nodeType) {
    case 'button':
      height = HEIGHT_OF_BUTTON_NODE
      break
    default:
      height = HEIGHT_OF_TEXT_NODE
  }
  return height
}

function getPortTop (cx, cy, type) {
  let x, y
  let h = getHeight(type)
  x = cx
  y = cy - h / 2
  return [x, y]
}

function getPortRight (cx, cy, type) {
  let x, y
  let w = WIDTH_OF_NODE
  x = cx + w / 2
  y = cy
  return [x, y]
}

function getPortBottom (cx, cy, type) {
  let x, y
  let h = getHeight(type)
  x = cx
  y = cy + h / 2
  return [x, y]
}

function getPortLeft (cx, cy, type) {
  let x, y
  let w = WIDTH_OF_NODE
  x = cx - w / 2
  y = cy
  return [x, y]
}
