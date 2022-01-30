using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sars.EmployeeManagement.Api.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options): base(options)
        {}
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ContactDetail> ContactDetails { get; set; }
        public DbSet<EmployeeAddress> EmployeeAddresses { get; set; }
    }
}
