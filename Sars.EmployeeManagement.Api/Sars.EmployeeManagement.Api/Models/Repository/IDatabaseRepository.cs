using System.Collections.Generic;

namespace Sars.EmployeeManagement.Api.Models.Repository
{
    public interface IDatabaseRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(int id);
        bool Add(TEntity entity);
        bool Update(TEntity entity);
        bool Delete(int id);
    }
}
