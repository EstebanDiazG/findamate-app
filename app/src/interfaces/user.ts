export interface IUser {
  id: string;
  personId: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  password: string;
  roles: IRol[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IRol {
  id: string;
  code: string;
  name: string;
}
