using Models.DataSource.Entities;
using Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataSource.Repository
{
    public interface IPaymentRepository
    {
        void AddPaymentToRealEstate(Payment payment);
        Payment GetPaymentForRealEstate(int realEstateId);
        void ModifyPayment(Payment payment);
    }
}
