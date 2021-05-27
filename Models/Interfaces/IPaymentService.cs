using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Interfaces
{
    public interface IPaymentService
    {
        bool AddPayment(PaymentDto paymentDto);
    }
}
