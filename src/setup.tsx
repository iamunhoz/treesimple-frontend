
import p5Types from "p5"

let setup = (p5: p5Types, canvasParentRef: Element) => {
  let xyz = p5.createCanvas(500, 400).parent(canvasParentRef)
  //Calculation to center the canvas 
  let x = (p5.windowWidth - p5.width) / 2
  let y = (p5.windowHeight - p5.height) / 2
  xyz.position(x, y)
  let inputer = p5.createInput('type something')
  inputer.position((p5.windowWidth - inputer.width) / 2, 0, 'fixed')
}

export {setup}