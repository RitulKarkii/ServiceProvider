import { ChangeDetectorRef, Component } from '@angular/core';
import { Features } from '../features';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-order',
  imports: [CommonModule,Navbar],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
orders:any[]=[];
token : any ='';
  constructor( private service:Features,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    const user = localStorage.getItem('user_id');
    if(user){
      this.getData(Number(user));
    }

    this.token = localStorage.getItem('token');
  }

  getData(id:number){
    this.service.getOrder(id).subscribe({
      next:(res:any)=>{
        console.log('data:',res.data);
        this.orders = res.data;
        this.cdr.detectChanges();
      },
       error:(err:any)=>{
      console.error(err)
    }
    });
   
  }
}
