import { Component, OnInit } from '@angular/core';
import { StarShipsService } from '../services/starships.service';
import { StarShipVM } from '../viewModels/starship.vm';
import { AppConstants } from '../common/app.constants';

@Component({
  selector: 'app-stapship-list',
  templateUrl: './stapship-list.component.html',
  styleUrls: ['./stapship-list.component.less']
})
export class StapshipListComponent implements OnInit {

  starships: Array<StarShipVM>;
  totalCount: number;
  pageNumber: number;
  planetDistance: number;

  constructor(private starShipsService:StarShipsService) { }

  ngOnInit() {
    this.starships= new Array<StarShipVM>();
    this.totalCount = 0;
    this.pageNumber = 1;
  }

  onPageChange = (pageNumber) => {
    this.pageNumber = pageNumber;
    this.getTotalStops(this.planetDistance);    
  }

  getTotalStops =(planetDistance: number): void => {
    this.planetDistance = planetDistance;
    this.starShipsService.getStarShips(this.pageNumber).subscribe(
         (response: any) => {
            this.starships = this.calculateStops(planetDistance,response.results);
            this.totalCount = response.count;
         },
         (error: any) => {
         }
     );
  }

  private calculateStops = (planetDistance : number,starshipsList :Array<any>) : Array<StarShipVM> => {

    return starshipsList.map(starship => {
      let starshipVM = new StarShipVM();
      starshipVM.name = starship.name;
      starshipVM.model = starship.model;
      starshipVM.mglt = starship.MGLT;
      starshipVM.consumables = starship.consumables;
      starshipVM.stopsRequired = (starship.MGLT == AppConstants.unknown || starship.consumables == AppConstants.unknown)
            ? AppConstants.unknown
            : Math.floor((planetDistance / Number(starship.MGLT)) / this.GetConsumablesInHour(starship.consumables)).toString();
      return starshipVM;
    });

   }

   private GetConsumablesInHour = (consumables: string) : number => {
    var result = 0;
    var splitArray = consumables.split(' ');
    switch (splitArray[1]) {
        case "days":
        case "day":
            {
                result = Number(splitArray[0]) * 24;
                break;
            }
        case "weeks":
        case "week":
            {
                result = Number(splitArray[0]) * 24 * 7;
              break;
            }
        case "months":
        case "month":
            {
                result = Number(splitArray[0]) * 24 * 30;
              break;
            }
        case "years":
        case "year":
            {
                result = Number(splitArray[0]) * 24 * 365;
               break;
            }
    }

    return result;
}

}
