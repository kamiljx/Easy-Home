using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BankAccountNumber { get; set; }
        public string Description { get; set; }
        public ApplicationUser Payer { get; set; }

        // TODO
    }
}
