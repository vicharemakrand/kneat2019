import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { StapshipListComponent } from './stapship-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarShipsService } from '../services/starships.service';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
 
describe('StapshipListComponent', () => {
  let component: StapshipListComponent;
  let fixture: ComponentFixture<StapshipListComponent>;
  let starShipsService: StarShipsService;
  let debugElement: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule,HttpClientModule ],
      declarations: [ StapshipListComponent ],
      providers:[StarShipsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StapshipListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    starShipsService = debugElement.injector.get(StarShipsService);
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be called getStarShips method if pagenumber is numeric`, fakeAsync(() => {

    const results = new Array<any>();
    results.push( {name : 'starship1', model:'starship1', MGLT:10,consumables:'1 day' });
    const data = {count:10, results:results};

    let spyobj=spyOn(starShipsService, 'getStarShips').and.callFake(() => {
      return of(data);
  });
    component.planetDistance = 600;
    component.onPageChange(2);
    flush();
    expect(spyobj).toHaveBeenCalledTimes(1);
    expect(component.starships.length).toBe(1);
    expect(component.starships[0].stopsRequired).toEqual("2");
  }));

  it(`should be called stoprequired is 74 for Y-wing`, fakeAsync(() => {

    const results = new Array<any>();
    results.push( {name : 'Y-wing', model:'Y-wing', MGLT:80,consumables:'1 week' });
    const data = {count:10, results:results};

    let spyobj=spyOn(starShipsService, 'getStarShips').and.callFake(() => {
      return of(data);
    });
    component.planetDistance = 1000000;
    component.onPageChange(1);
    flush();
    expect(spyobj).toHaveBeenCalledTimes(1);
    expect(component.starships.length).toBe(1);
    expect(component.starships[0].stopsRequired).toEqual("74");
  }));

  it(`should be called getStarShips method if pagenumber is zero`, fakeAsync(() => {

    const results = new Array<any>();
    results.push( {name : 'starship1', model:'starship1', mglt:10,consumables:'1 day' });
    const data = {count:10, results:results};

    let spyobj=spyOn(starShipsService, 'getStarShips').and.callFake(() => {
      return of(data);
  });

    component.onPageChange(0);
    flush();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));
});
