using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.API.Models;
using EmployeeApp.API.Helpers;

namespace EmployeeApp.API.Interface
{
    public interface IEmployeeRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<Employee>> GetEmployees(EmployeeParams employeeParams);
        Task<Employee> GetEmployee(int id);
    }
}
