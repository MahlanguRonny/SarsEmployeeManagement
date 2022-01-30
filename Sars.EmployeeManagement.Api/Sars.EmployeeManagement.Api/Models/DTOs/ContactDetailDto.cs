using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sars.EmployeeManagement.Api.Models.DTOs
{
    public class ContactDetailDto
    {
        public int Id { get; set; }
        public string LandLineNumber { get; set; }
        public string MobileNumber { get; set; }
        public string FacebookLink { get; set; }
        public string EmailAddress { get; set; }
        public string LinkedInLink { get; set; }
    }
}
