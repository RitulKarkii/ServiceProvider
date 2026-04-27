import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Features } from '../features';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm! : FormGroup;

  constructor(private service:Features,
    private router: Router
  ){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  submit(){
    
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = {
      email : this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this.service.loginUser(data).subscribe({
      next:(response:any)=>{
       if (response?.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['dashboard']);
        } else {
          console.error('Invalid response format');
        }
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }
}
