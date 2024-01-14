export interface RegisterRequest{
  firstname:string,
  lastname:string,
  email:string,
  password:string,
  role:Role
}

enum Role{
  USER,ADMIN,MANAGER
}
