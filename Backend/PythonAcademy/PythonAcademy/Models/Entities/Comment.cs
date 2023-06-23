using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class Comment //comments are anonimus
    {

        [Key]
        public int IdComment { get; set; }
        public string CommentText { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

    }
}
