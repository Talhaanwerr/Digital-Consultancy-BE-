const BaseController = require("./BaseController.js");
const RoleRepo = require("../repos/RoleRepo.js");
const RoleValidator = require("../validators/RoleValidator.js");
const UserRepo = require("../repos/UserRepo.js");

class RoleController extends BaseController {
  constructor() {
    super();
  }

  getAllRoles = async (req, res) => {
    try {
      const roles = await RoleRepo.findRoles();
      return this.successResponse(200, res, { roles }, "Roles retrieved successfully");
    } catch (error) {
      console.error("Error fetching roles:", error);
      return this.serverErrorResponse(res, "Failed to retrieve roles");
    }
  };

  getRoleById = async (req, res) => {
    try {
      const { id } = req.params;
      
      const role = await RoleRepo.findRole({
        where: { id },
      });

      if (!role) {
        return this.errorResponse(404, res, "Role not found");
      }

      return this.successResponse(200, res, role, "Role retrieved successfully");
    } catch (error) {
      console.error("Error fetching role:", error);
      return this.serverErrorResponse(res, "Failed to retrieve role");
    }
  };

  createRole = async (req, res) => {
    try {
      const result = RoleValidator.validateCreateRole(req.body);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }

      const { name, description } = result.data;

      // Check if role with same name already exists
      const existingRole = await RoleRepo.findRole({
        where: { name },
      });

      if (existingRole) {
        return this.errorResponse(
          400,
          res,
          "Role with this name already exists"
        );
      }

      const role = await RoleRepo.createRole({
        name,
        description,
      });

      return this.successResponse(201, res, { role }, "Role created successfully");
    } catch (error) {
      console.error("Error creating role:", error);
      return this.serverErrorResponse(res, "Failed to create role");
    }
  };

  updateRole = async (req, res) => {
    try {
      const { id } = req.params;
      const result = RoleValidator.validateUpdateRole(req.body);
      
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }

      const role = await RoleRepo.findRole({
        where: { id },
      });

      if (!role) {
        return this.errorResponse(404, res, "Role not found");
      }

      const { name, description } = result.data;

      // Check if another role with the same name exists
      if (name && name !== role.name) {
        const existingRole = await RoleRepo.findRole({
          where: { name },
        });
        
        if (existingRole) {
          return this.errorResponse(
            400,
            res,
            "Another role with this name already exists"
          );
        }
      }

      await RoleRepo.updateRole(id, {
        name: name || role.name,
        description: description !== undefined ? description : role.description,
      });

      const updatedRole = await RoleRepo.findRole({
        where: { id },
      });

      return this.successResponse(200, res, updatedRole, "Role updated successfully");
    } catch (error) {
      console.error("Error updating role:", error);
      return this.serverErrorResponse(res, "Failed to update role");
    }
  };

  deleteRole = async (req, res) => {
    try {
      const { id } = req.params;
      
      const role = await RoleRepo.findRole({
        where: { id },
      });

      if (!role) {
        return this.errorResponse(404, res, "Role not found");
      }

      // Check if users are associated with this role
      const usersWithRole = await UserRepo.findUsers({
        where: { roleId: id },
      });

      if (usersWithRole.length > 0) {
        return this.errorResponse(
          400,
          res,
          "Cannot delete role as it is assigned to users. Reassign users before deleting."
        );
      }

      await RoleRepo.deleteRole(id);
      
      return this.successResponse(200, res, null, "Role deleted successfully");
    } catch (error) {
      console.error("Error deleting role:", error);
      return this.serverErrorResponse(res, "Failed to delete role");
    }
  };
}

module.exports = new RoleController(); 