import { Component, OnInit,Input} from '@angular/core'; //using Angular Router to bring the selected dish object. So, Input module is not currently being used.

import {Params, ActivatedRoute} from '@angular/router'; //ActivatedRoute is also a service
import {Location} from '@angular/common';// a service


//"Input" module is used to make use of "dish" property that is declared in menu component template file(which is also ="selectedDish"). It has to be also topped off by declaring Input decorator "@Input" and declaring the "dish" variable.
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  
  //@Input() //Input decorator declaration used to avail the property "dish" from menu component template.
  dish:Dish;  //we can also use  variable "dish" without declaraing it's "Dish" type. This is because in menu component template file we have assigned "dish" property to be equal to "selectedDish" which is inturn of type "Dish".
  dishIds:string[];
  prev:string;
  next:string;
  

  constructor(private dishService:DishService,private route:ActivatedRoute, private location:Location) { }

  ngOnInit() {
    //let id=this.route.snapshot.params['id']; //In Angular, the ActivatedRoute service provides a set of observables. One of the observables is called a params. What this params provides us, is a way of obtaining the parameter values within my URL. So, you saw that when you introduce the route parameters, you introduced one of the route parameters as colon ID. That colon ID becomes available as an observable. So, whenever that value changes, you can observe changes in that value and then take action correspondingly. We are taking one snapshot from the route service and then we are obtaining the parameter observable at that particular point of time. The value of the params at that particular point of time is then used within our application. 

    //this.dishIds=this.dishService.getDishIds(); This is not work because the method is returning an Observable and we need to subscribe to that observable insted of storing it inside a variable.Thus we use,
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds=dishIds);


    this.route.params.pipe(switchMap((params:Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => {this.dish=dish; this.setPrevNext(dish.id); } ); //switchMap operator is used to get the value of ID from the inner observable(i.e,getDish()) to the outer params observable using the above function. The function returns a 'dish' object which is then subscribed to the local 'dish' object of this component file through the outer 'params' observable. 
    //We want to modify the next and prev variables everytime a new dish object is obtained. So we are calling the "setPrevNext()" method for every new dish object.

    /*this.dishService.getDish(id)
    .then((dish) => this.dish=dish);*/

    //getDish(id) method returns a dish object which then stored in the 'dish' variable declared in this component using 'this.dish=dish'.

    /*this.dishService.getDish(id)
    .subscribe((dish) => this.dish=dish);*/
  }

  setPrevNext(dishId : string)
  {
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];// if the index of the dishId is 0,i.e,the first element of the array, the expression evaluates to ((4+0)-1) % 4 which is equal to 3 or the index of the last element of the array. This means on clicking 'Prev' on the first element of the list the last element will be shown, and that's how it should be. For some other element, (e.g 2,previous will be 1) ((4+2)-1) %4 which is 1 and that's what we want .The next expression is also similar.

    this.next=this.dishIds[(this.dishIds.length + index+1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

}
