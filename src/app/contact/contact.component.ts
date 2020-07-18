import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import{FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
import {flyInOut,expand} from '../animations/app.animation';
import {FeedbackService} from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm :FormGroup; //formGroup's instance is used to represent and access a form in code
  feedback:Feedback;
  feedbackCopy:Feedback;
  contactType=ContactType;
  showForm:boolean;
  showSpinner:boolean;
  agree:boolean=false;

  @ViewChild('fform') feedbackFormDirective; //this is used to access DOM elememts of the template. We can obtain references to template elements and have them injected into the our Component class by querying the template: that's what @ViewChild is for.

  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':'',
  };

  validationMessages={
    'firstname':{
      'required':'First name is required.',
      'minlength':'First name must be atleast 2 characters long.',
      'maxlength':'First name cannot be more than 25 characters.'
    },
    'lastname':{
      'required':'Last name is required.',
      'minlength':'Last name must be atleast 2 characters long.',
      'maxlength':'Last name cannot be more than 25 characters.'
    },
    'telnum':{
      'required':'Telephone number is required.',
      'pattern':'Telephone number must contain only numbers.'
    },
    'email':{
      'required':'Email is required.',
      'email':'Email not in valid format.'
    }
  };
  errMsg: string;

  constructor(private fb:FormBuilder,
    private feedbackService:FeedbackService,
    @Inject('BaseURL') private BaseURL) {  //formBuilder is used to create formGroups and use formControl. Creating it inside a constructor means that it'll get created when the class is created(Dependency Injection).

    this.createForm(); //used to create the form according to Angular's form styling guidelines.
  }

  ngOnInit() {
  }
 
  createForm()
    {
      //Making the feedbackForm equal to the returned value of the 'group' method of FormBuilder class.

      this.feedbackForm=this.fb.group({
        firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        telnum:[0,[Validators.required,Validators.pattern]],
        email:['',[Validators.required,Validators.email]],
        agree:false,
        contacttype:'',
        message:''
      });

      this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data)); //data returned by the Observable is sent as a parameter to the 'onValueChanaged()' method

      this.onValueChanged(); //reset form validation messages
      this.feedback=this.feedbackForm.value;
      this.showForm=true;
    }

    onValueChanged(data?:any){ 
      //Use of '?' after any attribute declares it as optional. Thus, this method may or may not have parameters passed to it.
      if(!this.feedbackForm){return;}
      const form=this.feedbackForm;
      for(const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field)){
          //clearing previous error messages(if any)
          this.formErrors[field]='';
          //getting firstname/lastname/telnum/email attributes form the form one at a time.
          const control=form.get(field);
          //checking the condition of the concerned input field by their formControlName.
          if(control && control.dirty && !control.valid){ 
            //Getting the appropriate Validation message from the 'validationMessages' object of the concerned input field using their formControlName. 
            const messages=this.validationMessages[field];
            //Getting all the errors of a concerned input field. 
            for(const key in control.errors){
              if(control.errors.hasOwnProperty(key)){
                //Concatinating each error after previous for a particular form attribute and storing it the appropriate field attribute of the object. 
                this.formErrors[field] += messages[key]+' ';
              }
            }
          }
        }
      }
    }

    onSubmit(){
      this.showForm=false;
      this.feedback=null;
      this.feedbackService.postFeedback(this.feedbackForm.value)
      .subscribe(feedback => {
        setTimeout(() => {
        this.feedbackCopy=null;
        this.showForm=true;
        },5000);
        this.feedback=feedback;
        this.feedbackCopy=feedback;
      }, errMsg => {
        this.feedback=null;
        this.feedbackCopy=null;
        this.errMsg=<any>errMsg;
      });
      this.feedbackForm.reset({
        firstname:'',
        lastname:'',
        telnum:0,
        agree:false,
        contacttype:'',
        message:''
      }); //this is done to reset the form attributes to the default values, using just reset() will only clear out all the fields of the forms.
      this.feedbackFormDirective.resetForm();
    }
    
}
