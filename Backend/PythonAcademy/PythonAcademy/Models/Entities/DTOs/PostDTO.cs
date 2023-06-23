namespace PythonAcademy.Models.Entities.DTOs
{
    public class PostDTO
    {
        public int IdPost { get; set; }
        public DateTime PostDate { get; set; }
        public string PostSubject { get; set; }
        public string PostText { get; set; }
        

        public int UserId { get; set; }
        public User User { get; set; }

        public string name {get; set; }
        public string surname { get; set; }
        public int avatarIndex { get; set; }

        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; } 

        public PostDTO(Post post) 
        { 
            this.IdPost = post.IdPost;
            this.PostDate = post.PostDate;
            this.PostSubject = post.PostSubject;
            this.PostText = post.PostText;           
            this.UserId = post.UserId;
            this.User = new User();
            this.name = this.User.Name;
            this.surname = this.User.Surname;
            this.avatarIndex = this.User.AvatarIndex;
            this.Comments = new List<Comment>();
            this.Likes = new List<Like>();
        }
    }
}
