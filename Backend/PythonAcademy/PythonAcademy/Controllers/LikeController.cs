using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public LikeController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }


        [HttpPost]
        public async Task<IActionResult> CreateLike(CreateLikeDTO dto)
        {
            Like newLike = new Like();

            newLike.PostId = dto.PostId;
            newLike.UserId = dto.UserId;


            _repository.Like.Create(newLike);
            await _repository.Like.SaveAsync();

            return Ok(new LikeDTO(newLike));
        }


    }
}
