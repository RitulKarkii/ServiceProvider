import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Features } from '../features';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  paymentForm! : FormGroup;

  constructor( private service: Features,
    private router:Router,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.paymentForm = new FormGroup({
      'cardHolderName' : new FormControl('',[Validators.required]),
      'card_number': new FormControl('',[Validators.required]),
      'expiry_date': new FormControl('',[Validators.required]),
      'cvv': new FormControl('',[Validators.required]),
      'payment_method':new FormControl('',[Validators.required])
    });
  }

  submit(){
    if(this.paymentForm.invalid){
      alert("please fill th fields!");
    }
    const booking_id = localStorage.getItem('booking_id');

    const paymentData = {
      booking_id:Number(booking_id),
      'cardHolderName':this.paymentForm.value.cardHolderName,
      'card_number':this.paymentForm.value.card_number,
      'expiry_date':this.paymentForm.value.expiry_date,
      'cvv':this.paymentForm.value.cvv,
      'payment_method' : this.paymentForm.value.payment_method,
    }

    this.service.payment(paymentData).subscribe({
      next:(res:any)=>{
        console.log('Paymnet Data:',res.paymnet);
        this.router.navigate(['']);
        this.toastr.success('Your Booking Confirm');
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

 
}
