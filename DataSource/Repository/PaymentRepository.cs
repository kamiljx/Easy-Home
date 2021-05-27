using Models.DataSource.Entities;
using Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataSource.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PaymentRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public void AddPaymentToRealEstate(Payment payment)
        {
            dbContext.Payments.Add(payment);
            dbContext.SaveChanges();
        }

        public Payment GetPaymentForRealEstate(int realEstateId)
        {
            Payment payment = dbContext.Payments.FirstOrDefault(p => p.RealEstateId == realEstateId);

            return payment;
        }

        public void ModifyPayment(Payment payment)
        {
            Payment _payment = dbContext.Payments.FirstOrDefault(p => p.Id == payment.Id);

            if (_payment != null)
            {
                _payment = payment;
            }

            dbContext.SaveChanges();
        }
    }
}
