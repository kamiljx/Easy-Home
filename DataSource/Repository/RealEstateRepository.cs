using Models.DataSource;
using Models.DataSource.Entities;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataSource.Repository
{
    public class RealEstateRepository : IRealEstateRepository
    {
        private readonly ApplicationDbContext dbContext;
        public RealEstateRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void AddRealEstate(RealEstate realEstate)
        {
            dbContext.Add(realEstate);
        }

        public bool AssignRentiers(AddRentiersDto rentier)
        {
            throw new NotImplementedException();
        }

        public RealEstate GetRealEstateById(int realEstateId)
        {
            RealEstate realEstate = dbContext.RealEstates.FirstOrDefault(r => r.Id == realEstateId);

            return realEstate;
        }

        public RealEstate GetRealEstateByOwnerId(int ownerId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ApplicationUser> GetRentiers(int realEstateId)
        {
            throw new NotImplementedException();
        }
    }
}
