import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData: any;
  constructor(
    private builder: FormBuilder,
    private toaster: ToastrService,
    private service: AuthService,
    private router: Router,
  ) {
    sessionStorage.clear();
  }

  public loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  public login() {
    if (this.loginForm.valid) {
      this.service.getById(this.loginForm.value.username).subscribe(res => {
        this.userData = res;
        console.log(this.userData);

        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('role', this.userData.role);
            this.router.navigate([''])
          } else {
            this.toaster.error('Por favor contactar o administrador 0', 'In Active User!!!')
          }
        } else {
          this.toaster.error('Credencial Inválida!')
        }

      })
    } else {
      this.toaster.warning('Por favor digite seus dados validos')
    }
  }
}
