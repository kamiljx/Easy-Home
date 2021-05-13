using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource.Entities
{
    public class Announcement
    {
        public int Id { get; set; }
        public RealEstate RealEstate { get; set; } //context
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }
}
