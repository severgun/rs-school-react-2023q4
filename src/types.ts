export interface IAnimal {
  avian: boolean;
  canine: boolean;
  earthAnimal: boolean;
  earthInsect: boolean;
  feline: boolean;
  name: string;
  uid: string;
}

export interface ResponseSort {
  clauses: ResponseSortClause[];
}

export interface ResponseSortClause {
  name: string;
  direction: "ASC" | "DESC";
  clauseOrder: number;
}

export interface IAnimalFullResponse {
  animal: IAnimal;
}

export interface IAnimalsResponse {
  animals: IAnimal[];
  page: ResponsePage;
  sort: ResponseSort;
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
