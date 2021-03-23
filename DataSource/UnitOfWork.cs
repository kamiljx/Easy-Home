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
            throw new NotImplementedException();
        }

        public void Rollback()
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

    }
}
