import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toaster: ToastrService,
    private service: AuthService,
    private router: Router,
    ) { }

  public registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    // password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false),
  });

  public registration() {
    if (this.registerForm.valid) {
      this.service.registerData(this.registerForm.value).subscribe((res => {
        this.toaster.success('Por favor contactar o administrador para liberar o acesso de usuário',
        'Sucesso no Registro' );

        this.router.navigate(['login']);
      }))
    } else {
      this.toaster.warning('Por favor digite um dado valido')
    }
  }
}
