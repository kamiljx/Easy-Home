using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.DataSource.Entities
{
    public class RealEstate
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string OwnerId { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string ZipCode { get; set; }
        [Required]
        public string StreetName { get; set; }
        [Required]
        public string HouseNumber { get; set; }
        [Required]
        public string Country { get; set; }
        // Access code will be generated on creation of real estate
        public Guid AccessCode { get; set; }
        // Tu powinna być relacja one-to-many (jedna nieruchomość - wiele płatności). Sprawdzić czy napewno to się tak definiuje
        public List<Payment> Payments { get; set; }

    }
}
