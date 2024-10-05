import { model } from "mongoose";

import UserSchema from "./user/index.js";
import RoleSchema from "./role/index.js";
import PermissionSchema from "./permission/index.js";
import UserRoleSchema from "./user_role/index.js";
import RolePermissionSchema from "./role_permission/index.js";
//
import ResignationSchema from "./resignation/index.js";
import UserResponseSchema from "./user_response/index.js";
import QuestionnaireSchema from "./questionnaire/index.js";

export const User = model("user", UserSchema);
export const Role = model("role", RoleSchema);
export const UserRole = model("userRole", UserRoleSchema);
export const Permission = model("permission", PermissionSchema);
export const RolePermission = model("rolePermission", RolePermissionSchema);
//
export const Questionnaire = model("questionnaire", QuestionnaireSchema);
export const Resignation = model("resignation", ResignationSchema);
export const UserResponse = model("userResponse", UserResponseSchema);
