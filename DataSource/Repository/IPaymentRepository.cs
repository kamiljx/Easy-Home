using Models.DataSource.Entities;
using System.Collections.Generic;
using System.Linq;

namespace DataSource.Repository
{
    public interface IPaymentRepository
    {
        void AddPaymentToRealEstate(Payment payment);
        Payment GetPayment(int paymentId);
        
        IQueryable<Payment> GetPaymentsForRealEstate(int realEstateId);
        IEnumerable<Payment> GetNotPaidPayments();
        void ModifyPayment(Payment payment);
        void DeletePayment(int paymentId);
    }
}