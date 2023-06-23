namespace PythonAcademy.Models.Entities.DTOs
{
    public class CreatePostDTO
    {
        public string PostSubject { get; set; }
        public string PostText { get; set; }
        public int UserId { get; set; }
    }
}
