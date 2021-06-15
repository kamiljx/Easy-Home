using Autofac;
using DataSource;
using DataSource.Repository;
using Microsoft.AspNetCore.Http;
using Models.Interfaces;
using Services.Services;

namespace EasyHomeWebApp.AppStart
{
    public class DefaultModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ApplicationDbContext>().InstancePerLifetimeScope();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
            builder.RegisterType<PaymentRepository>().As<IPaymentRepository>().InstancePerLifetimeScope();
            builder.RegisterType<PaymentService>().As<IPaymentService>().InstancePerLifetimeScope();
            builder.RegisterType<IdentityRepository>().As<IIdentityRepository>().InstancePerLifetimeScope();
            builder.RegisterType<HttpContextAccessor>().As<IHttpContextAccessor>().SingleInstance();
            base.Load(builder);
        }
    }
}
