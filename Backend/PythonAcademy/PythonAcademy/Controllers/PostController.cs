using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories;
using System.Data;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public PostController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _repository.Post.GetAllPostsWithComments();

            return Ok(posts);
        }

        [HttpGet("idPost")]
        public async Task<IActionResult> GetPostById(int idPost)
        {
            var post = await _repository.Post.GetByIdAsync(idPost);

            return Ok(post);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(CreatePostDTO dto)
        {
            Post newPost = new Post();

            newPost.PostDate = DateTime.Now;
            newPost.PostSubject = dto.PostSubject;
            newPost.PostText = dto.PostText;
            newPost.UserId = dto.UserId;

        
           _repository.Post.Create(newPost);
            await _repository.Post.SaveAsync();

            return Ok(new PostDTO(newPost));
        }


        [HttpDelete]
        //[Authorize(Roles = "Admin")] 
        public async Task<IActionResult> DeletePost([FromBody] int idPost)
        {
            var post = await _repository.Post.GetByIdAsync(idPost);

            if (post == null)
            {
                return NotFound("Post does not exist!");
            }

            _repository.Post.Delete(post);

            await _repository.SaveAsync();

            return NoContent();
        }
    }
}
