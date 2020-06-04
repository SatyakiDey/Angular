import { Component, OnInit,Input} from '@angular/core';
//"Input" module is used to make use of "dish" property that is declared in menu component template file(which is also ="selectedDish"). It has to be also toppe off by declaring Input decoarator "@Input" .
import {Dish} from '../shared/dish';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  
  @Input() //Input decorator declaration used to avail the property "dish" fromenu component template.

  dish:Dish;  //we can also use  variable "dish" without declaraing it's "Dish" type. This is because in menu component template file we have assigned "dish" property to be equal to "selectedDish" which is inturn of type "Dish".
  
  constructor() { }

  ngOnInit() {
  }

}
