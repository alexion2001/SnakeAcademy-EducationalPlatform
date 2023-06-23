using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        List<User> GetAllUsers();
        List<User> GetAllUsersByName(string name);
        Task<User> GetUserWithFriends(int idUser);
        Task<User> GetByIdWithRoles(int id);
        Task<List<UserScoreDTO>> GetUsersByRank(string rank);
        Task<UserProfileDTO> GetUserScore(int id);




    }
}
