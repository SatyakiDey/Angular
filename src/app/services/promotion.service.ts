import { Injectable } from '@angular/core';
import {Promotion} from  '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions():Promotion[]{
    return PROMOTIONS;
  }

  getPromotion(id:string):Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0]; //promo is the name of the function.
  }

  getFeaturedPromotion():Promotion{
    return PROMOTIONS.filter((promo) => promo.featured)[0];
  }
  constructor() { }
}
