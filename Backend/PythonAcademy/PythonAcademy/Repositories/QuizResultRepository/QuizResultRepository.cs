using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public class QuizResultRepository : GenericRepository<QuizResult>, IQuizResultRepository
    {
        public QuizResultRepository(Context context) : base(context) { }

        public async Task<List<QuizResult>> GetAllResultsFromUser(int idUser)
        {
            return await _context.QuizResults.Where(qr => qr.UserId.Equals(idUser)).ToListAsync();
        }

        public async Task<QuizResult> GetResultById(int idQuiz, int idUser)
        {
            return await _context.QuizResults.Where(qr => qr.UserId.Equals(idUser) && qr.QuizId.Equals(idQuiz)).FirstOrDefaultAsync();
        }
    }
}
