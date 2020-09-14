using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.API.Data;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            //var userId = int.Parse(resultContext.HttpContext.User
            //    .FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IEmployeeRepository>();
            //var user = await repo.GetEmployee(userId);
            //user.LastActive = DateTime.Now;
            //await repo.SaveAll();
        }
    }
}
