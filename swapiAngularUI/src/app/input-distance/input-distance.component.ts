import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-input-distance',
  templateUrl: './input-distance.component.html',
  styleUrls: ['./input-distance.component.less']
})
export class InputDistanceComponent implements OnInit {

  planetDistance? : number;
  @Output() calculateStops = new EventEmitter<number>();

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.planetDistance = null;
  }

  calculate = () : void => {
    if(!this.validate()){
       return ;
    }
    this.calculateStops.emit(this.planetDistance);
  }

  validate = () : boolean => {
    let result = false;
    let message ='';
    
    if(this.planetDistance == null){
        message ='The distance is required for calculation.';
    }
    else if(this.planetDistance<=0){
      message ='The distance must be greater than zero.';
    }
    else if(Number.isNaN(this.planetDistance)){
      message ='The distance must be numeric.';
    }

    if(message.length >0){
      this.toastrService.error(message,'Validation Messages');
    }
    else{
      result = true;
    }

    return result;

  }
}
