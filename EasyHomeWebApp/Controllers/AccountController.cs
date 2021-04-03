using DataSource;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.DataSource;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;


namespace EasyHomeWebApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<AccountController> _logger;



        public AccountController(
            ApplicationDbContext appDbContext,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger
            )
        {
            _appDbContext = appDbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;

        }

        [HttpPost("register")]
        
        public async Task<ActionResult<ApplicationUser>> Register([FromBody] RegisterDto registerDto)
        {


            var user = new ApplicationUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                State = registerDto.State,
                ZipCode = registerDto.ZipCode,
                City = registerDto.City,
                Street = registerDto.Street,
                HauseNumber = registerDto.HouseNumber

            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return user;
        }
    }
}
