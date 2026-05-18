import { ChangeDetectorRef, Component } from '@angular/core';
import { Navbar} from '../navbar/navbar';
import { Features } from '../features';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
   standalone: true,
  imports: [Navbar,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  currentPage:any[] = [];
  filterData:any[] = [];
  page = 1;
  itemPerPage:number = 4;
  categories:any[]=[];

  constructor( private service: Features,private cdr: ChangeDetectorRef,
    private router:Router
  ){}

  ngOnInit(){
     this.getData();
  }

  search(value:string){
    if (!value) {
    this.filterData = [];
    return;
  }

  this.filterData = this.categories.filter((item: any) =>
    item.serviceName.toLowerCase().includes(value.toLowerCase())
  );

  this.page = 1;
  }

  get pagination(){
    const data = this.filterData.length > 0 ? this.filterData : this.categories;

    const start = (this.page-1)*this.itemPerPage;
    const end = start+ this.itemPerPage;
    
    return data.slice(start,end);
  }

  get totalPages(): number {
  const data = this.filterData.length > 0 ? this.filterData : this.categories;
  return Math.ceil(data.length / this.itemPerPage);
}


  getData(){
    this.service.getServiceData().subscribe({
      next:(response:any)=>{
        console.log('data:',response.data);
        localStorage.setItem('serviceName',response.data[0].serviceName);
        this.categories = response.data;
        this.cdr.detectChanges();
      },
      error(err:any){
        console.log(err)
      }
    });
  }


 

 bookNow(service: any){
  console.log("Clicked service:", service);

  localStorage.setItem('serviceName', service.serviceName);
  localStorage.setItem('service_id', service.id);
  localStorage.setItem('selectedService', JSON.stringify(service));
  // if using routing
  this.router.navigate(['/booking']);
}

nextPage(){
  if(this.page < this.totalPages){
    this.page++;
  }
}
prePage(){
  if(this.page > 1){
    this.page--;
  }
}


}
