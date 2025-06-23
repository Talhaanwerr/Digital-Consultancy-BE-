const RoleRepo = require('../repos/RoleRepo.js');
const NodeCache = require('node-cache');

// Create a cache with a TTL of 1 hour (3600 seconds)
const roleCache = new NodeCache({ stdTTL: 3600 });

/**
 * Middleware to cache user roles to reduce database queries
 */
const cacheUserRole = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return next();
    }

    const cacheKey = `user_role_${req.user.id}`;
    let userRole = roleCache.get(cacheKey);

    if (!userRole) {
      // Role not in cache, fetch from database
      const role = await RoleRepo.findRole({
        where: {
          id: req.user.roleId,
        },
        attributes: ['id', 'name'],
        raw: true
      });

      if (role) {
        userRole = role;
        // Store in cache
        roleCache.set(cacheKey, userRole);
      }
    }

    // Attach role to request object
    req.userRole = userRole;
    
    // Helper function to check if user is admin
    req.isAdmin = () => {
      return req.userRole && (req.userRole.name === 'Admin' || req.userRole.name === 'Super Admin');
    };

    next();
  } catch (error) {
    console.error('Error in role cache middleware:', error);
    next();
  }
};

/**
 * Clear role cache for a specific user
 */
const clearUserRoleCache = (userId) => {
  const cacheKey = `user_role_${userId}`;
  roleCache.del(cacheKey);
};

/**
 * Clear all role cache
 */
const clearAllRoleCache = () => {
  roleCache.flushAll();
};

module.exports = {
  cacheUserRole,
  clearUserRoleCache,
  clearAllRoleCache
}; 