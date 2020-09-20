using EmployeeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.API.Helpers;
using EmployeeApp.API.Interface;

namespace EmployeeApp.API.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

       

        public async Task<Employee> GetEmployee(int id)
        {
            var employee = await _context.Employees.Include(d => d.Designation).FirstOrDefaultAsync(e => e.Id == id);

            return employee;
        }

        public async Task<PagedList<Employee>> GetEmployees(EmployeeParams employeeParams)
        {
            var employees = _context.Employees.Include(d => d.Designation)
                .OrderByDescending(e => e.LastActive).AsQueryable();

            //employees = employees.Where(u => u.Id != employeeParams.EmployeeId);

            //employees = employees.Where(u => u.Gender == employeeParams.Gender);

            

            //if (employeeParams.MinAge != 18 || employeeParams.MaxAge != 99)
            //{
            //    var minDob = DateTime.Today.AddYears(-employeeParams.MaxAge - 1);
            //    var maxDob = DateTime.Today.AddYears(-employeeParams.MinAge);

            //    employees = employees.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            //}

            if (!string.IsNullOrEmpty(employeeParams.OrderBy))
            {
                switch (employeeParams.OrderBy)
                {
                    case "created":
                        employees = employees.OrderByDescending(u => u.Created);
                        break;
                    default:
                        employees = employees.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<Employee>.CreateAsync(employees, employeeParams.PageNumber, employeeParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
