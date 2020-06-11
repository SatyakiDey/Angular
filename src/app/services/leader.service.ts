import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import { LEADERS } from '../shared/Leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders():Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }
  getLeader(id:string):Promise<Leader> {
    return Promise.resolve(LEADERS.filter((SpecificLeader) => (SpecificLeader.id === id))[0]);
  }

  getFeaturedService():Promise<Leader>{
    return Promise.resolve(LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0]);
  }
  constructor() { }
}
