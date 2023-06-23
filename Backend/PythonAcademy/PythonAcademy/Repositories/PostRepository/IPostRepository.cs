using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<List<Post>> GetAllPostsWithComments();
        
    }
}
