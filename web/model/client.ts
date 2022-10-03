
export interface Client {
  id: number;
  name: string;
  lastName: string;
  email: string;
  maritalStatus: MaritalStatus;
  phoneNumber: string;
  sex: Sexes;
  birthdate: Date;
  municipalityId: number;
  municipality: Municipality;
}

export interface Municipality {
  id: number;
  name: string;
  surface: unknown;
}

export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Widowed = "Widowed",
  Divorced = "Divorced",
}

export enum Sexes {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}


export const SexDisplayableName = {
  [Sexes.Male]: "Masculino",
  [Sexes.Female]: "Femenino",
  [Sexes.Other]: "Otro",
};
