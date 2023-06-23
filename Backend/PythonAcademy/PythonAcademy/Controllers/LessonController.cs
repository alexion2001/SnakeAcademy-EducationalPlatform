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
    public class LessonController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public LessonController(IRepositoryWrapper repository)
        {
            _repository = repository;

        }


        [HttpGet("getAllLessons")]
        public async Task<IActionResult> GetAlllesons()
        {
            var lessons = await _repository.Lesson.GetAllLesons();

            var lessonsToReturn = new List<LessonDTO>();

            foreach (var lesson in lessons)
            {
                lessonsToReturn.Add(new LessonDTO(lesson));
            }

            return Ok(lessonsToReturn);
        }


        [HttpGet("getAllLessonsByChapter/{idChapter}")]   
        public async Task<IActionResult> GetAlllesonsByChapterId(int idChapter)
        {
            var lessons = await _repository.Lesson.GetAllLesonsByChapterId(idChapter);

            var lessonsToReturn = new List<LessonDTO>();

            foreach (var lesson in lessons) 
            {
                lessonsToReturn.Add(new LessonDTO(lesson));
            }

            return Ok(lessonsToReturn);
        }

        [HttpGet("getLesson/{idLesson}")]
        public async Task<IActionResult> GetALesson(int idLesson)
        {
            var lesson = await _repository.Lesson.GetLessonById(idLesson);

            var lessonToReturn = new LessonDTO(lesson);

            return Ok(lessonToReturn);
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateLesson(CreateLessonDTO dto)
        {
            Lesson newLesson = new Lesson();

            newLesson.LessonNumber = dto.LessonNumber;
            newLesson.LessonName = dto.LessonName;
            newLesson.VideoLink = dto.VideoLink;
            newLesson.LessonContent = dto.LessonContent;
            newLesson.ChapterId = dto.ChapterId;

            _repository.Lesson.Create(newLesson);
            await _repository.Lesson.SaveAsync();

            return Ok(new LessonDTO(newLesson));
        }

        [HttpPatch("updateLesson")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateLesson(UpdateLessonDto dto)
        {
            Lesson lesson = await _repository.Lesson.GetByIdAsync(dto.IdLesson);
            lesson.LessonContent = dto.LessonContent;
            _repository.Lesson.Update(lesson);

            await _repository.SaveAsync();

            return NoContent();
        }

    }
}
