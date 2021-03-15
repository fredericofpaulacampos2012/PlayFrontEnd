import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  hide = true;
  hideConfirma = true;
  public userId = '';
  user:User = {
    nome:'',
    role: 'Cliente',
    email:'',
    senha:'',
    cpf:'',
    telefone:'',
    rua:'',
    bairro:'',
    cidade:'',
    uf: 'RS',
    cep:'',
    ativo:true
  };
  private subscription:Subscription = new Subscription();

  public PasswChange = this.fb.group({
    senha: ['',[Validators.required,Validators.minLength(6)]],
    confirma: ['',[Validators.required,Validators.minLength(6)]]
  });
  constructor(private authSvc:AuthService, private userSvc:UsersService, private fb:FormBuilder, private router:Router) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.router.navigate(['admin/password']);
    this.userId=this.authSvc.userId;
    this.subscription.add(
    this.userSvc.getUserById(this.userId).subscribe(user=>{
      this.user = user;
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSave():void{
    if(this.PasswChange.get('senha')?.value==this.PasswChange.get('confirma')?.value){
      this.user.senha = this.PasswChange.get('senha')?.value;
      this.subscription.add(
      this.userSvc.updateUser(this.userId,this.user).subscribe(res=>{
        console.log("Update =>",res);
      }));
    }
    else
    {
      window.alert("Senha e Confirmação não coincidem");
    }
  }
  getErrorMessage(field:string):string{
    let message="";
    let teste = this.PasswChange.get(field);
    if(teste!=null)
    {
      if(teste.errors!=null){
        if(teste.errors.required){
          message = `O campo ${field} é obrigatório`;
        }
        else if(teste.hasError('minlength')){
          message = 'a senha deve ter pelo menos 6 caracteres'
        }
      }
    }
    return message;
  }
  isValidField(field:string):boolean{
    let campo = this.PasswChange.get(field);
    if(campo!=null){
      return ((campo.touched || campo.dirty) && !campo.valid);
    }
    return false;
  }

}
