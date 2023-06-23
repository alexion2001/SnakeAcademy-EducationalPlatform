using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface ICommentRepository : IGenericRepository<Comment>
    {
        Task<List<Comment>> GetAllCommentsByPost(int postId);
    }
}
