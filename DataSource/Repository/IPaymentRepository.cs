using Models.DataSource.Entities;
using System.Collections.Generic;

namespace DataSource.Repository
{
    public interface IPaymentRepository
    {
        void AddPaymentToRealEstate(Payment payment);
        Payment GetPayment(int paymentId);
        IEnumerable<Payment> GetPaymentsForRealEstate(int realEstateId);
        IEnumerable<Payment> GetNotPaidPayments();
        void ModifyPayment(Payment payment);
    }
}