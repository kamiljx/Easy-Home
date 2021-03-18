using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DataSource
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();

        void Rollback();
    }
}
