import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public maskTel = ['(', /[1-9]/, /\d/,')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCPF = [ /\d/,/\d/,/\d/, '.',/\d/, /\d/,/\d/,'.',/\d/, /\d/,/\d/, '-', /\d/, /\d/];
  public maskCEP = [ /\d/,/\d/,'.',/\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }
  onSave():void{
    console.log('save');
  }

}
