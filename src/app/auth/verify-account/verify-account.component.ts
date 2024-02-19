import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent {

  constructor(
    public dialogRef: MatDialogRef<VerifyAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  veryForm= new FormGroup({
    email : new FormControl(null),
    code : new FormControl(null),
  })

  onNoClick(): void {
    this.dialogRef.close();
  }
}
