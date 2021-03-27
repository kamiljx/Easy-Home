﻿using Microsoft.AspNetCore.Identity;
using Models.DataSource.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Adress { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}