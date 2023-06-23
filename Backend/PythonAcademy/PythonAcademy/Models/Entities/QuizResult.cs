using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class QuizResult
    {

        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int Score { get; set; }
        public bool Passed { get; set; }



    }
}
