﻿using Microsoft.AspNetCore.Identity;

namespace PythonAcademy.Models.Entities
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
