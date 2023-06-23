using PythonAcademy.Models.Entities.DTOs;

namespace PythonAcademy.Services.UserServices
{
    public interface IUserServices
    {
        Task<bool> RegisterUserAsync(RegisterUserDTO dto);
        Task<string> LoginUserAsync(LoginUserDTO dto);
    }
}
