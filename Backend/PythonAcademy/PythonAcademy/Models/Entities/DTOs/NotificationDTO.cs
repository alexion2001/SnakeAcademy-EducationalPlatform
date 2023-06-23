namespace PythonAcademy.Models.Entities.DTOs
{
    public class NotificationDTO
    {
        public int IdNotification { get; set; }
        public DateTime FriendRequestDate { get; set; }
        public string Message { get; set; }
        public bool Status { get; set; } = false; 

        public int UserId { get; set; }
        public User User { get; set; }

        public NotificationDTO(Notification notification) 
        {
            this.IdNotification = notification.IdNotification;
            this.Status = notification.Status;
            this.FriendRequestDate = notification.FriendRequestDate;
            this.Message = notification.Message;
            this.UserId = notification.UserId;
            this.User = new User();

        }

    }
}
