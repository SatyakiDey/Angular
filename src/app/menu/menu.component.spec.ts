import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//importing all the modules required by th Menu Component in the Angular Application

import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Dish} from '../shared/dish';
import { DISHES } from "../shared/dishes";
import { DishService } from "../services/dish.service";
import { baseURL } from "../shared/baseurl";
import { Observable,of } from "rxjs";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

//importing the all the modules required to test the template of the Menu Component

import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => { //async() completes it's execution and returns value only when all the asynchronous processes inside this function completes it's exceution. Wraps a test function in an asynchronous test zone.

  //mimicing the getDishes method of the Dish Service  
  const dishServiceStub = {
      getDishes:function():Observable<Dish[]>{
        return of(DISHES);
      }
    };
    // for other methods we can write other constant assigned to other methods.

    //Configuring the Testbed where the testing will be performed.
    TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu',component:MenuComponent}]),//configuring the router Link to the menu component for testing
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      declarations: [ MenuComponent ],
      providers:[
        {provide :DishService,useValue:dishServiceStub}, //sismilar to the dependency injection of the constructor.
        {provide : 'BaseURL',useValue:baseURL}
      ]
    })
    .compileComponents(); 

    const dishService=TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance; //creating an instance of the MenU Component
    fixture.detectChanges();
  });
  //Code for actual testing. 'it' method is only executed when all the beforeEach() methods are executed.
  it('should create', () => {
    expect(component).toBeTruthy(); //'toBeTruthy' means that the expression should return to true.
  });

  it('dishes items should be 4', () =>{
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy(); 
  });

  it('should use dishes in the template', () =>{    //Define a single spec. A spec should contain one or more         expectations that test the state of the code. A spec whose expectations all succeed will be passing and a spec with any failures will fail.The 2nd paramter should contain the function that contains the code of your test. If not provided the test will be pending.
    fixture.detectChanges();
    let de:DebugElement;
    let el:HTMLElement;

    de = fixture.debugElement.query(By.css('h1')); //To get the first element with tag 'h1'
    el = de.nativeElement;

    expect(el.textContent).toContain(DISHES[0].name.toUpperCase()); //el.textContent checks the content in the specifiend element by de. 'toContain()' states the what it should contain. 'expect()' method does the checking.
  });
});
