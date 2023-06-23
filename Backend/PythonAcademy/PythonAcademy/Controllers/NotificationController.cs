using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public NotificationController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }

        [HttpGet("getNotifications/{idUser}")]
        public async Task<IActionResult> GetAllUserNotifications(int idUser)
        {
            var notifications = await _repository.Notification.GetAllNotificationFromUser(idUser);

            var notificationsToReturn = new List<NotificationDTO>();

            foreach (var noti in notifications)
            {
                notificationsToReturn.Add(new NotificationDTO(noti));
            }

            return Ok(notificationsToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotification(CreateNotificationDTO dto)
        {
            Notification newNotification = new Notification();

            newNotification.UserId = dto.UserId;
            newNotification.FriendRequestDate = DateTime.Now;
            newNotification.Message = dto.Message;
            newNotification.Status = false; //Unread

            _repository.Notification.Create(newNotification);
            await _repository.Notification.SaveAsync();

            return Ok(new NotificationDTO(newNotification));
        }

        [HttpPatch("updateStatus/{notificationId}")]
        public async Task<IActionResult> Update(int notificationId)
        {
            Notification notification = await _repository.Notification.GetByIdAsync(notificationId);
            notification.Status = true; //read
            _repository.Notification.Update(notification);

            await _repository.SaveAsync();

            return NoContent();
        }

    }
}
