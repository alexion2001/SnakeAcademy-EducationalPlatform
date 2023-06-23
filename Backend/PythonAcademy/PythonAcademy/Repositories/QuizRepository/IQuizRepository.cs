using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface IQuizRepository : IGenericRepository<Quiz>
    {
        Task<List<Quiz>> GetAllQuizes();
        Task<Quiz> GetQuizByIdWithQuestions(int idChapter);
    }
}
