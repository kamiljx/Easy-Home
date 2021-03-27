using Models.DataSource;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataSource
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        public UnitOfWork()
        {
            _dbContext = new ApplicationDbContext("name = ConnectionString:EasyHomeDbConnectionString");
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
