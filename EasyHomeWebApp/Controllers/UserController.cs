using Microsoft.AspNetCore.Mvc;
using Models.DataSource;
using Models.DTOs;
using Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyHomeWebApp.Controllers
{
    public class UserController : BaseApiController
    {
        private IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            var members = users.Select(u => new MemberDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                DateOfBirth = u.DateOfBirth,
                State = u.State,
                ZipCode = u.ZipCode,
                Address = u.Address,
                City = u.City
            });
            return Ok(members);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var u = await _userRepository.GerUserByUserNameAsync(username);
            var member = new MemberDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                DateOfBirth = u.DateOfBirth,
                State = u.State,
                ZipCode = u.ZipCode,
                Address = u.Address,
                City = u.City
            };
            return member;
        }

    }
}
