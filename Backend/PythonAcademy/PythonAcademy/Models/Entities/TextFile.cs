using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class TextFile
    {
        [Key]
        public int IdTextFile { get; set; }
        public string FileName { get; set; }
        public byte[] FileContent { get; set; }

        public ICollection<Exercise> Exercises { get; set; } // are mai multe exercitii stocate
    }
}
