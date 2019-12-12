import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { InputDistanceComponent } from './input-distance.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InputDistanceComponent', () => {
  let component: InputDistanceComponent;
  let fixture: ComponentFixture<InputDistanceComponent>;
  let debugElement: DebugElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,BrowserAnimationsModule , ToastrModule.forRoot()  ],
      declarations: [ InputDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDistanceComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(` should be called validate method`, fakeAsync(() => {
    let spyobj= spyOn(component, 'validate').and.callThrough(); 
    component.calculate();
    flush();
    fixture.detectChanges();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));

  it(` should not be called calculateStops if distance is null/undefined`, fakeAsync(() => {
    let spyobj= spyOn(component.calculateStops, 'emit');
    component.calculate();
    flush();
    expect(spyobj).toHaveBeenCalledTimes(0);
  }));

  it(` should not be called calculateStops if distance is less than 1`, fakeAsync(() => {
    let spyobj= spyOn(component.calculateStops, 'emit');
    component.planetDistance = 0;
    component.calculate();
    flush();
    expect(spyobj).toHaveBeenCalledTimes(0);
  }));

  it(` should be called calculateStops if distance is greater than 0`, fakeAsync(() => {
    let spyobj= spyOn(component.calculateStops, 'emit');
    component.planetDistance = 1;
    component.calculate();
    flush();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));

  it(`on click event should be called calculateStops if distance is greater than 0`, fakeAsync(() => {
    let spyobj= spyOn(component.calculateStops, 'emit');
    component.planetDistance = 1;
    let btn = fixture.debugElement.query(By.css('input[type=button]')).nativeElement;
    btn.click();
     tick(1000); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    flush();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));

});
