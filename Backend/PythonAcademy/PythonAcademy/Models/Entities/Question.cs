using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Question
    {
        [Key]
        public int IdQuestion { get; set; }
        public string QuestionText { get; set; }
        public string CorrentAnswer { get; set; }
        public string WrongAnswer1 { get; set; }
        public string WrongAnswer2 { get; set; }

        public int QuizId { get; set; } // are mai multe intrebari
        public Quiz Quiz;
    }
}
