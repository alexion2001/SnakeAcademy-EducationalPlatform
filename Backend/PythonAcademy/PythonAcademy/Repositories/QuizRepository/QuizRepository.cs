using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{ 
    public class QuizRepository : GenericRepository<Quiz>, IQuizRepository
    {
        public QuizRepository(Context context) : base(context) { }

        public async Task<List<Quiz>> GetAllQuizes()
        {
            return await _context.Quizzes.ToListAsync();
        }

        public async Task<Quiz> GetQuizByIdWithQuestions(int idChapter)
        {
            return await _context.Quizzes.Include(q => q.Questions).Where(q => q.ChapterId.Equals(idChapter)).FirstOrDefaultAsync();
        }
    }
}
