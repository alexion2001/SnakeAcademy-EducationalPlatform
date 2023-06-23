using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PythonAcademy.Models.Entities;
using PythonAcademy.Models.Entities.DTOs;
using PythonAcademy.Repositories;

namespace PythonAcademy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {

        private readonly IRepositoryWrapper _repository;

        public QuizController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }


        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllQuizes()
        {
            var quizes = await _repository.Quiz.GetAllQuizes();

            var quizesToReturn = new List<QuizDTO>();

            foreach (var quiz in quizes)
            {
                quizesToReturn.Add(new QuizDTO(quiz));
            }

            return Ok(quizesToReturn);
        }


        [HttpGet("getWithQuestions/{idChapter}")]
        public async Task<IActionResult> GetQuizWithQuestions(int idChapter)
        {
            var quiz = await _repository.Quiz.GetQuizByIdWithQuestions(idChapter);

            return Ok(quiz);
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuiz(CreateQuizDTO dto)
        {
            Quiz newQuiz= new Quiz();

            newQuiz.ChapterId = dto.ChapterId;
            newQuiz.Questions = dto.Questions;

            _repository.Quiz.Create(newQuiz);
            await _repository.Quiz.SaveAsync();

            return Ok(new QuizDTO(newQuiz));
        }
    }
}
