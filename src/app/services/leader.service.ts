import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import { LEADERS } from '../shared/Leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders():Leader[]{
    return LEADERS;
  }
  getFeaturedService():Leader{
    return LEADERS.filter((FeaturedLeader) => FeaturedLeader.featured)[0];
  }
  constructor() { }
}
