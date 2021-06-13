using DataSource;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models.DTOs;
using Models.DataSource.Entities;
using Microsoft.AspNetCore.Identity;
using Models.DataSource;
using Microsoft.EntityFrameworkCore;

namespace EasyHomeWebApp.Controllers
{
    public class RealEstateController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RealEstateController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("owner")]
        public async Task<IQueryable<RealEstate>> GetRealEstatesByOwnerName(string Name)
        {
            var user = await _userManager.FindByNameAsync(Name);
            var realEstates = _context.RealEstates.Where(x => x.Owner == user);
            return realEstates;
        }

        [HttpGet("rentier")]
        public async Task<RealEstate> GetRealEstatesByRentierName(string Name)
        {
            var user = await _userManager.FindByNameAsync(Name);
            var realEstate = await _context.RealEstates.Where(x => x.Rentiers.Contains(user)).FirstOrDefaultAsync();
            return realEstate;
        }


        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] RealEstateDto realEstateDto)
        {
            var realEstate = new RealEstate
            {
                Owner = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == realEstateDto.ownerName),
                Name = realEstateDto.name,
                City = realEstateDto.City,
                ZipCode = realEstateDto.ZipCode,
                Address = realEstateDto.Address,
                Country = realEstateDto.Country,
                AccessCode = Guid.NewGuid()

            };

            var result = await _context.RealEstates.AddAsync(realEstate);
            _context.SaveChanges();
            return Ok(realEstate);
        }

        [HttpPost("addrentier")]
        public async Task<IActionResult> AddRentier(AddRentiersDto addRentiersDto)
        {

            //var user = _context.Users.Where(x => x.UserName == addRentiersDto.userName).FirstOrDefault();
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == addRentiersDto.userName);
            if (user == null) return BadRequest("There is no user with this email.");
            var realEstate = _context.RealEstates.Where(e => e.Id == addRentiersDto.realEstateId).FirstOrDefault();
            if (realEstate == null) return BadRequest("There is no real estate with this id");
            realEstate.Rentiers = new List<ApplicationUser>();
            realEstate.Rentiers.Add(user);


            _context.SaveChanges();
            //realEstate.Rentiers.Add(user);
            return Ok(realEstate);




        }

        [HttpGet("rentiers/{realEstateId}")]
        public async Task<IActionResult> GetAllRentiersById(int realEstateId)
        {
            var realEstate = await _context.RealEstates.Where(e => e.Id == realEstateId).FirstOrDefaultAsync();
            if (realEstate == null) return BadRequest("There is no real estate with this id");
            var rentiers = _userManager.Users.Where(u => u.RealEstateId == realEstateId);
            return Ok(rentiers);


        }

        //[HttpPost("addrentier")]
        //public async Task<IActionResult> AddRentier(AddRentiersDto addRentiersDto)
        //{

        //    //var user = _context.Users.Where(x => x.UserName == addRentiersDto.userName).FirstOrDefault();
        //    var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == addRentiersDto.userName);
        //    if (user == null) return BadRequest("There is no user with this email.");

        //    user.Estate = addRentiersDto.realEstateId;


        //    _context.SaveChanges();
        //    //realEstate.Rentiers.Add(user);
        //    return Ok();




        //}

        //[HttpGet("rentiers")]
        //public async Task<IActionResult> GetAllRentiersById(int realEstateId)
        //{
        //    var rentiers = _userManager.Users.Where(x => x.RealEstateId == realEstateId);
        //    return Ok(rentiers);
        //}

    }

}
