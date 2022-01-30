using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Sars.EmployeeManagement.Api.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public int Surname { get; set; }
        public string EmployeeNumber { get; set; }
        public int ContactDetailsId { get; set; }
        public int AddressDetailsId { get; set; }

    }
}
