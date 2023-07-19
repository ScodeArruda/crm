import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {
  rolelist: any;
  editData: any;
  selectedRole: any;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private dialogref: MatDialogRef<UpdatepopupComponent>,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.service.getAllRole().subscribe(res => {
      this.rolelist = res;
    });

    if (this.data.usercode != null && this.data.usercode != '') {
      this.loaduserdata(this.data.usercode);
    }

  }

  public registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
  });

  loaduserdata(code: any) {
    this.service.getById(code).subscribe(res => {
      this.editData = res;
      console.log('EDITDATA', this.editData);

      this.selectedRole = this.editData.role;

      this.registerForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        password: this.editData.password,
        email: this.editData.email,
        gender: this.editData.gender,
        role: this.editData.role,
        isActive: this.editData.isActive,
      });
    })
  }

  public updateUser() {
    if (this.registerForm.valid) {
      this.service.updateData(this.registerForm.value.role, this.registerForm.value).subscribe(res => {
        this.toaster.success("Update Successfull 0");
        this.dialogref.close();
      })
    } else {
      this.toaster.warning("Please Select Role for user")
    }
  }

  public onRoleSelectionChange(value: any) {
    this.registerForm.patchValue({
      role: value
    });
  }


}
