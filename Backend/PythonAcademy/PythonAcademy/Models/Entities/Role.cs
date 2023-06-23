using Microsoft.AspNetCore.Identity;

namespace PythonAcademy.Models.Entities
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }      
    }
}
