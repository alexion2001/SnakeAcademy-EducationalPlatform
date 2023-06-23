using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using PythonAcademy.Models.Constants;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories;
using PythonAcademy.Repositories;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;
        
        public UserController(IRepositoryWrapper repository) 
        { 
            _repository = repository;
           
        }

        [HttpGet("GetFriends/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserAllFriends(int userId)
        {
            var friends = await _repository.User.GetUserWithFriends(userId);

            return Ok(friends);
        }

        [HttpGet("singleUser")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSingleUser(int userId)
        {
            var user = await _repository.User.GetByIdWithRoles(userId);

            return Ok(user);
        }


        [HttpGet("GetAllUsers")]

        public async Task<IActionResult> GetAllUsers() //find all users
        {
            var users =  _repository.User.GetAllUsers();

            var usersToReturn = new List<UserDTO>();

            foreach (var user in users) 
            {
                usersToReturn.Add(new UserDTO(user));
            }

            return Ok(usersToReturn);

        }

        [HttpGet("GetByRank/{rank}")]
        public async Task<IActionResult> GetUserByRank(string rank) //find all users
        {
            var users = await _repository.User.GetUsersByRank(rank);
            return Ok(users);

           // var usersToReturn = new List<UserDTO>();

            //foreach (var user in users)
           // {
             //   usersToReturn.Add(new UserDTO(user));
           // }

           // return Ok(usersToReturn);

        }

        [HttpGet("GetScore/{id}")]
        public async Task<IActionResult> GetUserScore(int id) 
        {
            var score = await _repository.User.GetUserScore(id);
            return Ok(score);

           

        }

        [HttpGet("Search/{name}")]
        public async Task<IActionResult> GetSearchedUsers(string name) //find all users by name search
        {
            var users = _repository.User.GetAllUsersByName(name);

            var usersToReturn = new List<UserDTO>();

            foreach (var user in users)
            {
                usersToReturn.Add(new UserDTO(user));
            }

            return Ok(usersToReturn);

        }


        [HttpPatch("updateBio/{userId}")]
        public async Task<IActionResult> UpdateBio(int userId, string bio)
        {
            User student = await _repository.User.GetByIdAsync(userId);
            student.StudentDescription = bio;
            _repository.User.Update(student);

            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("updateRank/{userId}")]
        public async Task<IActionResult> UpdateRank(int userId, string rank)
        {
            User student = await _repository.User.GetByIdAsync(userId);
            student.Rank = rank;
            _repository.User.Update(student);

            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("updateAvatar/{userId}")]
        public async Task<IActionResult> UpdatePhoto(int userId, int avatarIndex)
        {
            User student = await _repository.User.GetByIdAsync(userId);
            student.AvatarIndex = avatarIndex;
            _repository.User.Update(student);

            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("updateLesson/{userId}")]
        public async Task<IActionResult> UpdateLesson(int userId)
        {
            User student = await _repository.User.GetByIdAsync(userId);
            student.CurrentLesson ++;
            _repository.User.Update(student);

            await _repository.SaveAsync();

            return NoContent();
        }




    }
}
