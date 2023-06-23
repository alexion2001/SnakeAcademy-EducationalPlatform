using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public class ChapterRepository : GenericRepository<Chapter>, IChapterRepository
    {
        public ChapterRepository(Context context) : base(context) { }

        public async Task<List<Chapter>> GetAllChapters()
        {
            return await _context.Chapters
            .Include(c => c.Lessons)
            .Include(c => c.Quiz)
            .ToListAsync();


        }
        public async Task<List<Chapter>> GetAllChaptersByUser(int idUser)
        {
            return await _context.Chapters
            .Include(c => c.Lessons)
            .Include(c => c.Quiz)            
            .ThenInclude(q => q.QuizResults.Where(qr => qr.UserId == idUser))
            .ToListAsync();


        }

        public async Task<Chapter> GetChapterById(int idChapter)
        {
            return await _context.Chapters.Where(c => c.IdChapter.Equals(idChapter)).FirstOrDefaultAsync();
        }

        public async Task<Chapter> GetChapterWithLessons(int idChapter)
        {
            return await _context.Chapters.Include(c => c.Lessons).Where(c => c.IdChapter.Equals(idChapter)).FirstOrDefaultAsync();
        }
    }
}
