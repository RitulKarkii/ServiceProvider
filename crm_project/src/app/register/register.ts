import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Features } from '../features';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm! : FormGroup;

  constructor(private service:Features,
    private router:Router
  ){}

   ngOnInit(){
    this.registerForm = new FormGroup({
      name : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
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
      password: this.registerForm.value.password
    }

    this.service.registerUser(data).subscribe({
      next:(response:any)=>{
        console.log('user register',response.user);
        this.router.navigate(['login']);
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
   }
}
