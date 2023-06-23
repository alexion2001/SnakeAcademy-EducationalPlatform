namespace PythonAcademy.Models.Entities.DTOs
{
    public class LessonDTO
    {
        public int IdLesson { get; set; }
        public int LessonNumber { get; set; }
        public string LessonName { get; set; }
        public string VideoLink { get; set; } = string.Empty;
        public string LessonContent { get; set; }

        public int ChapterId { get; set; }
        public Chapter Chapter { get; set; }
        public ICollection<Exercise> Exercises { get; set; } // contine mai multe rezolvari

        public LessonDTO(Lesson lesson) 
        {
            this.IdLesson = lesson.IdLesson;
            this.LessonNumber = lesson.LessonNumber;
            this.LessonName = lesson.LessonName;
            this.VideoLink = lesson.VideoLink;
            this.LessonContent = lesson.LessonContent;
            this.ChapterId = lesson.ChapterId;
            this.Chapter = new Chapter();
            this.Exercises = new List<Exercise>();
        }
    }
}
