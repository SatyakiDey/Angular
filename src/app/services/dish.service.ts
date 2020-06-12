import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
 // return Promise.resolve(DISHES); fro values that are instanteneouly available which is not mostly the case.

 return new Promise(resolve => {
   // Simulate server latency with 2 seconds delay, replicating real life scenario, where the service would take sometime to fetch the data from the server.
   setTimeout(() => resolve(DISHES),2000);
 });
  }

  getDish(id:string):Promise<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); //only one element will be selected from the "DISHES" array which will be a "sub-array element", to convert the sub-array to a "dish" type object we use "[0]" refering to the first and only object of the array.

    return new Promise(resolve => {
      // Simulate server latency with 2 seconds delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]) , 2000);
    });
  }

  getFeaturedDish():Promise<Dish>{
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);

    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });

  }
}
