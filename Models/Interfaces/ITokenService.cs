using Models.DataSource;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user);
    }
}
