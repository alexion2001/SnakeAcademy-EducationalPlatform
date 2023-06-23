using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        public PostRepository(Context context) : base(context) { }

        public async Task<List<Post>> GetAllPostsWithComments()
        {
            return await _context.Posts.Include(p => p.Comments).Include(u => u.User).Include(u => u.Likes).ToListAsync();
        }
    }

}