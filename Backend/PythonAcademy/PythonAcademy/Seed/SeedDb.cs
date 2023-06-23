using Microsoft.AspNetCore.Identity;
using PythonAcademy.Data;
using PythonAcademy.Models.Constants;
using PythonAcademy.Models.Entities;

namespace PythonAcademy.Seed
{
    public class SeedDb
    {
        private readonly RoleManager<Role> _roleManager;
        private readonly Context _context;

        public SeedDb(RoleManager<Role> roleManager, Context context)
        {
            _roleManager = roleManager;
            _context = context;
        }

        public async Task SeedRoles()
        {
            if (_context.Roles.Any()) { return; }

            string[] rolesNames =
            {
                UserRolesType.Admin,
                UserRolesType.Student
            };

            IdentityResult roleResult;

            foreach (var roleName in rolesNames)
            {
                var roleExists = await _roleManager.RoleExistsAsync(roleName);
                
                if (!roleExists) 
                {
                    roleResult = await _roleManager.CreateAsync(new Role
                    {
                        Name = roleName
                    });
                      
                }

                await _context.SaveChangesAsync();

            }
        }
    }
}
