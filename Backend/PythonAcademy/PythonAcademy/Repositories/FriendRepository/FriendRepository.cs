using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public class FriendRepository : GenericRepository<Friend>, IFriendRepository
    {
        public FriendRepository(Context context) : base(context) { }

       
        public async Task<List<Friend>> GetAllFollowers(int idFriend)
        {
            return await _context.Friends
                .Where(f => f.IdFriend.Equals(idFriend)).ToListAsync();
        }
        public async Task<Friend> GetAFriend(int idFriend, int idUser)
        {
            return await _context.Friends
               .Where(f => f.IdFriend.Equals(idFriend) && f.UserId.Equals(idUser)).FirstOrDefaultAsync();
        }



    }

  
}
