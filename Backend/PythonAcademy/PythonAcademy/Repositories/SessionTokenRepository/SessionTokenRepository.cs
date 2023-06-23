using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{ 
    public class SessionTokenRepository : GenericRepository<SessionToken>, ISessionTokenRepository
    {

        public SessionTokenRepository(Context context) : base(context) { }

        public async Task<SessionToken> GetByJti(string jti)
        {
           return await _context.SessionTokens.FirstOrDefaultAsync(t => t.Jti.Equals(jti));
        }
    }
}
