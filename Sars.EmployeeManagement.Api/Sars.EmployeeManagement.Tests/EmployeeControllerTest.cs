using Microsoft.AspNetCore.Mvc;
using Moq;
using Sars.EmployeeManagement.Api.Controllers;
using Sars.EmployeeManagement.Api.Models.DTOs;
using Sars.EmployeeManagement.Api.Models.Repository;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace Sars.EmployeeManagement.Tests
{
    public class EmployeeControllerTest
    {
        [Fact]
        public async Task Get_Employee_By_Id_Pass_Test()
        {
            //Given this mock/fake
            EmployeeDto employee = new EmployeeDto
            {
                AddressDetailsId = 1,
                ContactDetailsId = 1,
                AddressDto = new AddressDto
                {
                    AddressTypeId = 1,
                    City = "Joburg",
                    Id = 1,
                    PostalCode = 1045,
                    StreetName = ".Net",
                    Suburb = "Midrand"
                },
                ContactDetailDto = new ContactDetailDto
                {
                    EmailAddress = "Mronzer@test.com",
                    FacebookLink = "Facebook.com",
                    Id = 1,
                    LandLineNumber = "01145697450",
                    LinkedInLink = "LinkedIn.com",
                    MobileNumber = "07898542366"
                },
                FirstName = "Mronzer",
                EmployeeNumber = "5454545",
                Id = 1,
                Surname = "Maronza"
            };

            var mockService = new Mock<IDatabaseRepository<EmployeeDto>>();
            mockService.Setup(x => x.Get(employee.Id)).ReturnsAsync(employee);

            EmployeeController employeeController = new EmployeeController(mockService.Object);

            var result = await employeeController.GetEmployeeById(employee.Id) as ObjectResult;
            var actualResult = result.Value;

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            mockService.Verify(x => x.Get(It.IsAny<int>()));
            Assert.Equal(employee.Id, ((EmployeeDto)actualResult).Id);
        }


        public IEnumerable<EmployeeDto> GetAllEmployees()
        {
            List<EmployeeDto> employees = new List<EmployeeDto>();
            employees.Add(new EmployeeDto
            {
                AddressDetailsId = 1,
                ContactDetailsId = 1,
                AddressDto = new AddressDto
                {
                    AddressTypeId = 1,
                    City = "Joburg",
                    Id = 1,
                    PostalCode = 1045,
                    StreetName = ".Net",
                    Suburb = "Midrand"
                },
                ContactDetailDto = new ContactDetailDto
                {
                    EmailAddress = "Mronzer@test.com",
                    FacebookLink = "Facebook.com",
                    Id = 1,
                    LandLineNumber = "01145697450",
                    LinkedInLink = "LinkedIn.com",
                    MobileNumber = "0789854266"
                },
                FirstName = "Mronzer",
                EmployeeNumber = "5454545",
                Id = 1,
                Surname = "Maronza"
            });

            return employees;
        }

    }
}

