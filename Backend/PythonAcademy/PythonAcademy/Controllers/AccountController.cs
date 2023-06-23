using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Constants;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories;
using PythonAcademy.Services.UserServices;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserServices _userService;
        public AccountController(UserManager<User> userManager, IUserServices userService)
        {
            _userManager = userManager;
            _userService = userService;
        }


        [HttpGet("email")]

        public async Task<IActionResult> GetByEmail(string email) //find user by email
        {
            var exists = await _userManager.FindByEmailAsync(email);
            if (exists == null)
            {
                return BadRequest("Not found");


            }

            return Ok(exists);

        }


        [HttpGet("name")]

        public async Task<IActionResult> GetByName(string name) //find user by email (username)
        {
            var exists = await _userManager.FindByNameAsync(name);
            if (exists == null)
            {
                return BadRequest("Not found");


            }

            return Ok(exists);

        }




        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] RegisterUserDTO dto)
        {
            var exists = await _userManager.FindByEmailAsync(dto.Email);
            if (exists != null)
            {
                return BadRequest("User already registered !");

            }

            var result = await _userService.RegisterUserAsync(dto);
            if (result)
            {
                return Ok(result);
            }

            return BadRequest();

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO dto)
        {
            var token = await _userService.LoginUserAsync(dto);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(new { token });
        }
    }
}
