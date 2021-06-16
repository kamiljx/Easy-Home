using Models.DataSource;
using Models.DataSource.Entities;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataSource.Repository
{
    public interface IRealEstateRepository
    {
        RealEstate GetRealEstateById(int realEstateId);
        void AddRealEstate(RealEstate realEstate);
        RealEstate GetRealEstateByOwnerId(int ownerId);
        bool AssignRentiers(AddRentiersDto rentier);
        IEnumerable<ApplicationUser> GetRentiers(int realEstateId);

    }
}
