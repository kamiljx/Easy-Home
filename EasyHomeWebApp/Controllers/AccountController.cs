using DataSource;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.DataSource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyHomeWebApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<ApplicationUser>_userManager;
        private readonly SignInManager<ApplicationUser>_signInManager;
        private readonly ILogger<AccountController> _logger;


        public AccountController(
            ApplicationDbContext AppDbContext,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger)
        {
            _appDbContext = AppDbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> Register(string email, string password)
        {
            var user = new ApplicationUser
            {
                Email = email,
                PasswordHash = password
            };
            return user;
        }
    }
}
