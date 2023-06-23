namespace PythonAcademy.Models.Entities.DTOs
{
    public class CommentDTO
    {
        public string CommentText { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

        public CommentDTO(Comment commnent) 
        { 
            this.CommentText = commnent.CommentText;
            this.PostId = commnent.PostId;
            this.Post = new Post();
        }
    }
}
