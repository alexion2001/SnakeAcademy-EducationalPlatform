using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface IQuizResultRepository : IGenericRepository<QuizResult>
    {
        Task<List<QuizResult>> GetAllResultsFromUser(int idUser);
        Task<QuizResult> GetResultById(int idQuiz, int idUser);
      
    }
}
