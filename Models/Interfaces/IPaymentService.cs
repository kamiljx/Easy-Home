using Models.DataSource.Entities;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Interfaces
{
    public interface IPaymentService
    {
        IEnumerable<Payment> GetPayments(int realEstateId);
        bool AddPayment(PaymentDto paymentDto);
        bool RealizePayment(int paymentId, int rentierId);
        bool ModifyPaymentStatus(int paymentId, int paymentStatus);
        bool DeletePayment(int paymentId);
    }
}
