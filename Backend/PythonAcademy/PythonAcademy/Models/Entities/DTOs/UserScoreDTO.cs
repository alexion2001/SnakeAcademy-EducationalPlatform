namespace PythonAcademy.Models.Entities.DTOs
{
    public class UserScoreDTO
    {
        public int Id { get; set; }
        public int AvatarIndex { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Rank { get; set; }
        public int TotalScore { get; set; }

    }
}
