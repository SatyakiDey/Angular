//File where declarations of variables, assigning of arrays,declaring of meta-data(aka Designer module) is done

import { Component, OnInit } from '@angular/core';
import {Dish} from 'src/app/shared/dish'; //or '../shared/dish'

import {DishService} from '../services/dish.service'; //the component which uses a "Service"(DishService in this case) will have to- 1)declare a variable(s) of type 'DishService" class, of the service, in the constructor.This variable(s) will be used to call the required service method(s)(getDishes() in this case) of the exported service class, 2) implement the life cycle method named "ngOnit()" which would store the value returned by the required method of the service.

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes:Dish[];
  selectedDish :Dish ;
  constructor(private dishService: DishService) { } //The "dishService" variable is created when the menu component is instantiated. This variable is of type "DishService" which is a class of the "dish.service" service module.

  ngOnInit() {
    
    /*this.dishService.getDishes()
    .then((dishes) => this.dishes = dishes);  'then' method is used to get hold of the data returned by 'resolve' of promise. */

    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes);
    
    //This is a life cycle method. This method fetches relevant information from the service using the variable we declared in the constructor. "getDishes()" is a method of the service.
  }
/*onSelect(dish:Dish){
  this.selectedDish=dish;
}*/
}
