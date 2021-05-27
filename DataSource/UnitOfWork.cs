using DataSource.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Models.DataSource;

namespace DataSource
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        private IPaymentRepository paymentRepository;
        private IIdentityRepository identityRepository;

        public UnitOfWork()
        {
            _dbContext = new ApplicationDbContext();
        }

        public IIdentityRepository IdentityRepository
        {
            get
            {
                if(identityRepository == null)
                {
                    identityRepository = new IdentityRepository(_dbContext);
                }

                return identityRepository;
            }
        }

        public IPaymentRepository PaymentRepository
        {
            get
            {
                if(paymentRepository == null)
                {
                    paymentRepository = new PaymentRepository(_dbContext);
                }

                return paymentRepository;
            }
        }

        public void Commit()
        {
            _dbContext.SaveChanges();

            if (_dbContext.Database.CurrentTransaction != null)
            {
                _dbContext.Database.CurrentTransaction.Commit();
            }
        }

        public void Rollback()
        {
            if (_dbContext.Database.CurrentTransaction != null)
            {
                _dbContext.Database.CurrentTransaction.Rollback();
            }
        }

        public void Dispose()
        {
            if (_dbContext.Database.CurrentTransaction != null)
            {
                _dbContext.Database.CurrentTransaction.Dispose();
            }

            if (_dbContext != null)
            {
                _dbContext.Dispose();
            }
        }

    }
}
