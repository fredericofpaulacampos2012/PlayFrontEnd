export type Roles = 'Cliente'|'Colaborador'|'Prestador'|'Financeiro'|'Administrador';
export type UF = 'AC'|'AL'|'AM'|'AP'|'BA'|'CE'|'DF'|'ES'|'GO'|'MA'|'MG'|'MS'|'MT'|'PA'|'PB'|'PE'|'PI'|'PR'|'RJ'|'RN'|'RO'|'RR'|'RS'|'SC'|'SE'|'SP'|'TO';
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
export interface User{
  nome:string,
  role: Roles,
  email:string,
  senha:string,
  cpf:string,
  telefone:string,
  rua:string,
  bairro:string,
  cidade:string,
  uf: UF,
  cep:string,
  ativo:boolean

}
