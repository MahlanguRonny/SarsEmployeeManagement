using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> Add(EmployeeDto entity)
        {
            using var transaction = _employeeContext.Database.BeginTransaction();
            var newContact = _employeeContext.ContactDetails.Add(new ContactDetail
            {
                EmailAddress = entity.ContactDetailDto.EmailAddress,
                FacebookLink = entity.ContactDetailDto.FacebookLink,
                LandLineNumber = entity.ContactDetailDto.LandLineNumber,
                LinkedInLink = entity.ContactDetailDto.LinkedInLink,
                MobileNumber = entity.ContactDetailDto.MobileNumber
            });

           await  _employeeContext.SaveChangesAsync();

            var newAddress = _employeeContext.EmployeeAddresses.Add(new EmployeeAddress
            {
                AddressTypeId = entity.AddressDto.AddressTypeId,
                City = entity.AddressDto.City,
                PostalCode = entity.AddressDto.PostalCode,
                StreetName = entity.AddressDto.StreetName,
                Suburb = entity.AddressDto.Suburb
            });

            await _employeeContext.SaveChangesAsync();

            _employeeContext.Employees.Add(new Employee
            {
                AddressDetailsId = newAddress.Entity.Id,
                ContactDetailsId = newContact.Entity.Id,
                EmployeeNumber = entity.EmployeeNumber,
                FirstName = entity.FirstName,
                Surname = entity.Surname,
                Active = true
            });

            var result = await _employeeContext.SaveChangesAsync() > 0;

            transaction.Commit();

            return result;
        }

        public async Task<bool> Delete(int id)
        {
            bool deleted = false;
            var dbEnity = await _employeeContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if(dbEnity != null)
            {
                dbEnity.Active = false;
                _employeeContext.Attach(dbEnity);
                deleted = _employeeContext.SaveChanges() > 0;

            }

            return deleted;
        }

        public async Task<EmployeeDto> Get(int id)
        {
            EmployeeDto employeeDto = new EmployeeDto();
            var dbEntity = await _employeeContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
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

        public async Task<IEnumerable<EmployeeDto>> GetAll()
        {
            var employeeList = await _employeeContext.Employees.Select(x => new EmployeeDto
            {
                Id = x.Id,
                EmployeeNumber = x.EmployeeNumber,
                FirstName = x.FirstName,
                Surname = x.Surname
            }).ToListAsync();

            return employeeList;
        }

        public async Task<bool> Update(EmployeeDto entity)
        {
            bool updateResult = false;
            using var transaction = _employeeContext.Database.BeginTransaction();
            var empDbEntity = await _employeeContext.Employees.FirstOrDefaultAsync(x => x.Id == entity.Id);
            if (empDbEntity != null)
            {
                var contactDbEntity = await _employeeContext.ContactDetails.FirstOrDefaultAsync(x => x.Id == empDbEntity.ContactDetailsId);
                contactDbEntity.LandLineNumber = entity.ContactDetailDto.LandLineNumber;
                contactDbEntity.LinkedInLink = entity.ContactDetailDto.LinkedInLink;
                contactDbEntity.FacebookLink = entity.ContactDetailDto.FacebookLink;
                contactDbEntity.MobileNumber = entity.ContactDetailDto.MobileNumber;

                _employeeContext.Attach(contactDbEntity);
                _employeeContext.SaveChanges();

                var dbAddressEntity = await _employeeContext.EmployeeAddresses.FirstOrDefaultAsync(x => x.Id == empDbEntity.AddressDetailsId);
                dbAddressEntity.City = entity.AddressDto.City;
                dbAddressEntity.PostalCode = entity.AddressDto.PostalCode;
                dbAddressEntity.StreetName = entity.AddressDto.StreetName;
                dbAddressEntity.Suburb = entity.AddressDto.Suburb;


                empDbEntity.FirstName = entity.FirstName;
                empDbEntity.Surname = entity.Surname;
                empDbEntity.EmployeeNumber = entity.EmployeeNumber;

                _employeeContext.Attach(empDbEntity);
                updateResult = _employeeContext.SaveChanges() > 0;
                transaction.Commit();
            }

            return updateResult;
        }
    }
}
