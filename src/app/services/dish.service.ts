import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
//import {DISHES} from '../shared/dishes';
import { resolve } from 'url';
import {of,Observable} from 'rxjs';
import {delay, map,catchError} from 'rxjs/operators'; //used to delay the time after which 'Observables' emits data.
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

//Promise returns only one data whereas Observable returns a stream of data.

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
 // return Promise.resolve(DISHES); for values that are instanteneouly available which is not mostly the case.

 /*return new Promise(resolve => {
   // Simulate server latency with 2 seconds delay, replicating real life scenario, where the service would take sometime to fetch the data from the server.
   setTimeout(() => resolve(DISHES),2000);
 });*/

 //return of(DISHES).pipe(delay(2000)).toPromise(); 'of' method is used to emit only one value from the Observable, whatever you want to emit.Pipes let you combine multiple functions into a single function. The pipe() function takes as its arguments the functions you want to combine, and returns a new function that, when executed, runs the composed functions in sequence.

 //Using promise is not recommended because the HTTP methods will return Observables which the components that require can subscribe to.

 //return of(DISHES).pipe(delay(2000));
 //return this.http.get<Dish[]>(baseURL+ 'dishes/');

 return this.http.get<Dish[]>(baseURL+ 'dishes')
 .pipe(catchError(this.processHTTPMsgService.handleError)); //'pipe' operator operators on Observables and is used to implement more than one methods, sequentially.

  }

  getDish(id:string):Observable<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); //only one element will be selected from the "DISHES" array which will be a "sub-array element", to convert the sub-array to a "dish" type object we use "[0]" refering to the first and only object of the array.

    //return new Promise(resolve => {
      // Simulate server latency with 2 seconds delay
      /*setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]) , 2000);
    });*/

    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();

    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));

    //return this.http.get<Dish>(baseURL+ 'dishes/'+id);

    return this.http.get<Dish>(baseURL+ 'dishes/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish():Observable<Dish>{
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);

    /*return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });*/

    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();

    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL+ 'dishes?featured=true') //'?' or query paramter checks the Dish array where the featured attribute is set to 'true'. Qurey paramter returns an array of 'Dish' objects. In this scenario, it will return the array containing only one element which is obtained by refering to the first element of the array.
    .pipe(map(dishes => dishes[0])) //we have to use 'pipe' operator in conjuction with map because we have omitted the 'of' operator and 'map' operator doesn't return an Observable.
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds():Observable<string []>{
    //return of(DISHES.map(dish => dish.id));
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error)); //The first 'dishes' parameter is a Dish[] with all the dish details. This parameter is used by first 'map' operator to operate on this Dish[] which is then sent to the inner 'map' operator to operate on each dish elements to get it's repective id. 'Map' operator is used because it can operate on Observables.
    }

    //This method takes in the modified 'dish' object, performs 'put' operation on the server and returns the modified 'dish' to the component using it.
    putDish(dish : Dish):Observable<Dish>{
      const httpOptions={
        headers:new HttpHeaders({
          'Content-type':'application/json' //this declares that the server should communicate with the client using hhtp protocol with data being encoded in json format. 
        })
      };

      return this.http.put<Dish>(baseURL+'dishes/'+dish.id,dish,httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

      //The above statement uses the http-put-method(containing the url to whose resource should be modified, the data to which the resourse(being pointed by the url) should be modified known as body and the headerOption) and then  returns the updated resource.
    }
}
