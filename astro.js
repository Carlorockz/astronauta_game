import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const astroElem = document.querySelector("[data-astro]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const ASTRO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let astroFrame
let currentFrameTime
let yVelocity
export function setupAstro() {
  isJumping = false
  astroFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(astroElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateAstro(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getAstroRect() {
  return astroElem.getBoundingClientRect()
}
/*Imagen Pierde*/
export function setAstroLose() {
  astroElem.src = "imgs/astronauta-lose.png"
}

/*Imagen Fija*/
function handleRun(delta, speedScale) {
  if (isJumping) {
    astroElem.src = `imgs/astronauta-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    astroFrame = (astroFrame + 1) % ASTRO_FRAME_COUNT
    astroElem.src = `imgs/astronauta-run-${astroFrame}.png`
    currentFrameTime -= FRAME_TIME 
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(astroElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(astroElem, "--bottom") <= 0) {
    setCustomProperty(astroElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
