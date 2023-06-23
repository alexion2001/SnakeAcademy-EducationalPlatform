using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Chapter
    {
        [Key]
        public int IdChapter { get; set; }
        public string ChapterName { get; set; }

        public ICollection<Lesson> Lessons { get; set; } // contine mai multe lectii

        public Quiz Quiz { get; set; } //are un quiz
    }
}
