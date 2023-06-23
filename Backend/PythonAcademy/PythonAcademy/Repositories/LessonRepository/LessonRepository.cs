using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public class LessonRepository : GenericRepository<Lesson>, ILessonRepository
    {
        public LessonRepository(Context context) : base(context) { }

        public async Task<List<Lesson>> GetAllLesons()
        {
            return await _context.Lessons.ToListAsync();
        }
        public async Task<List<Lesson>> GetAllLesonsByChapterId(int idChapter)
        {
           return await _context.Lessons.Where(l => l.ChapterId.Equals(idChapter)).ToListAsync();
        }

        public async Task<Lesson> GetLessonById(int idLesson)
        {
            return await _context.Lessons.Where(l => l.LessonNumber.Equals(idLesson)).FirstOrDefaultAsync();
        }
    }
}
