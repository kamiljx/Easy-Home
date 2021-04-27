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

        [HttpGet("name")]
        public async Task<IQueryable<RealEstate>> GetRealEstatesById(RealEstateDto realEstateDto)
        {
            var user = await _userManager.FindByNameAsync(realEstateDto.ownerName);
            var realEstates = _context.RealEstates.Where(x => x.Owner == user);
            return realEstates;
        }

        [HttpPost("create")]
        public RealEstate Create([FromBody] RealEstateDto realEstateDto)
        {
            var realEstate = new RealEstate
            {
                Owner = _userManager.Users.Where(u => u.UserName == realEstateDto.ownerName).FirstOrDefault(),
                Name = realEstateDto.name,
                City = realEstateDto.City,
                ZipCode = realEstateDto.ZipCode,
                Address = realEstateDto.Address,
                Country = realEstateDto.Country,
                AccessCode = new Guid()

            };

            var result = _context.RealEstates.AddAsync(realEstate);
            _context.SaveChanges();
            return realEstate;
        }
    }
}
