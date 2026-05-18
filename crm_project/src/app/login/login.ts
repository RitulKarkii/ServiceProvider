import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Features } from '../features';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm! : FormGroup;

  constructor(private service:Features,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  submit(){
    // debugger;
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

        localStorage.setItem('token',response.token);
          localStorage.setItem('role', response.user.role);
          localStorage.setItem('user_id', response.user.id);

          this.toastr.success('Login Successful');
          
          this.router.navigate(['']);
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }
}
