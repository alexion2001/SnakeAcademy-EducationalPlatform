namespace PythonAcademy.Models.Entities.DTOs
{
    public class ResultDTO
    {
        public int QuizId { get; set; }
       // public Quiz Quiz { get; set; }
       // public int UserId { get; set; }
       // public User User { get; set; }
        public int Score { get; set; }
        public bool Passed { get; set; }

        public ResultDTO(QuizResult quiz) 
        {
            this.QuizId = quiz.QuizId;
          //  this.Quiz = new Quiz();
          //  this.UserId = quiz.UserId;
          //  this.User = new User();
            this.Score = quiz.Score;
            this.Passed = quiz.Passed;
        }
    }
}
