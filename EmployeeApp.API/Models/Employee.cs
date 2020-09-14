using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string FirstName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string LastName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string EmailId { get; set; }
        [Required]
        [Column(TypeName = "varchar(1)")]
        public string Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public int DesignationId { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public Designation Designation { get; set; }
    }
}
