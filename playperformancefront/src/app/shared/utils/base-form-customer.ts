import { FormBuilder,Validators } from '@angular/forms';
import { Injectable } from "@angular/core";

@Injectable({ providedIn:'root'} )
export class BaseForm{
  private isValidEmail = /\S+@\S+\.+\S+/;
  errorMessage = "";
  constructor(private fb:FormBuilder){}

  BaseForm = this.fb.group({
    nome: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.pattern(this.isValidEmail)]],
    cpf: ['',[Validators.required]],
    telefone: ['',[Validators.required]],
    rua: ['',[Validators.required]],
    bairro: ['',[Validators.required]],
    cidade: ['',[Validators.required]],
    uf: ['',[Validators.required]],
    cep: ['',[Validators.required]],
  });

  isValidField(field:string):boolean{
    this.getErrorMessage(field);
    let campo = this.BaseForm.get(field);
    if(campo!=null){
      return ((campo.touched || campo.dirty) && !campo.valid);
    }
    return false;
  }
  private getErrorMessage(field:string):void{
    let message="";
    let teste = this.BaseForm.get(field);
    if(teste!=null)
    {
      if(teste.errors!=null){
        if(teste.errors.required){
          message = `Campo Inválido`;
        }
        else if(teste.hasError('pattern')){
          message = 'Você deve digitar um e-mail válido'
        }
        else if(teste.hasError('minlength')){
          message = 'a senha deve ter pelo menos 6 caracteres'
        }
      }
    }
    this.errorMessage = message;
  }
}
