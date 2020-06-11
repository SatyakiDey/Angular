import { Component, OnInit,Input} from '@angular/core'; //using Angular Router to bring the selected dish object. So, Input module is not currently being used.

import {Params, ActivatedRoute} from '@angular/router'; //ActivatedRoute is also a service
import {Location} from '@angular/common';// a service


//"Input" module is used to make use of "dish" property that is declared in menu component template file(which is also ="selectedDish"). It has to be also topped off by declaring Input decorator "@Input" and declaring the "dish" variable.
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  
  //@Input() //Input decorator declaration used to avail the property "dish" from menu component template.
  dish:Dish;  //we can also use  variable "dish" without declaraing it's "Dish" type. This is because in menu component template file we have assigned "dish" property to be equal to "selectedDish" which is inturn of type "Dish".
  

  constructor(private dishService:DishService,private route:ActivatedRoute, private location:Location) { }

  ngOnInit() {
    let id=this.route.snapshot.params['id'];
    this.dishService.getDish(id)
    .then((dish) => this.dish=dish);
  }

  goBack():void{
    this.location.back();
  }

}
