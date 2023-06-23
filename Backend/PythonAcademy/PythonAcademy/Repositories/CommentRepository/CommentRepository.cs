using Microsoft.EntityFrameworkCore;
using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories.GenericRepository;

namespace PythonAcademy.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(Context context) : base(context)
        {
            
        }

        public async Task<List<Comment>> GetAllCommentsByPost(int postId)
        {
            return await _context.Comments.Where(c => c.PostId == postId)
            .ToListAsync();


        }
    }
}

