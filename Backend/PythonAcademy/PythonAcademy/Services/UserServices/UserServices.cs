using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using PythonAcademy.Models.Constants;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PythonAcademy.Services.UserServices
{
    public class UserServices : IUserServices
    {
        private readonly UserManager<User> _userManager;
        private readonly IRepositoryWrapper _repository;
        public UserServices(UserManager<User> userManager, IRepositoryWrapper repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        public async Task<bool> RegisterUserAsync(RegisterUserDTO dto)
        {
            var newUser = new User();

            newUser.Email = dto.Email;
            newUser.Name = dto.Name;
            newUser.Surname = dto.Surname;
            newUser.UserName = dto.Email; //sau email dto.Name + " " + dto.Surname
            newUser.CurrentLesson = 1;
            newUser.Rank = "Baby Snake";

            var result = await _userManager.CreateAsync(newUser, dto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, UserRolesType.Student);
                return true;
            }
            return false;
        }

        public async Task<string> LoginUserAsync(LoginUserDTO dto)
        {
            User user = await _userManager.FindByEmailAsync(dto.Email);

            if (user != null) 
            { 
                user = await  _repository.User.GetByIdWithRoles(user.Id);

                //List<string> roles = user.UserRoles.Select( ur => ur.Role.Name).ToList();
                List<string> roles;
                if (dto.Email == "admin@admin.com")
                {
                    roles = new List<string>() { "Admin" };
                }
                else
                {
                    roles = new List<string>() { "Student" };
                }
                
                var newJti = Guid.NewGuid().ToString() ; //Jwt Token Id

                var tokenHandler = new JwtSecurityTokenHandler();

                var signinkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom secret key for users"));

                var token = GenerateJwtToken(signinkey,user,roles,tokenHandler,newJti);

                _repository.SessionToken.Create(new SessionToken(newJti, user.Id, token.ValidTo));

                await _repository.SaveAsync();

                return tokenHandler.WriteToken(token);
            }
            return "";
        }

        private SecurityToken GenerateJwtToken(SymmetricSecurityKey signinkey, User user, List<string> roles,
         JwtSecurityTokenHandler tokenHandler, string jti )
        {
            var subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name + " " + user.Surname),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, jti)
            });

            foreach(var role in roles)
            {
                subject.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = DateTime.Now.AddHours(24), //1
                SigningCredentials = new SigningCredentials(signinkey, SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);


            return token;
        }

        
    }
}
