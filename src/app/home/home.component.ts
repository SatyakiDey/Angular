import { Component, OnInit, Inject } from '@angular/core';

import {Dish} from 'src/app/shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from "../shared/leader";
import {LeaderService} from '../services/leader.service';
import {flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  promotion:Promotion;
  dish:Dish;
  featuredLeader:Leader;
  dishErrMsg:string;
  promotionErrMsg:string;
  leaderErrMsg:string;


  constructor(private DishService:DishService , private promotionService:PromotionService, private leaderService:LeaderService,@Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    /*this.DishService.getFeaturedDish()
    .then((dish) => this.dish=dish);

    this.promotionService.getFeaturedPromotion()
    .then((promotion) => this.promotion = promotion);

    this.leaderService.getFeaturedService()
    .then((featuredLeader) => this.featuredLeader=featuredLeader);*/

    this.DishService.getFeaturedDish()
    .subscribe((dish) => this.dish=dish,
    dishErrMsg => this.dishErrMsg=<any>dishErrMsg);

    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion,
    promotionErrMsg => this.promotionErrMsg=<any>promotionErrMsg);

    this.leaderService.getFeaturedService()
    .subscribe((featuredLeader) => this.featuredLeader=featuredLeader,
    leaderErrMsg => this.leaderErrMsg=<any>leaderErrMsg);
  }
}
