import { Component, OnInit, ViewChild } from '@angular/core';
 import { StapshipListComponent } from '../stapship-list/stapship-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild(StapshipListComponent,null) starshipsComponent: StapshipListComponent;

  constructor() { }

  ngOnInit() {
  }


  calculateStops(planetDistance:number) {
    this.starshipsComponent.getTotalStops(planetDistance);
  }

}
