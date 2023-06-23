using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class User : IdentityUser<int>
    {
        public User() : base() { }

        public string Name { get; set; }
        public string Surname { get; set; }

        //student
        public int CurrentLesson { get; set; } = 1;
        public string Rank { get; set; } = string.Empty;
        public string StudentDescription { get; set; } = string.Empty;
        public int AvatarIndex { get; set; } = 0;

        public virtual ICollection<UserRole> UserRoles { get; set; }
              

        public ICollection<Friend> Friends { get; set; } // poate sa urmareasca mai multi prieteni
        public ICollection<Notification> Notifications { get; set; } // primeste notificari
        public ICollection<Post> Posts { get; set; } // posteaza postari pe forum
        public ICollection<QuizResult> QuizResults { get; set; } // rezolva mai multe quizuri
        public ICollection<Like> Likes { get; set; } // da mai multe like-uri
        public ICollection<Exercise> Exercises { get; set; } // rezolva mai multe exercitii


    }
}
