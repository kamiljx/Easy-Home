using DataSource;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Models.Interfaces;
using Services.Services;

namespace EasyHomeWebApp.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<ApplicationDbContext>(o =>
            {
                o.UseSqlServer(config["Data:EasyHome:ConnectionString"]);
            });

            return services;
        }
    }
}
