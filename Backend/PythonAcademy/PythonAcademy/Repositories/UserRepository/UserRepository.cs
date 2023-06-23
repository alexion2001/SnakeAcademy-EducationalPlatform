using PythonAcademy.Repositories.GenericRepository;
using PythonAcademy.Data;
using Microsoft.EntityFrameworkCore;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;

namespace PythonAcademy.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(Context context) : base(context) { }

        public  List<User> GetAllUsers()
        {
            return  _context.Users.Include(f => f.Friends).Include(u => u.UserRoles).ThenInclude(ur => ur.Role).ToList();
        }

        public async Task<List<UserScoreDTO>> GetUsersByRank(string rank)
        {
            return await _context.Users
             .Where(u => u.Rank.Equals(rank))
             .Include(u => u.QuizResults)
             .Select(u => new UserScoreDTO
             {
                
                Id = u.Id,
                Name = u.Name,
                Surname = u.Surname,
                Rank = u.Rank,
                AvatarIndex = u.AvatarIndex,
                TotalScore = u.QuizResults.Sum(qr => qr.Score)
             })
             .OrderByDescending(u => u.TotalScore)
             .ToListAsync();
        }

        public async Task<UserProfileDTO> GetUserScore(int id)
        {
            return await _context.Users
             .Where(u => u.Id.Equals(id))
             .Include(u => u.QuizResults)
             .Select(u => new UserProfileDTO
             { TotalScore = u.QuizResults.Sum(qr => qr.Score)}).
             FirstOrDefaultAsync();
        }

        public  List<User> GetAllUsersByName(string name) // search for single name or full name
        {
            return _context.Users.Where(u => u.Name.Equals(name) || u.Surname.Equals(name) 
            || (u.Name + ' ' + u.Surname).Equals(name) || (u.Surname + ' '+ u.Name).Equals(name)).ToList();
        }

        public async Task<User>  GetUserWithFriends(int idUser) // friend who follows this user
        {
            return await _context.Users.Include(u => u.Friends).Where(u => u.Id == idUser )
                .FirstOrDefaultAsync();   
             
        }

        public async Task<User> GetByIdWithRoles(int id)
        {
            return _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur. Role)   
                .Where(u => u.Id.Equals(id))
                .FirstOrDefault();
        }



    }
}
