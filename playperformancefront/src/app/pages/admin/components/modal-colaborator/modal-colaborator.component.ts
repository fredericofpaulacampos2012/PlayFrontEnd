import { UsersService } from './../../services/users.service';
import { BaseForm } from '../../../../shared/utils/base-form-customer';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../shared/models/user.interface';
 enum Action{
  EDIT = 'edit',
  NEW = 'new',
  VIEW = 'view'
}
@Component({
  selector: 'app-modal-colaborator',
  templateUrl: './modal-colaborator.component.html',
  styleUrls: ['./modal-colaborator.component.scss']
})
export class ModalColaboratorComponent implements OnInit {
  public maskTel = ['(', /[1-9]/, /\d/,')', ' ', /\d/,/\d/,/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCPF = [ /\d/,/\d/,/\d/, '.',/\d/, /\d/,/\d/,'.',/\d/, /\d/,/\d/, '-', /\d/, /\d/];
  public maskCEP = [ /\d/,/\d/,'.',/\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private userSvc:UsersService, public bForm:BaseForm
  ) { }
  ActionTodo = Action.NEW;
  public isView = false;
  user:User={
    nome:'',
    role: 'Colaborador',
    email:'',
    senha:'playPerformance2021',
    cpf:'',
    telefone:'',
    rua:'',
    bairro:'',
    cidade:'',
    uf: 'RS',
    cep:'',
    ativo:true
  };
  ngOnInit(): void {
    if(this.data.mode == 'new'){
      this.ActionTodo=Action.NEW;
      this.isView=false;
    }
    else if(this.data.mode=='view'){
      this.ActionTodo=Action.VIEW;
      this.isView=true;
    }
    else if(this.data.mode=='edit'){
      this.ActionTodo=Action.EDIT;
      this.isView=false;
    }
    this.PatchFormData();
  }
  onSave():void{
    if(this.ActionTodo==Action.NEW){
      this.user.nome = this.bForm.BaseForm.get('nome')?.value;
      this.user.email = this.bForm.BaseForm.get('email')?.value;
      this.user.role = this.bForm.BaseForm.get('role')?.value;
      this.user.cpf = this.bForm.BaseForm.get('cpf')?.value;
      this.user.telefone = this.bForm.BaseForm.get('telefone')?.value;
      this.user.rua = this.bForm.BaseForm.get('rua')?.value;
      this.user.bairro = this.bForm.BaseForm.get('bairro')?.value;
      this.user.cidade = this.bForm.BaseForm.get('cidade')?.value;
      this.user.uf = this.bForm.BaseForm.get('uf')?.value;
      this.user.cep = this.bForm.BaseForm.get('cep')?.value;
      console.log(this.user);
      this.userSvc.newUser(this.user).subscribe(res=>{
        console.log("new customer =>",res);
      });
    }else if(this.ActionTodo==Action.EDIT){
      this.user.nome = this.bForm.BaseForm.get('nome')?.value;
      this.user.email = this.bForm.BaseForm.get('email')?.value;
      this.user.role = this.bForm.BaseForm.get('role')?.value;
      this.user.cpf = this.bForm.BaseForm.get('cpf')?.value;
      this.user.telefone = this.bForm.BaseForm.get('telefone')?.value;
      this.user.rua = this.bForm.BaseForm.get('rua')?.value;
      this.user.bairro = this.bForm.BaseForm.get('bairro')?.value;
      this.user.cidade = this.bForm.BaseForm.get('cidade')?.value;
      this.user.uf = this.bForm.BaseForm.get('uf')?.value;
      this.user.cep = this.bForm.BaseForm.get('cep')?.value;
      this.user.ativo = true;
      this.user.senha = this.data.senha;
      const userId = this.data?.user?._id;
      this.userSvc.updateUser(userId,this.user).subscribe(res=>{
        console.log("Update customer =>",res);
      });
    }
    else{
      //View
    }
  }
  checkField(field:string):boolean{
    return this.bForm.isValidField(field);
  }
  private PatchFormData():void{
    if(this.ActionTodo!=Action.NEW)
    {
        this.bForm.BaseForm.patchValue({
        nome:this.data?.user?.nome,
        email:this.data?.user?.email,
        role:this.data?.user?.role,
        cpf:this.data?.user?.cpf,
        telefone:this.data?.user?.telefone,
        rua:this.data?.user?.rua,
        bairro:this.data?.user?.bairro,
        cidade:this.data?.user?.cidade,
        uf: this.data?.user?.uf,
        cep:this.data?.user?.cep,
      });
    }
    else{
      this.bForm.BaseForm.patchValue({
        nome:'',
        email:'',
        cpf:'',
        telefone:'',
        rua:'',
        bairro:'',
        cidade:'',
        uf: '',
        cep:'',
      });
    }
  }

}
