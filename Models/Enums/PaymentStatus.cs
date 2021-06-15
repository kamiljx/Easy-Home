using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Enums
{
    public enum PaymentStatus
    {
        ToPay = 1,
        Paid,
        Rejected,
        Overdue
    }
}
