using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Models
{
    public class Salary
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int TotalSalary { get; set; }
        [Required]
        public int DesignationId { get; set; }

    }
}
