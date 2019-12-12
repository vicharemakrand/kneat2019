import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
 import { Observable} from 'rxjs';

@Injectable()
export class StarShipsService  {

  constructor(private httpService: HttpClient) {
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getStarShips = (pageNumber: number): Observable<any> => {
    
    let url = '/api/starships/';
    if(pageNumber >1){
      url = url + '?page=' + pageNumber;
    }

   return this.httpService.get(url).pipe(
     map((e: Response) => {
       return e;
     }),
     catchError(this.handleError)
   );
 }
}
