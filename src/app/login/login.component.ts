import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username:'', password:'', remember:false}; //to reflect the changes made to the suer object in the the forms, also changing the value of username here will be reflected in the form. This is two way data binding.

  constructor(public dialogRef:MatDialogRef<LoginComponent>) { } //to use dialogueRef to close the Login Component

  ngOnInit() {
  }

  onSubmit(){
    console.log('User: ', this.user);
    this.dialogRef.close(); //to dismiss the dialog component when the form is submitted
  }
}
