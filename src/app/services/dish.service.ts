import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
  return DISHES;
  }

  getDish(id:string):Dish {
    return DISHES.filter((dish) => (dish.id === id))[0]; //only one element will be selected form the "DISHES" array which will be a "sub-array element", to convert the sub-array to a "dish" type object we use "[0]" refering to the first and only object if the array.
  }

  getFeaturedDish():Dish{
    return DISHES.filter((dish) => dish.featured)[0];
  }
}
