using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public CommentController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }
        [HttpGet("idPost")]
        public async Task<IActionResult> GetCommentsByPost(int idPost)
        {
            var comments = await _repository.Comment.GetAllCommentsByPost(idPost);
          

            return Ok(comments);

        }

        [HttpPost]
        public async Task<IActionResult> CreateCommentr(CreateCommnetDTO dto)
        {
            Comment newComment = new Comment();

            newComment.CommentText = dto.CommentText;
            newComment.PostId = dto.PostId;

            _repository.Comment.Create(newComment);
            await _repository.Comment.SaveAsync();

            return Ok(new CommentDTO(newComment));
        }

        [HttpDelete()]
       // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteComment([FromBody] int idComment)
        {
            var comm = await _repository.Comment.GetByIdAsync(idComment);

            if (comm == null)
            {
                return NotFound("Comment does not exist!");
            }

            _repository.Comment.Delete(comm);

            await _repository.SaveAsync();

            return NoContent();
        }
    }
}
