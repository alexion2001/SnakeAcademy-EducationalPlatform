namespace PythonAcademy.Models.Entities.DTOs
{
    public class CreateLessonDTO
    {
        public int LessonNumber { get; set; }
        public string LessonName { get; set; }
        public string VideoLink { get; set; }
        public string LessonContent { get; set; }

        public int ChapterId { get; set; }
    }
}
