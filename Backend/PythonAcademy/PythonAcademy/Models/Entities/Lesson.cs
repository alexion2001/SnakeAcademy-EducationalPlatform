using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Lesson
    {
        [Key]
        public int IdLesson { get; set; }
        public int LessonNumber { get; set; }
        public string LessonName { get; set; }
        public string VideoLink { get; set; } = string.Empty;
        public string LessonContent { get; set; }

        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
        public ICollection<Exercise> Exercises { get; set; } // contine mai multe rezolvari
    }
}
