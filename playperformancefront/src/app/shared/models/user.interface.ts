export type Roles = 'Cliente'|'Colaborador'|'Prestador'|'Financeiro'|'Administrador';

export interface Login {
  email:string;
  senha:string;
}
export interface LoginResponse {
  token:string;
  data:{
    id:string;
    nome:string;
    email:string;
    role:Roles;
  }
}
