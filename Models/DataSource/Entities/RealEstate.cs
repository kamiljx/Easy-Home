using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.DataSource.Entities
{
    public class RealEstate
    {
        public int Id { get; set; }
        
        public ApplicationUser Owner { get; set; }
        
        public string Name { get; set; }
        
        public string City { get; set; }
        
        public string ZipCode { get; set; }
        
        public string Address { get; set; }
        
        public string Country { get; set; }
        // Access code will be generated on creation of real estate
        public Guid AccessCode { get; set; }
        // Tu powinna być relacja one-to-many (jedna nieruchomość - wiele płatności). Sprawdzić czy napewno to się tak definiuje
        public ICollection<Payment> Payments { get; set; }
   
        public ICollection<ApplicationUser> Rentiers { get; set; }

        public ICollection<Announcement> Announcements { get; set; }
    }
}
