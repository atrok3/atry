class Canvas {

  static context;
  static height;
  static width;
  static midX;
  static midY;

  static activeElement = { };

  static elements = [
  ];


  static onClick = (event) => {
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let elements = this.elements;
    //console.log(x, elements[0].x, elements[0].x1);
    //console.log(y, elements[0].y, elements[0].y1);
    elements.forEach((element) => {
      if(x > element.x && x < element.x1 && y > element.y && y < element.y1) {
        this.activeElement = element;
        element.callBack();
      }
    });
  }

  static initialize(){
    let canvas = document.getElementById("canvas");
    
    //canvas.addEventListener("click", this.onClick);

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
