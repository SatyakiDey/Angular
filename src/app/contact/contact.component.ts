import { Component, OnInit, ViewChild } from '@angular/core';
import{FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm :FormGroup; //formGroup's instance is used to represent and access a form in code
  feedback:Feedback;
  contactType=ContactType;

  @ViewChild('fform') feedbackFormDirective; //this is used to access DOM elememts of the template. We can obtain references to template elements and have them injected into the our Component class by querying the template: that's what @ViewChild is for.

  constructor(private fb:FormBuilder) {  //formBuilder is used to create formGroups and use formControl. Creating it inside a constructor means that it'll get created when the class is created(Dependency Injection).

    this.createForm(); //used to create the form according to Angular's form styling guidelines.
  }

  ngOnInit() {
  }
 
  createForm()
    {
      //Making the feedbackForm equal to the returned value of the 'group' method of FormBuilder class.

      this.feedbackForm=this.fb.group({
        firstname:['',Validators.required],
        lastname:['',Validators.required],
        telnum:[0,Validators.required],
        email:['',Validators.required],
        agree:false,
        contacttype:'',
        message:''
      })
    }

    onSubmit(){
      this.feedback=this.feedbackForm.value;
      console.log(this.feedback);
      this.feedbackForm.reset({
        firstname:'',
        lastname:'',
        telnum:0,
        agree:false,
        contact:'None',
        message:''
      }); //this is done to reset the form attributes to the default values, using just reset() will only clear out all the fields of the forms.
      this.feedbackFormDirective.resetForm();
    }
    
}
