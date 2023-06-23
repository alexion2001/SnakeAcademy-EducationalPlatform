using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Friend
    {
        [Key]
        public int IdRequest { get; set; }
        public int IdFriend { get; set; }  //id-ul user-ului care a trimis cererea
        public DateTime FriendRequestDate { get; set; }

        public User User { get; set; }
        public int UserId { get; set; } //  id-ul prietenului catre care am trimis cererea


    }
}
