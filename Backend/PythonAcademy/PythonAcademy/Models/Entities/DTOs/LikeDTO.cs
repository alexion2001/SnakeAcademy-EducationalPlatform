namespace PythonAcademy.Models.Entities.DTOs
{
    public class LikeDTO
    {
        public int PostId { get; set; }       
        public int UserId { get; set; }
        
        public LikeDTO(Like like)
        {
            this.PostId = like.PostId;
            this.UserId = like.UserId;
        }
    }
}
