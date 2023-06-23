namespace PythonAcademy.Models.Entities.DTOs
{
    public class ChapterDTO
    {

        public int IdChapter { get; set; }
        public string ChapterName { get; set; }

        public ICollection<Lesson> Lessons { get; set; } 

        public Quiz Quiz { get; set; } 

        public ChapterDTO(Chapter chapter) 
        {
            this.IdChapter = chapter.IdChapter;
            this.ChapterName = chapter.ChapterName;
            this.Lessons = new List<Lesson>();
            this.Quiz = new Quiz();
        }

    }
}
