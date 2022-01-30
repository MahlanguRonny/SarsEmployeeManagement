using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sars.EmployeeManagement.Api.Models.DTOs;
using Sars.EmployeeManagement.Api.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sars.EmployeeManagement.Api.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IDatabaseRepository<EmployeeDto> _databaseRepository;

        public EmployeeController(IDatabaseRepository<EmployeeDto> databaseRepository)
        {
            _databaseRepository = databaseRepository;
        }

        [HttpGet]
        [Route("GetEmployeeList")]
        public IActionResult GetEmployeeList()
        {
            IEnumerable<EmployeeDto> employees = _databaseRepository.GetAll();
            return Ok(employees);
        }

        [HttpPost]
        [Route("NewEmployee")]
        public IActionResult NewEmployee(EmployeeDto employeeDto)
        {
            if (employeeDto == null)
            {
                return BadRequest("Employee object is null");
            }

            _databaseRepository.Add(employeeDto);
            return CreatedAtRoute(
                 "Get",
                 new { Id = employeeDto.Id },
                 employeeDto);
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            EmployeeDto employee = _databaseRepository.Get(id);
            if (employee == null)
            {
                return NotFound("Employee record with supplied details not found");
            }
            return Ok(employee);
        }
    }
}
