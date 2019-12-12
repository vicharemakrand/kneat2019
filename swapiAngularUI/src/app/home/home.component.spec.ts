import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { StapshipListComponent } from '../stapship-list/stapship-list.component';
import { InputDistanceComponent } from '../input-distance/input-distance.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { StarShipsService } from '../services/starships.service';
import { HttpClientModule } from '@angular/common/http';
import { MockComponent } from 'ng-mocks';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ,NgbModule,ToastrModule.forRoot(),HttpClientModule ],
      declarations: [ HomeComponent, 
        MockComponent(TopMenuComponent),
        MockComponent(InputDistanceComponent),  
        MockComponent(StapshipListComponent) ],
      providers:[StarShipsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
