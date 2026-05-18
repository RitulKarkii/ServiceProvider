import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Features } from '../features';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,Navbar],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm! : FormGroup;
  role:any='';

  constructor(private service:Features,
    private router:Router,
    private toastr: ToastrService
  ){}

   ngOnInit(){
    this.role = localStorage.getItem('role');
    this.registerForm = new FormGroup({
      name : new FormControl('',[Validators.required, Validators.minLength(3)]),
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(4),
     Validators.maxLength(12)]),
     role: new FormControl('',[Validators.required])
    });

   }

   submit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = {
      name : this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role
    }

    this.service.registerUser(data).subscribe({
      next:(response:any)=>{
        console.log('user register',response.user);
        localStorage.setItem('role', response.role);
        this.toastr.success('Registration Successful');
        this.router.navigate(['login']);
      },
      error:(err:any)=>{
        console.error(err);
         this.toastr.error('Registration Failed');
      }
    });
   }
}
