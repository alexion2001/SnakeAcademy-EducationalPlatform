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
    public class ChapterController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public ChapterController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllChapters()
        {
            var chapters = await _repository.Chapter.GetAllChapters();



            return Ok(chapters);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllChaptersByUser(int idUser)
        {
            var chapters = await _repository.Chapter.GetAllChaptersByUser(idUser);

           // var chaptersToReturn = new List<ChapterDTO>();

          //  foreach (var chr in chapters)
           // {
           //     chaptersToReturn.Add(new ChapterDTO(chr));
          //  }

            return Ok(chapters);
        }

        [HttpGet("getWithLessons/{idChapter}")]
        public async Task<IActionResult> GetChapterWithLessons(int idChapter)
        {
            var chapter = await _repository.Chapter.GetChapterWithLessons(idChapter);

            return Ok(chapter);
        }


        [HttpPost]
      //  [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateChapter(CreateChapterDTO dto)
        {
            Chapter newChapter = new Chapter();

            newChapter.ChapterName = dto.ChapterName;

            _repository.Chapter.Create(newChapter);
            await _repository.Chapter.SaveAsync();

            return Ok(new ChapterDTO(newChapter));
        }
    }
}
