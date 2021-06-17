using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOs
{
    public class AnnoucementDto
    {
        public int Id { get; set; }
        public int RealEstateId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}
