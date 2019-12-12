import { TestBed } from '@angular/core/testing';
import { StarShipsService } from './starships.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('StarshipsService', () => {
  let service: StarShipsService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
      providers: [StarShipsService]
  }));

  beforeEach(() => {
    service = TestBed.get(StarShipsService);
    httpMock = TestBed.get(HttpTestingController);
   });

   afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('should return an Observable<sharships[]>', () => {
  
      let url = '/api/starships/';
      const results = new Array<any>();
      results.push( {name : 'starship1', model:'starship1', MGLT:10,consumables:'1 day' });
      const data = {count:1, results:results};

      service.getStarShips(1).subscribe(response=> {
        expect(response.count).toBe(1);
        expect(response.results.length).toBe(1);
        expect(response.results).toEqual(data.results);
      });
  
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("GET");
      req.flush(data);
    }); 

    it('should return an url not found >', (done) => {
  
      let url = '/api/starships1/';
      const results = new Array<any>();
      results.push( {name : 'starship1', model:'starship1', MGLT:10,consumables:'1 day' });
      const data = {count:1, results:results};
      const emsg = 'deliberate 404 error';
      spyOn(service, 'handleError').and.callThrough();
      service.getStarShips(1).subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {

        expect(service.handleError).toHaveBeenCalled(); // check if executed

        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      });
  
      const req = httpMock.expectOne('/api/starships1/');
      expect(req.request.method).toBe("GET");

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
});
