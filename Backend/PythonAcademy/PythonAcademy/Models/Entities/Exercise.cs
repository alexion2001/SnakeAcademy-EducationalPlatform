using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Exercise
    {
        [Key]
        public int IdExercise { get; set; }

        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int TextFileId { get; set; }
        public TextFile TextFile { get; set; }
    }
}
