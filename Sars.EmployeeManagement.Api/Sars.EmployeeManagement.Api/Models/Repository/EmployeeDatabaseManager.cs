using Sars.EmployeeManagement.Api.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sars.EmployeeManagement.Api.Models.Repository
{
    public class EmployeeDatabaseManager : IDatabaseRepository<EmployeeDto>
    {
        private readonly EmployeeContext _employeeContext;

        public EmployeeDatabaseManager(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }

        public bool Add(EmployeeDto entity)
        {
            using var transaction = _employeeContext.Database.BeginTransaction();
            var newContact = _employeeContext.ContactDetails.Add(new ContactDetail
            {
                EmailAddress = entity.ContactDetail.EmailAddress,
                FacebookLink = entity.ContactDetail.FacebookLink,
                LandLineNumber = entity.ContactDetail.LandLineNumber,
                LinkedInLink = entity.ContactDetail.LinkedInLink,
                MobileNumber = entity.ContactDetail.MobileNumber
            });

            _employeeContext.SaveChanges();

            var newAddress = _employeeContext.EmployeeAddresses.Add(new EmployeeAddress
            {
                AddressTypeId = entity.AddressDto.AddressTypeId,
                City = entity.AddressDto.City,
                PostalCode = entity.AddressDto.PostalCode,
                StreetName = entity.AddressDto.StreetName,
                Suburb = entity.AddressDto.Suburb
            });

            _employeeContext.SaveChanges();

            _employeeContext.Employees.Add(new Employee
            {
                AddressDetailsId = newAddress.Entity.Id,
                ContactDetailsId = newContact.Entity.Id,
                EmployeeNumber = entity.EmployeeNumber,
                FirstName = entity.FirstName,
                Surname = entity.Surname
            });

            var result = _employeeContext.SaveChanges() > 1 ;

            transaction.Commit();

            return result;
        }

        public void Delete(int id)
        {
            var dbEnity = _employeeContext.Employees.FirstOrDefault(x => x.Id == id);
            if(dbEnity != null)
            {
                //
            }
        }

        public EmployeeDto Get(int id)
        {
            EmployeeDto employeeDto = new EmployeeDto();
            var dbEntity = _employeeContext.Employees.FirstOrDefault(x => x.Id == id);
            if (dbEntity != null)
            {
                employeeDto.Id = dbEntity.Id;
                employeeDto.FirstName = dbEntity.FirstName;
                employeeDto.Surname = dbEntity.Surname;
                employeeDto.EmployeeNumber = dbEntity.EmployeeNumber;
                employeeDto.AddressDetailsId = dbEntity.AddressDetailsId;
                employeeDto.ContactDetailsId = dbEntity.ContactDetailsId;
            }

            return employeeDto;
        }

        public IEnumerable<EmployeeDto> GetAll()
        {
            var employeeList = _employeeContext.Employees.Select(x => new EmployeeDto
            {
                Id = x.Id,
                EmployeeNumber = x.EmployeeNumber,
                FirstName = x.FirstName,
                Surname = x.Surname
            }).ToList();

            return employeeList;
        }

        public bool Update(EmployeeDto entity)
        {
            bool updateResult = false;
            using var transaction = _employeeContext.Database.BeginTransaction();
            var empDbEntity = _employeeContext.Employees.FirstOrDefault(x => x.Id == entity.Id);
            if (empDbEntity != null)
            {
                var contactDbEntity = _employeeContext.ContactDetails.FirstOrDefault(x => x.Id == empDbEntity.ContactDetailsId);
                contactDbEntity.LandLineNumber = entity.ContactDetail.LandLineNumber;
                contactDbEntity.LinkedInLink = entity.ContactDetail.LinkedInLink;
                contactDbEntity.FacebookLink = entity.ContactDetail.FacebookLink;
                contactDbEntity.MobileNumber = entity.ContactDetail.MobileNumber;

                _employeeContext.Attach(contactDbEntity);
                _employeeContext.SaveChanges();


                empDbEntity.FirstName = entity.FirstName;
                empDbEntity.Surname = entity.Surname;
                empDbEntity.EmployeeNumber = entity.EmployeeNumber;

                _employeeContext.Attach(empDbEntity);
                updateResult = _employeeContext.SaveChanges() > 1;
            }

            return updateResult;
        }
    }
}
