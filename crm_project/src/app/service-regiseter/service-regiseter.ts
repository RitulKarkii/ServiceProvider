import { ChangeDetectorRef, Component } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Features } from '../features';
import { CommonModule, NgFor } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-service-regiseter',
  imports: [ReactiveFormsModule,NgFor,CommonModule,Navbar],
  templateUrl: './service-regiseter.html',
  styleUrl: './service-regiseter.css',
})
export class ServiceRegiseter {
  serviceForm! : FormGroup;
  updateForm! : FormGroup;
  categories:any[]=[];
  showModel = false;
  showEditModel = false;
  editData:any='';
  selectedFile :any='';
  constructor(private service:Features,private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.getData();
    this.serviceForm = new FormGroup({
      'serviceName' : new FormControl('',[Validators.required]),
      'description' : new FormControl('',[Validators.required]),
      'price': new FormControl('',[Validators.required]),
      'image': new FormControl('',[Validators.required])
    });

     this.updateForm = new FormGroup({
      'serviceName' : new FormControl('',[Validators.required]),
      'description' : new FormControl('',[Validators.required]),
      'price': new FormControl('',[Validators.required])
    });

    
  }
  closeForm(){
    this.showModel = false;
  }

  openModel(){
    this.showModel = true;
  }
    onFileChange(event:any){
       if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
  }
      
    }

  submit(){
    if(this.serviceForm.invalid){
      this.serviceForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('serviceName',this.serviceForm.value.serviceName);
    formData.append('description', this.serviceForm.value.description);
    formData.append('price', this.serviceForm.value.price);
  //  Add image
  formData.append('image', this.selectedFile);
    this.service.addService(formData).subscribe({
      next:(response:any)=>{
        console.log("Service Added", response.data);
        this.getData();
        this.showModel = false;
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

  getData(){
    this.service.getServiceData().subscribe({
      next:(response:any)=>{
        console.log('data:',response.data);
        this.categories = response.data;
        this.cdr.detectChanges();
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

  edit(id:number){
    this.showEditModel = true;
    this.editData = id;
    this.service.editServiceData(id).subscribe({
      next:(response:any)=>{
        this.updateForm.patchValue({
          serviceName : response.data.serviceName,
          description : response.data.description,
          price : response.data.price
        });
      }
    })
  }

  update(){
    const updateData = {
      serviceName : this.updateForm.value.serviceName,
      description : this.updateForm.value.description,
      price : this.updateForm.value.price
    }

    this.service.updateServiceData(this.editData,updateData).subscribe({
      next:(response:any)=>{
        console.log('Data Updated',response.data);
        this.close();
        this.getData();
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

  delete(id:number){
    this.service.deleteServiceData(id).subscribe({
      next:(response:any)=>{
        console.log("Service Deleted!",response.delete);
        this.getData();
      },
      error:(err:any)=>{
        console.log(err)
      }
    });
  }

  close(){
    this.showEditModel = false;
  }
}
