using Models.DataSource;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.DTOs
{
    public class RealEstateDto
    {
        
        public string ownerName { get; set; }
        
        public string name { get; set; }
       
        public string City { get; set; }
        
        public string ZipCode { get; set; }
        
        public string Address { get; set; }

        
        public string Country { get; set; }

    }
}
