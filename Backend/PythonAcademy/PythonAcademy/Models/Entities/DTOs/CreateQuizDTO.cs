namespace PythonAcademy.Models.Entities.DTOs
{
    public class CreateQuizDTO
    {
        public int ChapterId { get; set; }
        public ICollection<Question> Questions { get; set; } // are mai multe intrebari
        
    }
}
