using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Notification
    {
        [Key]
        public int IdNotification { get; set; }
        public DateTime FriendRequestDate { get; set; }
        public string Message { get; set; }
        public bool Status { get; set; } = false; //unread

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
