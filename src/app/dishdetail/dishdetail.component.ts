import { Component, OnInit,Input,ViewChild,Inject} from '@angular/core'; //using Angular Router to bring the selected dish object. So, Input module is not currently being used.

import {Params, ActivatedRoute} from '@angular/router'; //ActivatedRoute is also a service
import {Location} from '@angular/common';// a service


//"Input" module is used to make use of "dish" property that is declared in menu component template file(which is also ="selectedDish"). It has to be also topped off by declaring Input decorator "@Input" and declaring the "dish" variable.
import {Dish} from '../shared/dish';
import {Comment} from '../shared/comment';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';
import{FormBuilder,FormGroup,Validators} from '@angular/forms';
import {visibility,flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;' //when the view changes from one 'dish' object to another then this animstion is triggered.
  },
  animations: [ //decalres all the animations for this component
    visibility(),
    flyInOut(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {
  
  @ViewChild('cform') commentFormDirective;
  //@Input() //Input decorator declaration used to avail the property "dish" from menu component template.
  dish:Dish;  //we can also use  variable "dish" without declaraing it's "Dish" type. This is because in menu component template file we have assigned "dish" property to be equal to "selectedDish" which is inturn of type "Dish".
  dishIds:string[];
  prev:string;
  next:string;
  commentForm:FormGroup;
  comment:Comment;
  errMsg:string;
  dishCopy:Dish;
  visibility = "shown";

  formErrors={
    'fullname':'',
    'comment':''
  };

  validationMessages={
    'fullname':{
      'required':'Full name is required.',
      'minlength':'Full name must be atleast 2 characters long.',
      'maxlength':'Full name cannot be more than 25 characters.'
    },
    'comment':{
      'required':'Comment is required.',
    }
  };
  

  constructor(private dishService:DishService,private route:ActivatedRoute, private location:Location,private fb:FormBuilder,@Inject('BaseURL') private BaseURL) {
    this.createForm();
   }

  ngOnInit() {
    //let id=this.route.snapshot.params['id']; //In Angular, the ActivatedRoute service provides a set of observables. One of the observables is called a params. What this params provides us, is a way of obtaining the parameter values within my URL. So, you saw that when you introduce the route parameters, you introduced one of the route parameters as colon ID. That colon ID becomes available as an observable. So, whenever that value changes, you can observe changes in that value and then take action correspondingly. We are taking one snapshot from the route service and then we are obtaining the parameter observable at that particular point of time. The value of the params at that particular point of time is then used within our application. 

    //this.dishIds=this.dishService.getDishIds(); This is not work because the method is returning an Observable and we need to subscribe to that observable insted of storing it inside a variable.Thus we use,
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds=dishIds);


    this.route.params.pipe(switchMap((params:Params) => {this.visibility="hidden";return this.dishService.getDish(params['id']);}))
    .subscribe(dish => {
      this.dish=dish; 
      this.dishCopy=dish; //also assigning the fetched dish object to the dish copy variable for modifying it's 'comments[]' .
      this.setPrevNext(dish.id);
      this.visibility="shown";
      },
    errMsg => this.errMsg=<any>errMsg); //switchMap operator is used to get the value of ID from the inner observable(i.e,getDish()) to the outer params observable using the above function. The function returns a 'dish' object which is then subscribed to the local 'dish' object of this component file through the outer 'params' observable. 
    //We want to modify the next and prev variables everytime a new dish object is obtained. So we are calling the "setPrevNext()" method for every new dish object.

    /*this.dishService.getDish(id)
    .then((dish) => this.dish=dish);*/

    //getDish(id) method returns a dish object which then stored in the 'dish' variable declared in this component using 'this.dish=dish'.

    /*this.dishService.getDish(id)
    .subscribe((dish) => this.dish=dish);*/

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  createForm(){
    this.commentForm=this.fb.group({
      fullname:['',[Validators.required,Validators.minLength,Validators.maxLength]],
      rating:[5],
      comment:['',[Validators.required]]
    }); 
  }

  onValueChanged(data?:any){
    if(!this.commentForm){return;}
    const form=this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control=form.get(field);
        if(control && control.dirty && !control.valid){
          const messages=this.validationMessages[field];
          for(const key in control.errors){ 
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key]+" ";
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId : string)
  {
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];// if the index of the dishId is 0,i.e,the first element of the array, the expression evaluates to ((4+0)-1) % 4 which is equal to 3 or the index of the last element of the array. This means on clicking 'Prev' on the first element of the list the last element will be shown, and that's how it should be. For some other element, (e.g 2,previous will be 1) ((4+2)-1) %4 which is 1 and that's what we want .The next expression is also similar.

    this.next=this.dishIds[(this.dishIds.length + index+1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

  onSubmit(){
    //this.comment=this.commentForm.value;
    //console.log(this.comment);
    this.comment={
      rating:this.commentForm.value.rating,
      comment:this.commentForm.value.comment,
      author:this.commentForm.value.fullname,
      date:new Date().toISOString(),
    };

      if(!this.dishCopy.comments.includes(this.comment)) 
        this.dishCopy.comments.push(this.comment); //pushing the locally updated comments to the 'dishCopy' instead of the actual 'dish' object.
        console.log(this.dish);
        this.dishService.putDish(this.dishCopy) //sending the 'dishCopy' instead of the actual 'dish' object because 'dishCopy' was updated locally with the new comment. This is done to ensure that the actual 'dish' objec is not tampered with in case any error arises.
        .subscribe(dish => {
          this.dish=dish;
          this.dishCopy=dish;
        },
        errMsg => {
          this.dish=null; //in case any error arises both the concerne dish objects are set to null.
          this.dishCopy=null;
          this.errMsg=<any>errMsg;//error message is stored in the errMsg variable to be rendered in the component as and when required.
        }); 
    /*
    My Version (unnecessary code)
    this.route.params.pipe(switchMap((params:Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => {
      this.dish=dish;
      if(!this.dish.comments.includes(this.comment)) 
        this.dish.comments.push(this.comment);
        console.log(this.dish);
    } );*/
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      fullname:'',
      rating:5,
      comment:'',
    });
  }


}
