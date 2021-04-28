using Microsoft.AspNetCore.Identity;
using Models.DataSource.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource
{
    public class ApplicationUser : IdentityUser<int>
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }

    }
}
