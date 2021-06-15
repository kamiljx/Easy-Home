using Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOs
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public int RealEstateId { get; set; }
        public ICollection<int> Payers { get; set; }
        public string Name { get; set; }
        public string ReceiverBankAccount { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string CreatedAt { get; set; }
        public string PaymentDeadline { get; set; }
        public string? PayedAt { get; set; }
        public int PaymentStatus { get; set; }
    }
}
