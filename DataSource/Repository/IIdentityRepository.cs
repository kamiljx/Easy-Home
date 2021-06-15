using Models.DataSource;
using System.Collections.Generic;

namespace DataSource.Repository
{
    public interface IIdentityRepository
    {
        ApplicationUser GetUserById(int userId);
        ApplicationUser GetUserByLoginOrEmail(string userLoginOrMail);
        IEnumerable<ApplicationUser> GetUsersAssignedToRealEstate(int realEstateId);
        void AddUser(ApplicationUser user);
        void UpdateUser(ApplicationUser user);
        void RemoveUser(ApplicationUser user);
        void RemoveUser(int userId);
        void AddUserToRole(int userId, string roleName);
    }
}