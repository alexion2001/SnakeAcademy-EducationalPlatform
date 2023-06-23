using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface ILessonRepository : IGenericRepository<Lesson>
    {
        Task<List<Lesson>> GetAllLesons();
        Task<List<Lesson>> GetAllLesonsByChapterId(int idChapter);
        Task<Lesson> GetLessonById(int idLesson);
    }
}
