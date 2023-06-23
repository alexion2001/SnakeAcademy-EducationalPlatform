using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PythonAcademy.Models.Entities
{
    public class Quiz
    {

        [Key]
        public int IdQuiz { get; set; }

        public ICollection<Question> Questions { get; set; } // are mai multe intrebari
        public ICollection<QuizResult> QuizResults { get; set; } // are mai multe rezolvari

        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; } // face parte dintr-un capitol
    }
}
