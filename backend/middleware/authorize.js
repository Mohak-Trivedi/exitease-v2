import { Permission, RolePermission, UserRole } from "../src/models/index.js";

async function doesUserHaveThePermission(userId, permissionSpec) {
  const permission = await Permission.findOne(permissionSpec);

  const userRoles = await UserRole.find({
    userId,
  });

  const rolePermissions = await RolePermission.find({
    roleId: { $in: userRoles.map(({ roleId }) => roleId) },
  });

  return rolePermissions.some(({ permissionId }) =>
    permissionId.equals(permission._id)
  );
}

export const canSubmitResignation = async (req, res, next) => {
  let userHasThePermission = await doesUserHaveThePermission(req.user._id, {
    subject: "resignation",
    action: "submit",
  });

  if (userHasThePermission) next();
  else res.status(401).json({ error: "Insufficient Permission" });
};

export const canReviewResignation = async (req, res, next) => {
  let userHasThePermission = await doesUserHaveThePermission(req.user._id, {
    subject: "resignation",
    action: "review",
  });
  if (userHasThePermission) next();
  else res.status(401).json({ error: "Insufficient Permission" });
};

export const canGetAllResignation = async (req, res, next) => {
  let userHasThePermission = await doesUserHaveThePermission(req.user._id, {
    subject: "resignation",
    action: "see_all",
  });
  if (userHasThePermission) next();
  else res.status(401).json({ error: "Insufficient Permission" });
};

export const canGetAllResponses = async (req, res, next) => {
  let userHasThePermission = await doesUserHaveThePermission(req.user._id, {
    subject: "responses",
    action: "see_all",
  });
  if (userHasThePermission) next();
  else res.status(401).json({ error: "Insufficient Permission" });
};
