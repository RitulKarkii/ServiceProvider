import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Features } from '../features';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {


  @Output() searchEvent = new EventEmitter<string>();

searchText:string='';
token = localStorage.getItem('token');
role = localStorage.getItem('role');
  constructor(private router:Router, private service:Features,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    // this.token = localStorage.getItem('token');
  }
  logout(){
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('user_id');
          localStorage.removeItem('service_id');
          this.toastr.success('Logged out');

          this.router.navigate(['login']);
  
  }

  onSearch(value:string){
     this.searchEvent.emit(value);
  }
}
