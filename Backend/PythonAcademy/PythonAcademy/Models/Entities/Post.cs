using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Post
    {
        [Key]
        public int IdPost { get; set; }
        public DateTime PostDate { get; set; }
        public string PostSubject { get; set; }
        public string PostText { get; set; }
        public ICollection<Like> Likes { get; set; } // are mai multe like-uri

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Comment> Comments { get; set; } //o postare are mai multe comentarii
    }
}
