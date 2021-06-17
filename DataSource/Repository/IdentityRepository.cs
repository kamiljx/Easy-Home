using Microsoft.AspNetCore.Identity;
using Models.DataSource;
using Models.DataSource.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataSource.Repository
{
    public class IdentityRepository : IIdentityRepository
    {
        private readonly ApplicationDbContext dbContext;

        public IdentityRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void AddUser(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public void AddUserToRole(int userId, string roleName)
        {
            throw new NotImplementedException();
        }

        public ApplicationUser GetUserById(int userId)
        {
            ApplicationUser user = dbContext.Users.FirstOrDefault(u => u.Id == userId);

            return user;
        }

        public ApplicationUser GetUserByLoginOrEmail(string userLoginOrMail)
        {
            string userLoginOrMailToLower = userLoginOrMail.ToLower();

            return dbContext.Users.FirstOrDefault(u => u.Email.ToLower() == userLoginOrMail || u.UserName.ToLower() == userLoginOrMail);
        }

        public IEnumerable<ApplicationUser> GetUsersAssignedToRealEstate(int realEstateId)
        {
            RealEstate estate = dbContext.RealEstates.FirstOrDefault(re => re.Id == realEstateId);

            return estate.Rentiers;
        }

        public void RemoveUser(ApplicationUser user)
        {
            dbContext.Users.Remove(user);
        }

        public void RemoveUser(int userId)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Id == userId);
            dbContext.Remove(user);
        }

        public void UpdateUser(ApplicationUser user)
        {
            ApplicationUser updateUser = dbContext.Users.FirstOrDefault(u => u.Id == user.Id);

            if (updateUser != null)
            {
                updateUser = user;
            }

            dbContext.SaveChanges();
        }
    }
}
