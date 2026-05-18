import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Features } from '../features';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,Navbar],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  carts:any[]=[];
  constructor(private service:Features,private cdr: ChangeDetectorRef){}
  ngOnInit(){
      const user = localStorage.getItem('user_id');
  if(user){
    this.getCartData(Number(user));
  }
  }

  getCartData(id:number){
    this.service.cartData(id).subscribe({
      next:(res:any)=>{
      console.log('data:', res.data);
        this.carts = res.data
         this.cdr.detectChanges();
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

  getTotalPrice(){
    return this.carts.reduce(
      (total,cart)=>total+Number(cart.price),0
    );
  }

  getToPayment(){

    const total = this.getTotalPrice();

    localStorage.setItem('TotalAmount: ',total.toString());
  }

  delete(id:number){
    this.service.deleteBooking(id).subscribe({
      next:(res:any)=>{
        console.log('deleted',res.delete);
       const user = localStorage.getItem('user_id');

      if(user){
        this.getCartData(Number(user));
      }

      }
    });
  }
}
