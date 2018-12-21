import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appSeatsCanvas]'
})
export class SeatsCanvasDirective {

  canvas;
  @Input() showTakenSeats: object;
  @Input() rowsNumber: number;
  @Input() colsNumber: number;
  @Input() numberOfTickets: number = 0;
  @Output() onSeatChange: any = new EventEmitter<any>();

  choosenSeatsArray = [];
  spriteSeats = new Image();
  imageWidth;
  imageHeight;
  ctx;

  constructor(private el: ElementRef) {
    this.canvas = this.el.nativeElement;
  }

  ngOnChanges(changes) {
    //runs when input changes
    this.checkNumTicketsVsChoosenTickets();
  }
  ngOnInit() {

    this.ctx = this.canvas.getContext("2d");
    this.initWidthHeight();

    this.spriteSeats.src = "/assets/images/seatssprite.png"

    this.spriteSeats.onload = () => {
      this.drawSeats();
    };

    window.onresize = (event) => {
      this.initWidthHeight();
      this.drawSeats();
    };

    this.canvas.onclick = (e) => {
      if (this.numberOfTickets === 0){
        return;
      }

      let pos = this.windowToCanvas(e.clientX, e.clientY);
      let row = Math.floor(pos.y / this.imageHeight);
      let col = Math.floor(pos.x / this.imageWidth);

      if (this.showTakenSeats.hasOwnProperty(row + '-' + col)) {
        return;
      }

      if (this.checkIfChoosen(row, col)) {
        return;
      }

      this.checkNumTicketsVsChoosenTickets();
      this.choosenSeatsArray.push([row, col]);
      this.ctx.drawImage(this.spriteSeats, 0, 0, 30, 30, col * this.imageWidth, row * this.imageHeight, this.imageWidth, this.imageHeight);
      this.onSeatChange.emit(this.choosenSeatsArray);
    }
  }

  windowToCanvas(x, y) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: x - rect.left,
      y: y - rect.top
    };
  }

  checkIfChoosen(row, col) {
    if (this.choosenSeatsArray.length > 0) {
      let isChosen = false;
      this.choosenSeatsArray.forEach(element => {
        if (element[0] == row && element[1] == col) {
          //alert('choosen');
          isChosen = true;
        }
      });
      return isChosen;
    } else {
      return false;
    }
  }

  initWidthHeight() {
    this.canvas.width = 0.75 * window.innerWidth;
    this.canvas.height = 0.75 * window.innerHeight;

    this.imageHeight = this.canvas.height / this.rowsNumber;
    this.imageWidth = this.canvas.width / this.colsNumber;
  }

  checkNumTicketsVsChoosenTickets(){
    if (this.choosenSeatsArray.length >= this.numberOfTickets) {
      this.choosenSeatsArray.forEach(element => {
        this.ctx.drawImage(this.spriteSeats, 30, 0, 30, 30, element[1] * this.imageWidth, element[0] * this.imageHeight, this.imageWidth, this.imageHeight);
      });
      this.choosenSeatsArray = [];
    }
  }

  drawSeats() {
    for (let x = 0; x < this.rowsNumber; x++) {
      for (let y = 0; y < this.colsNumber; y++) {

        if (this.showTakenSeats.hasOwnProperty(x + '-' + y)) {
          //taken
          this.ctx.drawImage(this.spriteSeats, 60, 0, 30, 30, y * this.imageWidth, x * this.imageHeight, this.imageWidth, this.imageHeight);
        } else if (this.checkIfChoosen(x, y)) {
          this.ctx.drawImage(this.spriteSeats, 0, 0, 30, 30, y * this.imageWidth, x * this.imageHeight, this.imageWidth, this.imageHeight);
        } else {
          //not taken
          this.ctx.drawImage(this.spriteSeats, 30, 0, 30, 30, y * this.imageWidth, x * this.imageHeight, this.imageWidth, this.imageHeight);
        }
      }
    }
  }
}