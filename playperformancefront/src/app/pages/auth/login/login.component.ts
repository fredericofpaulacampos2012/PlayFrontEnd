import { RouterModule } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription:Subscription = new Subscription();
  private isValidEmail = /\S+@\S+\.+\S+/;
  hide = true;

  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.pattern(this.isValidEmail)]],
    senha: ['',[Validators.required,Validators.minLength(6)]]
  });
  constructor(private authSvc:AuthService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void{
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin():void{
    if(this.loginForm.invalid){
      return;
    }
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe(res=>{
        if(res){
          this.router.navigate(['']);
        }})
    );
  }

  getErrorMessage(field:string):string{
    let message="";
    let teste = this.loginForm.get(field);
    if(teste!=null)
    {
      if(teste.errors!=null){
        if(teste.errors.required){
          message = `O campo ${field} é obrigatório`;
        }
        else if(teste.hasError('pattern')){
          message = 'Você deve digitar um e-mail válido'
        }
        else if(teste.hasError('minlength')){
          message = 'a senha deve ter pelo menos 6 caracteres'
        }
      }
    }
    return message;
  }
  isValidField(field:string):boolean{
    let campo = this.loginForm.get(field);
    if(campo!=null){
      return ((campo.touched || campo.dirty) && !campo.valid);
    }
    return false;
  }
}
