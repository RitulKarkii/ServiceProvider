import { ChangeDetectorRef, Component } from '@angular/core';
import { Features } from '../features';
import { CommonModule, NgFor  } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
UpdateForm! : FormGroup;
  users : any[]=[];
  showModal = false;
  user!:number;

  constructor(private service:Features,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.UpdateForm = new FormGroup({
      name : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
    });

    this.getData();
  }

  getData(){
    this.service.getUserData().subscribe({
      next:(response:any)=>{
        console.log(response);
        this.users = response.user;
         this.cdr.detectChanges();
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

  editUser(id:number){
    this.showModal = true;
    this.user = id;

    this.service.editUserData(id).subscribe({
      next:(response:any)=>{
        this.UpdateForm.patchValue({
          name: response.data.name,
          email:response.data.email,
        });
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

  update(){
    const data={
      name:this.UpdateForm.value.name,
      email:this.UpdateForm.value.email
    }

    this.service.updateUserData(data,this.user).subscribe({
      next:(res:any)=>{
        console.log('user Updated',res.data);
        this.showModal = false;
        this.getData();
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
  }

  deleteUser(id:number){
    this.service.deleteUserData(id).subscribe({
      next:(response:any)=>{
        console.log('User Deleted',response.delete);
        this.getData();
      },
      error:(err:any)=>{
        console.log(err)
      }
    });
  }

  close(){
    this.showModal = false;
  }
}
