using Models.DataSource;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Models.Interfaces
{
    public interface IUserRepository
    {
        void Update(ApplicationUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<ApplicationUser>> GetUsersAsync();
        Task<ApplicationUser> GetUserByIdAsync(string id);
        Task<ApplicationUser> GerUserByUserNameAsync(string username);

    }
}
