namespace PythonAcademy.Models.Entities.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }

        public string Role { get; set; }
       

        //student
        public int CurrentLesson { get; set; }
        public string Rank { get; set; } 
        public string StudentDescription { get; set; } = string.Empty;
        public int AvatarIndex { get; set; }

        public List<Like> Likes { get; set; }
        public List<Friend> Friends { get; set; }
        public List<Notification> Notifications { get; set; }
        public List<QuizResult> QuizResults { get; set; }

        
        public UserDTO(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Surname = user.Surname;
            CurrentLesson = user.CurrentLesson;
            Rank = user.Rank;
            StudentDescription = user.StudentDescription;
            AvatarIndex = user.AvatarIndex;

            Likes = new List<Like>();
            Friends = new List<Friend>();
            Notifications = new List<Notification>();
            QuizResults = new List<QuizResult>();

        }
    }
}
