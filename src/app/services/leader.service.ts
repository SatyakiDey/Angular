import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import { LEADERS } from '../shared/Leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders():Promise<Leader[]>{
    //return Promise.resolve(LEADERS);
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }
  getLeader(id:string):Promise<Leader> {
    //return Promise.resolve(LEADERS.filter((SpecificLeader) => (SpecificLeader.id === id))[0]);

    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((SpecificLeader) => (SpecificLeader.id === id))[0]), 2000);
    });
  }

  getFeaturedService():Promise<Leader>{
    //return Promise.resolve(LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0]);

    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0]), 2000);
    });
  }
  constructor() { }
}
