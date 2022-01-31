import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pleasewait',
  templateUrl: './pleasewait.component.html',
  styleUrls: ['./pleasewait.component.scss']
})
export class PleasewaitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PleasewaitComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    //
  }

  ngOnInit() {
    //
  }
}
