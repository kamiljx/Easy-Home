using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource.Entities
{
    public class AppUserRole : IdentityUserRole<int>
    { 
        public ApplicationUser User { get; set; }
        public AppRole Role { get; set; }
    }
}
