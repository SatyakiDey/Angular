import { Injectable } from '@angular/core';
import {Promotion} from  '../shared/promotion';
//import {PROMOTIONS} from '../shared/promotions';
import {of,Observable} from 'rxjs';
import {delay,map,catchError} from 'rxjs/operators';
import{HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import{ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private http:HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { }


  getPromotions():Observable<Promotion[]>{ 
    //return Promise.resolve(PROMOTIONS);

    /*return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS),2000);
    });*/

    //return of(PROMOTIONS).pipe(delay(2000)).toPromise();

    //return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL+"promotion")
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getPromotion(id:string):Observable<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]); //promo is the name of the function.

    /*return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });*/

    //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0] ).pipe(delay(2000)).toPromise();

    //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0] ).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL+"promotion/"+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeaturedPromotion():Observable<Promotion>{
    //return Promise.resolve(PROMOTIONS.filter((promo) => promo.featured)[0]);

    /*return new Promise(resolve => {
      setTimeout(() =>resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });*/

    //return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000)).toPromise();
    
    //return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL+"promotions?featured=true")
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
