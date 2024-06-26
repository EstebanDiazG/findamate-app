export interface IPerson {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  interests: IInterest[];
}

export interface IInterest {
  id: string;
  name: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
