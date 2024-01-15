class Canvas {

  static context;
  static height;
  static width;
  static midX;
  static midY;

  static initialize(){
    let canvas = document.getElementById("canvas");
    
    let canvasP = document.getElementById("canvasParent");
    let canvasPRect = canvasP.getBoundingClientRect();
    this.context = canvas.getContext("2d");
    canvas.width = canvasPRect.width;
    canvas.height = canvasPRect.height;

    this.height = canvasPRect.height;
    this.width = canvas.width;

    this.midX = this.width / 2;
    this.midY = this.height / 2;
  }

}

export default Canvas;
