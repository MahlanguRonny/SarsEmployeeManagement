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
        public async Task<IActionResult> GetEmployeeList()
        {
            IEnumerable<EmployeeDto> employees = await _databaseRepository.GetAll();
            return Ok(employees);
        }

        [HttpPost]
        [Route("NewEmployee")]
        public async Task<IActionResult> NewEmployee([FromBody] EmployeeDto employeeDto)
        {
            if (employeeDto == null)
            {
                return BadRequest("Employee object is null");
            }

            await _databaseRepository.Add(employeeDto);
            return CreatedAtRoute(
                 "GetEmployeeById",
                 new { Id = employeeDto.Id },
                 employeeDto);
        }

        [HttpGet]
        [Route("GetEmployeeById/{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            EmployeeDto employee = await _databaseRepository.Get(id);
            if (employee == null)
            {
                return NotFound("Employee record with supplied details not found");
            }
            return Ok(employee);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            await _databaseRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeDto employeeDto)
        {
            if (employeeDto == null)
            {
                return BadRequest("Employee object cannot be null");
            }

            await _databaseRepository.Update(employeeDto);
            return NoContent();
        }
    }
}
