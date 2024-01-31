import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";

/* export const Roles = (role) => SetMetadata('roles', role) */
export const Roles_Key = 'roles'
export const Roles = (role: Role) => SetMetadata(Roles_Key, role)