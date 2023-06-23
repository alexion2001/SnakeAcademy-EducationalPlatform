using System.ComponentModel.DataAnnotations;

namespace PythonAcademy.Models.Entities
{
    public class SessionToken
    {
        public SessionToken() { }
        public SessionToken(string jti, int userId, DateTime expirationDate)
        {
            this.Jti = jti;
            this.UserId = userId;
            this.ExpirationDate = expirationDate;

        }

        [Key]
        public string Jti { get; set; } //token id
        public DateTime ExpirationDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
