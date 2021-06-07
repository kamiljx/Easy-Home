using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUserName { get; set; }
        public ApplicationUser Sender { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUserName { get; set; }
        public ApplicationUser Recipient { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.Now;
        public bool SebderDeleted { get; set; }
        public bool ReciepientDeleted { get; set; }


    }
}

