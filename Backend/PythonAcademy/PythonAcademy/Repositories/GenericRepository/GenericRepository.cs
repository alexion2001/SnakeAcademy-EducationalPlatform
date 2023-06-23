using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;

namespace PythonAcademy.Repositories.GenericRepository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly Context _context; //private ?
        public GenericRepository(Context context) 
        {
           _context = context; //dependency injection, context dependent de repository
        }

        public void Create(TEntity entity)
        {           
            _context.Set<TEntity>().Add(entity); //specific entitatea pe care fac actiunea
        }
        public void CreateRange(IEnumerable<TEntity> entities)
        {
            _context.Set<TEntity>().AddRange(entities);
        }

        public void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public IQueryable<TEntity> GetAll() // tine minte query spre bd
        {
            return _context.Set<TEntity>().AsNoTracking(); //nu se modifica in bd cand le modific local
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
        }

    }
}
