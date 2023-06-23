using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(Context context) : base(context)
        {
        }

        public async Task<List<Notification>> GetAllNotificationFromUser(int idUser)
        {
            return await _context.Notifications.Where(n => n.UserId == idUser).ToListAsync();
        }
    }
}
