using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizResultController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public QuizResultController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet("getAllFromUser/{idUser}")]
        public async Task<IActionResult> GetAllQuizResults(int idUser)
        {
            var quizResults = await _repository.QuizResult.GetAllResultsFromUser(idUser);

            var quizResultsToReturn = new List<ResultDTO>();

            foreach (var res in quizResults)
            {
                quizResultsToReturn.Add(new ResultDTO(res));
            }

            return Ok(quizResultsToReturn);
        }

        [HttpGet("getById/{idQuiz}/{idUser}")]
        public async Task<IActionResult> GetQuizResult(int idQuiz, int idUser)
        {
            var quizResult = await _repository.QuizResult.GetResultById(idQuiz, idUser);

            return Ok(quizResult);
        }


        [HttpPost]
        public async Task<IActionResult> CreateQuizResult(CreateResultDTO dto)
        {
            QuizResult newQuizResult = new QuizResult();

            newQuizResult.QuizId = dto.QuizId;
            newQuizResult.UserId = dto.UserId;
            newQuizResult.Score = dto.Score;

            if (newQuizResult.Score >= 50)
            {
                newQuizResult.Passed = true;
            }
            else
            {
                newQuizResult.Passed = false;
            }

           

        _repository.QuizResult.Create(newQuizResult);
            await _repository.QuizResult.SaveAsync();

            return Ok(new ResultDTO(newQuizResult));
        }

        [HttpPatch("updateScore/{idQuiz}/{idUser}/{score}")]
        public async Task<IActionResult> UpdateRank(int idQuiz, int idUser, int score)
        {
            QuizResult result = await _repository.QuizResult.GetResultById(idQuiz, idUser);
            result.Score = score;

            if (result.Score >= 50) // half of the score
            {
                result.Passed = true;
            }
            else
            {
                result.Passed = false;
            }

            _repository.QuizResult.Update(result);

            await _repository.SaveAsync();
            return NoContent();
        }

    }
}
