using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models.DataSource.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace EasyHomeWebApp.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly RoleManager<AppRole> _roleManager;

        public AdminController(RoleManager<AppRole> roleManager)
        {
            _roleManager = roleManager;
        }

        [HttpPost("createRole")]
        public async Task<IActionResult> CreateRole([FromBody] object roleName)
        {
            var roleExist = await _roleManager.RoleExistsAsync(roleName.ToString());
            if (!roleExist)
            {
                var role = new AppRole { Name = roleName.ToString() };
                await _roleManager.CreateAsync(role);
                return Ok();
            }
            return Conflict();
        }
    }

}
