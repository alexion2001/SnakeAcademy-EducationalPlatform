namespace PythonAcademy.Models.Entities.DTOs
{
    public class FriendDTO
    {

        public int IdFriend { get; set; } //  id-ul prietenului catre care am trimis cererea
        public DateTime FriendRequestDate { get; set; }

        public int UserId { get; set; } //id-ul user-ului care a trimis cererea
        public User User { get; set; }


        public FriendDTO(Friend newFriend)
        {
            this.IdFriend = newFriend.IdFriend;
            this.User = new User();
            this.UserId = newFriend.UserId;
            this.FriendRequestDate = newFriend.FriendRequestDate;
            
        }
    }
}
