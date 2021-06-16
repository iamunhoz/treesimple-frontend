let setup = (p5: any, canvasParentRef: any) => {
  let xyz = p5.createCanvas(500, 400).parent(canvasParentRef)
  //Calculation to center the canvas 
  let x = (p5.windowWidth - p5.width) / 2
  let y = (p5.windowHeight - p5.height) / 2
  xyz.position(x, y)
}

export {setup}