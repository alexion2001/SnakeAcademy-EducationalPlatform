using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface INotificationRepository : IGenericRepository<Notification>
    {
        Task<List<Notification>> GetAllNotificationFromUser(int idUser);
    }
}
