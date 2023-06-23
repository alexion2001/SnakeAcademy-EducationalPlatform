using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public interface ISessionTokenRepository : IGenericRepository<SessionToken>
    {
        Task<SessionToken> GetByJti(string jti);
    }
}
