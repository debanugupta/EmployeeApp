using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Dtos
{
    public class EmployeeForDetailedDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }
        public int Age { get; set; }
        public string DesignationId { get; set; }
        public string DesignationName { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}
