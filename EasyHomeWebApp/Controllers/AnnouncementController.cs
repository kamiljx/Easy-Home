using DataSource;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.DataSource;
using Models.DataSource.Entities;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyHomeWebApp.Controllers
{
    public class AnnouncementController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AnnouncementController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> AddAnoucement([FromBody] AnnoucementDto dto)
        {
            var anoucement = new Announcement
            {
                Title = dto.Title,
                Description = dto.Description,
                Date = dto.Date,
                Type = dto.Type,
                RealEstate = await _context.RealEstates.FindAsync(dto.RealEstateId)

            };
            await _context.Announcements.AddAsync(anoucement);
            _context.SaveChanges();
            return Ok(anoucement);
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAnnouncementsByid(int estateId)
        {
            var estate = await _context.RealEstates.FindAsync(estateId);

            var annoucements = await _context.Announcements
                .Where(a => a.RealEstate == estate)
                .Select(u => new AnnoucementDto
                 {
                     Title = u.Title,
                     Description = u.Description,
                     Type = u.Type,
                     Date = u.Date,
                     Id = u.Id,
                     RealEstateId = u.RealEstate.Id

                 }).ToListAsync();
            ;

            return Ok(annoucements);
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int annaucementId)
        {
            var estate = await _context.Announcements.FindAsync(annaucementId);
            _context.Announcements.Remove(estate);
            _context.SaveChanges();
            return Ok();
        }
        
    }
}
