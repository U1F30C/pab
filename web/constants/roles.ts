import _ from "lodash";

export enum Roles {
  GlobalAdmin = "GlobalAdmin",
  Admin = "Admin",
  Inspector = "Inspector"
}

export const RolesDisplayNameMap = {
  [Roles.GlobalAdmin]: "Administrador global",
  [Roles.Admin]: "Administrador",
  [Roles.Inspector]: "Capturador de datos"
}

export const RolesDisplayNameMapInverse = _.invert(RolesDisplayNameMap);
