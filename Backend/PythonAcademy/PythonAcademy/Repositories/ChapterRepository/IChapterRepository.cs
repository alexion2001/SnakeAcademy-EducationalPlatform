using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface IChapterRepository : IGenericRepository<Chapter>
    {
        Task<List<Chapter>> GetAllChapters();
        Task<List<Chapter>> GetAllChaptersByUser(int idUser);
        Task<Chapter> GetChapterById(int idChapter);
        Task<Chapter> GetChapterWithLessons(int idChapter);

    }
}
