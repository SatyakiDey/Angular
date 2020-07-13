import { Component, OnInit } from '@angular/core';

import {Dish} from 'src/app/shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from "../shared/leader";
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promotion:Promotion;
  dish:Dish;
  featuredLeader:Leader;
  constructor(private DishService:DishService , private promotionService:PromotionService, private leaderService:LeaderService) { }

  ngOnInit() {
    /*this.DishService.getFeaturedDish()
    .then((dish) => this.dish=dish);

    this.promotionService.getFeaturedPromotion()
    .then((promotion) => this.promotion = promotion);

    this.leaderService.getFeaturedService()
    .then((featuredLeader) => this.featuredLeader=featuredLeader);*/

    this.DishService.getFeaturedDish()
    .subscribe((dish) => this.dish=dish);

    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion);

    this.leaderService.getFeaturedService()
    .subscribe((featuredLeader) => this.featuredLeader=featuredLeader);
  }
}
