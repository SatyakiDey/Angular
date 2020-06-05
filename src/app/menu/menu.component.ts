//File where declarations of variables, assigning of arrays,declaring of meta-data(aka Designer module) is done

import { Component, OnInit } from '@angular/core';
import {Dish} from 'src/app/shared/dish'; //or '../shared/dish'

import {DishService} from '../services/dish.service';

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
    this.dishes=this.dishService.getDishes();  //This is a life cycle method. This method fetches relevant information from the service using the variable we declared in the constructor. "getDishes()" is a method of the service.
  }
onSelect(dish:Dish){
  this.selectedDish=dish;
}
}
