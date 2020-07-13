import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import { resolve } from 'url';
import {of,Observable} from 'rxjs';
import {delay} from 'rxjs/operators'; //used to delay the time after which 'Observables' emits data.

//Promise returns only one data whereas Observable returns a stream of data.

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
 // return Promise.resolve(DISHES); for values that are instanteneouly available which is not mostly the case.

 /*return new Promise(resolve => {
   // Simulate server latency with 2 seconds delay, replicating real life scenario, where the service would take sometime to fetch the data from the server.
   setTimeout(() => resolve(DISHES),2000);
 });*/

 //return of(DISHES).pipe(delay(2000)).toPromise(); 'of' method is used to emit only one value from the Observable, whatever you want to emit.Pipes let you combine multiple functions into a single function. The pipe() function takes as its arguments the functions you want to combine, and returns a new function that, when executed, runs the composed functions in sequence.

 //Using promise is not recommended because the HTTP methods will return Observables which the components that require can subscribe to.

 return of(DISHES).pipe(delay(2000));

  }

  getDish(id:string):Observable<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); //only one element will be selected from the "DISHES" array which will be a "sub-array element", to convert the sub-array to a "dish" type object we use "[0]" refering to the first and only object of the array.

    //return new Promise(resolve => {
      // Simulate server latency with 2 seconds delay
      /*setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]) , 2000);
    });*/

    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();

    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish():Observable<Dish>{
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);

    /*return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });*/

    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();

    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds():Observable<string []>{
    return of(DISHES.map(dish => dish.id));
  }
}
