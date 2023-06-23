namespace PythonAcademy.Repositories.GenericRepository
{
    public interface IGenericRepository<TEntity>
    {
        //Get Data
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetByIdAsync(int id); 


        // Create
        void Create(TEntity entity);
        void CreateRange(IEnumerable<TEntity> entities);

        // Update
        void Update(TEntity entity);

        // Delete
        void Delete(TEntity entity);

        // Save
        Task<bool> SaveAsync();
    }
}
