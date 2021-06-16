using DataSource.Repository;
using System;

namespace DataSource
{
    public interface IUnitOfWork : IDisposable
    {
        IIdentityRepository IdentityRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        IRealEstateRepository RealEstateRepository { get; }
        void Commit();
        void Rollback();
    }
}
