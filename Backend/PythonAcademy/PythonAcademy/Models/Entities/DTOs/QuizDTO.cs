namespace PythonAcademy.Models.Entities.DTOs
{
    public class QuizDTO
    {
        public int IdQuiz { get; set; }
        public int ChapterId { get; set; }

        public QuizDTO (Quiz quiz)
        {
            this.IdQuiz = quiz.IdQuiz;
            this.ChapterId = quiz.ChapterId;
        }
    }
}
