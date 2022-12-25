import './style.css'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas width="600" height="600">
  </canvas>
`

type coOrds = {
  x: number,
  y:number
}

class Vector {
  x: number
  y: number
  constructor(x: number,y: number){
    this.x = x
    this.y = y
  }
  distanceX<v extends coOrds>(terminal: v): number{
    return this.x - terminal.x 
  }
  distanceY<v extends coOrds>(terminal: v): number{
    return terminal.y - this.y
  }
}

const terminal = new Vector(300, 50)
const unitX = new Vector(550, 50)
const unitY = new Vector(300, 550)

const lineFunc = (xOne: number, yOne: number, xTwo: number, yTwo: number): void => {
  ctx.beginPath()
  ctx.moveTo(xOne, yOne)
  ctx.lineTo(xTwo, yTwo)
  ctx.stroke()
}

const circleFunc = (beginX: number, beginY: number ,angle: number) => {
  ctx.beginPath()
  ctx.arc(beginX, beginY, 50, 0, angle)
  ctx.stroke()
}

const returnAngle = (distanceRatio: number ,format: 'degrees'| 'radians') => {
  return  format === 'degrees' ? Math.atan(distanceRatio) * (180/Math.PI) : Math.atan(distanceRatio)
}

const xAxis = () => {
  lineFunc(50, terminal.y, unitX.x, unitX.y)
}

const yAxis = () => {
  lineFunc(terminal.x, terminal.y, unitY.x, unitY.y)
}

const canvas = document.querySelector<HTMLCanvasElement | any>('canvas')

const ctx = canvas.getContext('2d')

ctx.fillStyle = "#ffff";
ctx.fillRect(50, 50, 500, 500);

xAxis()
yAxis()
// circleFunc()

const mousePositionX = (canvas: HTMLCanvasElement, event: MouseEvent ) => {
  return event.clientX - canvas.getBoundingClientRect().left
} 

const mousePositionY = (canvas: HTMLCanvasElement, event: MouseEvent) => {
  return event.clientY - canvas.getBoundingClientRect().top
}

const arcLength = (adjacent: number, opposite: number): number => {
  return Math.sqrt((adjacent*adjacent) + (opposite*opposite))
}



canvas?.addEventListener('click', (e: MouseEvent) => {

  const ray = new Vector(mousePositionX(canvas,e), mousePositionY(canvas, e))
  const xDistance = ray.distanceX(terminal)
  const inverseRay = new Vector(terminal.x - xDistance, ray.y)
  lineFunc(terminal.x, terminal.y, ray.x, ray.y)
  ctx.lineTo(ray.x, terminal.y)
  ctx.stroke()

  lineFunc(terminal.x, terminal.y, inverseRay.x, inverseRay.y)
  ctx.lineTo(inverseRay.x, terminal.y)
  ctx.stroke()




})


