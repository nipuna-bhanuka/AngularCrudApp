import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm !: FormGroup;

  constructor( private formBuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName : [''],
      phoneNumber : [''],
      email : [''],
      password : ['']


    })
  }

  signUp(){
    this.http.post<any>("http://localhost:3000/SignUpUsers",this.signUpForm.value)
    .subscribe( res=>{
    alert("Sign Up sucessfull");
    this.signUpForm.reset();
    this.router.navigate(['login']);
    },err=>{
      alert("something went wrong");
    })
  }

}
