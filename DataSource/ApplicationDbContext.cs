using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Models.DataSource;
using Models.DataSource.Entities;
using Microsoft.AspNetCore.Identity;

namespace DataSource
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public ApplicationDbContext() : base()
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();


            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            

            builder.Entity<RealEstate>()
                 .HasMany(u => u.Rentiers)
                 .WithOne(x => x.RealEstate)
                 .HasForeignKey(k => k.RealEstateId).IsRequired(false);

            builder.Entity<RealEstate>()
                .HasOne(o => o.Owner)
                .WithMany(ow => ow.OwnEstates);


        }

        public DbSet<RealEstate> RealEstates { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
    }
}
