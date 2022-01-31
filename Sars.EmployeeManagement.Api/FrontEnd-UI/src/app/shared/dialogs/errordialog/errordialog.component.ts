import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.scss']
})
export class ErrordialogComponent{

  constructor(private _dialogRef: MatDialogRef<ErrordialogComponent>, @Inject(MAT_DIALOG_DATA) public data : any) { }

  public closeDialog(): void
  {
    this._dialogRef.close();
  }

}
