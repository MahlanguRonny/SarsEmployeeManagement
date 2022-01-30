using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sars.EmployeeManagement.Api.Models.Repository
{
    public interface IDatabaseRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> Get(int id);
        Task<bool> Add(TEntity entity);
        Task<bool> Update(TEntity entity);
        Task<bool> Delete(int id);
    }
}
