using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public FriendController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }


        [HttpGet("idUser")]
        public async Task<IActionResult> GetAllFollowers(int idUser)
        {
            var friends = await _repository.Friend.GetAllFollowers(idUser);

            var friendsToReturn = new List<FriendDTO>();

            foreach (var frd in friends)
            {
                friendsToReturn.Add(new FriendDTO(frd));
            }

            return Ok(friendsToReturn);

        }

        [HttpGet("singleFriend")]
        public async Task<IActionResult> GetFriend(int idFriend, int idUser)
        {
            var friend = await _repository.Friend.GetAFriend(idFriend, idUser);

            return Ok(friend);

        }

        [HttpPost("createFriendship")]
        public async Task<IActionResult> CreateFriend(CreateFriendDTO dto)
      
        {
            
            Friend newFriend = new Friend();

            newFriend.IdFriend = dto.IdFriend;
            newFriend.UserId = dto.UserId;
            newFriend.FriendRequestDate = DateTime.Now;

            _repository.Friend.Create(newFriend);
            await _repository.Friend.SaveAsync();

            return Ok(new FriendDTO(newFriend));
        }

        [HttpDelete()]
        public async Task<IActionResult> DeleteFriend([FromBody] CreateFriendDTO myFriend)
        {
            int idFriend = myFriend.IdFriend;
            int idUser = myFriend.UserId;

            var friend = await _repository.Friend.GetAFriend(idFriend, idUser);

            if (friend == null)
            {
                return NotFound("Friendship does not exist!");
            }

            _repository.Friend.Delete(friend);

            await _repository.SaveAsync();

            return NoContent();
        }


    }
}
