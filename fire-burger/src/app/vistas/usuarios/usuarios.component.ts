import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { UserI } from './usuarios.model';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  formValue !: FormGroup;
  userModelObject : UserI = {email: '', password: '', roles:{name:'seleccione la categoria', admin: false}};
  users: UserI[] = [];
  prueba: string = "prueba";

  constructor(private formbuilder: FormBuilder,
    private auth : AuthService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      email : [''],
      password: [''],
      rolname:['seleccione la categoria'],
      admin: false
    })
    this.getUsers();
  }
  postUserDetails(){
    this.userModelObject.email = this.formValue.value.email;
    this.userModelObject.password = this.formValue.value.password;
    this.userModelObject.roles.name = this.formValue.value.rolname;
    this.userModelObject.roles.admin = this.formValue.value.admin;
  
    this.auth.postUser(this.userModelObject)
    .subscribe(res=>{
      console.log(res);
      alert("¡Usuario agregado!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getUsers();
    },
      err=>{
        alert("Ups, ocurrió un error");
      })
    console.log(this.userModelObject);
    
  }
  
  cancelUserDetails(){
    this.formValue.reset();
  }

  getUsers(){
    this.auth.getUser().subscribe(res => {
      this.users = res;
    })
  }

  deleteUser(id: any){
    this.auth.deleteOneUser(id).subscribe(res =>
      alert('Usuario eliminado'));
      this.getUsers();
  }
}