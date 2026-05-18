import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Features } from '../features';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  services:any[]=[];
  serviceName!: string;
  

  bookingForm! : FormGroup
  constructor(private service:Features,
    private router:Router,
    private toastr:ToastrService
  ){}

  ngOnInit(){
      this.serviceName = localStorage.getItem('serviceName')|| '';
      // console.log(serviceName);
      

    this.bookingForm = new FormGroup({
      'date':new FormControl('',[Validators.required]),
      'address':new FormControl('',[Validators.required]),
      'phoneNumber': new FormControl('',[Validators.required])
    });

  }

  submit(){
     if(this.bookingForm.invalid){
    alert("Please fill all fields");
    return;
  }
   const user_id = localStorage.getItem('user_id');
   const token = localStorage.getItem('token');
  //  const service_id = localStorage.getItem('service_id');
  const serviceData = localStorage.getItem('selectedService');

//   console.log(
//   "READ DATA =",
//   localStorage.getItem('selectedService')
// );

if(!serviceData){
  alert("No service selected");
  return;
}

const selectedService = JSON.parse(serviceData);


  if(!token){
    alert("Please login first");
    this.router.navigate(['/login']);
    return;
  }

    const data ={
      user_id: Number(user_id),
      service_id: selectedService.id,
      serviceName:selectedService.serviceName,
      image:selectedService.image,
      price:selectedService.price,
      'date':this.bookingForm.value.date,
      'address':this.bookingForm.value.address,
      'phoneNumber': this.bookingForm.value.phoneNumber
    }

    this.service.bookingUserData(data).subscribe({
      next:(res:any)=>{
        // const bookingId = res.booking.id;
        console.log("Booking Info: ",res.booking);
        localStorage.setItem('booking_id',res.booking.id);
        this.toastr.success('Your Address Added');
        this.router.navigate(['cart']);

      },
      error:(err:any)=>{
        console.log('somthing went wrong',err)
      }
    });
  }


}
