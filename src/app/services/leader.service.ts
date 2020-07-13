import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import { LEADERS } from '../shared/Leaders';
import {of,Observable} from 'rxjs';
import {delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders():Observable<Leader[]>{
    //return Promise.resolve(LEADERS);
    /*return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS), 2000);
    });*/

    //return of(LEADERS).pipe(delay(2000)).toPromise();

    return of(LEADERS).pipe(delay(2000));

  }
  getLeader(id:string):Observable<Leader> {
    //return Promise.resolve(LEADERS.filter((SpecificLeader) => (SpecificLeader.id === id))[0]);

    /*return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((SpecificLeader) => (SpecificLeader.id === id))[0]), 2000);
    });*/

    //return of(LEADERS.filter((SpecificLeader) => (SpecificLeader.id === id))[0] ).pipe(delay(2000)).toPromise();

    return of(LEADERS.filter((SpecificLeader) => (SpecificLeader.id === id))[0] ).pipe(delay(2000));

  }

  getFeaturedService():Observable<Leader>{
    //return Promise.resolve(LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0]);

    /*return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0]), 2000);
    });*/

    //return of(LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0]).pipe(delay(2000)).toPromise()    

    return of(LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0]).pipe(delay(2000));
  }
  constructor() { }
}
