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
        }

        public Payment GetPayment(int paymentId)
        {
            Payment payment = dbContext.Payments.FirstOrDefault(p => p.Id == paymentId);

            return payment;
        }

        public IEnumerable<Payment> GetPaymentsForRealEstate(int realEstateId)
        {
            IEnumerable<Payment> payments = dbContext.Payments.AsEnumerable().Where(p => p.RealEstate.Id == realEstateId);

            return payments;
        }

        public IEnumerable<Payment> GetNotPaidPayments()
        {
            IEnumerable<Payment> payments = dbContext.Payments.AsEnumerable().Where(p => p.Status == PaymentStatus.ToPay || p.Status == PaymentStatus.Overdue);

            return payments;
        }

        public void ModifyPayment(Payment payment)
        {
            Payment _payment = dbContext.Payments.FirstOrDefault(p => p.Id == payment.Id);

            if (_payment != null)
            {
                _payment = payment;
            }
        }

        public void DeletePayment(int paymentId)
        {
            Payment payment = dbContext.Payments.FirstOrDefault(p => p.Id == paymentId);
            dbContext.Payments.Remove(payment);
        }
    }
}
