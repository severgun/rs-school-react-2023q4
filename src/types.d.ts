export interface IAnimal {
  avian: boolean;
  canine: boolean;
  earthAnimal: boolean;
  earthInsect: boolean;
  feline: boolean;
  name: string;
  uid: string;
}

export interface IAnimalsResponse {
  animals: IAnimals[];
  page: ResponsePage;
  sort: string | null;
}

export interface ResponsePage {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface ResponseSort {
  clauses: ResponseSortClause[];
}

export interface ResponseSortClause {
  name: string;
  direction: 'ASC' | 'DESC';
  clauseOrder: number;
}
