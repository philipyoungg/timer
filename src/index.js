import Timer from './Timer'

const c = document.querySelector('canvas')
c.width = 200
c.height = 200
c.style.width = '100px'
c.style.height = '100px'
const ctx = c.getContext('2d')
ctx.scale(2, 2)

const indicatorSize = 5
const indicatorColor = 'red'
const placeholderColor = 'rgba(0,0,0,0.1)'

const timeText = (ctx, value) => {
  ctx.lineWidth = indicatorSize
  ctx.font = 'bold 21px Arial'
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(value, c.width / 4, c.height / 4)
}

const placeholder = (ctx) => {
  ctx.lineWidth = indicatorSize
  ctx.strokeStyle = placeholderColor
  ctx.beginPath()
  ctx.arc(c.width / 4, c.height / 4, (c.width / 4) - indicatorSize, 0, Math.PI * 2)
  ctx.stroke()
}

const timeIndicator = (ctx, value) => {
  const start = Math.PI * 1.5
  ctx.strokeStyle = indicatorColor
  ctx.beginPath()
  ctx.arc(c.width / 4, c.height / 4, (c.width / 4) - indicatorSize, start, start + (Math.PI * 2 * value))
  ctx.stroke()
}


placeholder(ctx)
timeText(ctx, '-')

const padToTwo = (num) =>
  num < 10 ? `0${num}` : num

const updateView = (status) => {
  const ml = Math.floor(status.secondLeft / 60)
  const sl = status.secondLeft % 60
  ctx.clearRect(0, 0, c.width, c.height)
  placeholder(ctx)
  timeText(ctx, `${padToTwo(ml)}:${padToTwo(sl)}`)
  timeIndicator(ctx, status.progress)
}

const time = new Timer(1500, {
  onUpdate: updateView,
})

time.init()

document.getElementById('pause').onclick = () => time.pause()

document.getElementById('play').onclick = () => time.play()

document.getElementById('reset').onclick = () => time.reset()
