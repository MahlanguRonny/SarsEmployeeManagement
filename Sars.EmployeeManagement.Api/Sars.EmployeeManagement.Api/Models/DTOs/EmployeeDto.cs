using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sars.EmployeeManagement.Api.Models.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string EmployeeNumber { get; set; }
        public int ContactDetailsId { get; set; }
        public int AddressDetailsId { get; set; }
        public ContactDetail ContactDetail { get; set; }
        public AddressDto AddressDto { get; set; }
    }
}
