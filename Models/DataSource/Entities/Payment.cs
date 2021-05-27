using Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ReceiverBankAccount { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime PaymentDeadline { get; set; }
        public DateTime? PayedAt { get; set; }
        public PaymentStatus Status { get; set; }
        public ICollection<ApplicationUser> Payers { get; set; }
        public RealEstate RealEstate { get; set; }
    }
}
