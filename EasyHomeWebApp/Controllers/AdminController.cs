using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models.DataSource.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Models.DataSource;
using Microsoft.EntityFrameworkCore;

namespace EasyHomeWebApp.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(RoleManager<AppRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public UserManager<ApplicationUser> UserManager { get; }

        [HttpPost("createRole")]
        public async Task<IActionResult> CreateRole([FromBody] RoleDto roleDto)
        {
            var roleExist = await _roleManager.RoleExistsAsync(roleDto.RoleName);
            if (!roleExist)
            {
                var role = new AppRole { Name = roleDto.RoleName};
                await _roleManager.CreateAsync(role);
                return Ok(role);
            }
            return Conflict();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();
            return Ok(users);   
        }
    }

}
