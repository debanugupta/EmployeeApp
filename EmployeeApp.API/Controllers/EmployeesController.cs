using AutoMapper;
using EmployeeApp.API.Data;
using EmployeeApp.API.Dtos;
using EmployeeApp.API.Helpers;
using EmployeeApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repo;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery] EmployeeParams employeeParams)
        {
            //var currentEmployeeId = int.Parse(Employee.FindFirst(ClaimTypes.NameIdentifier).Value);

            //var employeeFromRepo = await _repo.GetEmployee(currentEmployeeId);

            //employeeParams.EmployeeId = currentEmployeeId;

            //if (string.IsNullOrEmpty(employeeParams.Gender))
            //{
            //    employeeParams.Gender = employeeFromRepo.Gender == "male" ? "female" : "male";
            //}

            var employees = await _repo.GetEmployees(employeeParams);

            var employeesToReturn = _mapper.Map<IEnumerable<EmployeeForListDto>>(employees);

            Response.AddPagination(employees.CurrentPage, employees.PageSize,
                employees.TotalCount, employees.TotalPages);

            return Ok(employeesToReturn);
        }

        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _repo.GetEmployee(id);

            if (employee == null)
            {
                return NotFound();
            }

            var employeeToReturn = _mapper.Map<EmployeeForDetailedDto>(employee);

            return Ok(employeeToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeForUpdateDto employeeForUpdateDto)
        {

            var employeeFromRepo = await _repo.GetEmployee(id);

            if (employeeFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(employeeForUpdateDto, employeeFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating employee {id} failed on save");
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeForCreationDto employeeForCreationDto)
        {
            var employee = _mapper.Map<Employee>(employeeForCreationDto);

            _repo.Add(employee);

            if (await _repo.SaveAll())
            {
                var employeeToReturn = _mapper.Map<EmployeeForReturnDto>(employee);
                return CreatedAtRoute("GetEmployee", new { id = employee.Id }, employeeToReturn);
            }

            return BadRequest("Could not add the employee");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employeeFromRepo = await _repo.GetEmployee(id);

            if (employeeFromRepo == null)
            {
                return NotFound();
            }

            _repo.Delete(employeeFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the employee");
        }

    }
}
