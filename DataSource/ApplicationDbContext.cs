using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Models.DataSource;

namespace DataSource
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        private readonly string _connectionString;

        public ApplicationDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        // PONIŻEJ DbEntity<> dodawać

    }
}
