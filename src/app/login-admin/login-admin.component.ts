import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../Services/auth.service';
import { ClientService } from '../services/client.service';




@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  form: FormGroup;
  load: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClientService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {


    if (this.form.valid) {

      this.load = false;
      this.client.postRequest(`${environment.BASE_API}/admin/login`,{
        correo: this.form.value.correo,
        password: this.form.value.password
      }).subscribe(

        (response: any) => {
          this.load = true;
          console.log(response);

          this.auth.login(response.token)



          Swal.fire({
            icon: 'success',
            title: 'Has iniciado sesion correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          }).then((result) => {
            //Read more about isConfirmed, isDenied below
            if (result.isConfirmed) {
              this.route.navigate( ['/'])
            }
          })


      },
      (error) => {
        this.load = true;
        console.log(error.status);
        Swal.fire({

          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'

        }).then((result) => {
          //Read more about isConfirmed, isDenied below
          if (result.isConfirmed) {
            this.route.navigate( ['/login'])
          }
        })

      })



    } else {

      console.log("Form error");
    }



  }


  }

