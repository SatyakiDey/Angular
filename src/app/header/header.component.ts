import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog:MatDialog) { } //"MatDialog" is a service.

  ngOnInit() {
  }

  openLoginForm(){
    this.dialog.open(LoginComponent, {width:'620px',height:'600px'});
  }
}

//"MatDialog" is used to open a Material dialog-box 
//"MatDialogRef" is used to address the dialog-box(like closing it)