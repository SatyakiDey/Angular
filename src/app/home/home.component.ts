import { Component, OnInit } from '@angular/core';
import {Dish} from 'src/app/shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promotion:Promotion;
  dish:Dish;
  constructor(private DishService:DishService , private promotionService:PromotionService) { }

  ngOnInit() {
    this.dish=this.DishService.getFeaturedDish();
    this.promotion=this.promotionService.getFeaturedPromotion();
  }

}