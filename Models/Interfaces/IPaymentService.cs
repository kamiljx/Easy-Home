using Models.DataSource.Entities;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Models.Interfaces
{
    public interface IPaymentService
    {
        IQueryable<Payment> GetPayments(int realEstateId);
        bool AddPayment(PaymentDto paymentDto);
        bool RealizePayment(int paymentId, int rentierId);
        bool ModifyPaymentStatus(int paymentId, int paymentStatus);
        bool DeletePayment(int paymentId);
    }
}
