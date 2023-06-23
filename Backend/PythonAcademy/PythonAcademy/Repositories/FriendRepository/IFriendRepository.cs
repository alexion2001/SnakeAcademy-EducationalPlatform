using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface IFriendRepository : IGenericRepository<Friend>
    {      
        Task<List<Friend>> GetAllFollowers(int idFriend);
        Task<Friend> GetAFriend(int idFriend, int idUser);
        
    }
    
}
