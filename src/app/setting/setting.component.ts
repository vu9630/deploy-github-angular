import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef:MatDialogRef<SettingComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.form = new FormGroup({
      numberPerPage: new FormControl(data.numberPerPage),
      searchDebounce: new FormControl(data.searchDebounce),
      apiToken: new FormControl(data.apiToken)
    })  //material ho tro form control access
   }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.form.value);
    this.dialogRef.close(this.form.value)
  }
  compareValue(value1,value2){
    console.log(value1,value2);
    console.log(typeof value1, typeof value2)
    return value1 == value2
  }
}
