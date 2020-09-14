using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Models
{
    public class Designation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string DesignationName { get; set; }
    }
}
