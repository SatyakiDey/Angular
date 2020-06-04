//File where declarations of variables, assigning of arrays,declaring of meta-data(aka Designer module) is done

import { Component, OnInit } from '@angular/core';
import {Dish} from 'src/app/shared/dish'; //or '../shared/dish'

import {DISHES} from '../shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes:Dish[]=DISHES;
  selectedDish :Dish ;
  constructor() { }

  ngOnInit() {
  }
onSelect(dish:Dish){
  this.selectedDish=dish;
}
}
