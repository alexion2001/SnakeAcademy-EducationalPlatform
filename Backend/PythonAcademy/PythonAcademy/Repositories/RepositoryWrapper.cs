using PythonAcademy.Data;
using PythonAcademy.Models.Entities;
using PythonAcademy.Repositories;
using System.Xml.Linq;


namespace PythonAcademy.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly Context _context;
        private IUserRepository _user;
        private IFriendRepository _friend;
        private ISessionTokenRepository _sessionToken;
        private IChapterRepository _chapter;
        private ILessonRepository _lesson;
        private IQuizRepository _quiz;
        private IQuizResultRepository _quizResult;
        private INotificationRepository _notification;
        private ICommentRepository _comment;
        private IPostRepository _post;
        private ILikeRepository _like;
        public RepositoryWrapper(Context context) 
        {
            _context = context;
        }

        public IUserRepository User
        { 
            get 
            { 
                if (_user == null) { _user = new UserRepository(_context); }
                return _user;
            }
        }

        public IChapterRepository Chapter
        {
            get
            {
                if (_chapter == null) { _chapter = new ChapterRepository(_context); }
                return _chapter;
            }
        }

        public IFriendRepository Friend
        {
            get
            {
                if (_friend == null) { _friend = new FriendRepository(_context); }
                return _friend;
            }
        }

        public ISessionTokenRepository SessionToken
        {
            get
            {
                if (_sessionToken == null) { _sessionToken = new SessionTokenRepository(_context); }
                return _sessionToken;
            }
        }

        public ILessonRepository Lesson
        {
            get
            {
                if (_lesson == null) { _lesson = new LessonRepository(_context); }
                return _lesson;
            }
        }

        public IQuizRepository Quiz
        {
            get
            {
                if (_quiz == null) { _quiz = new QuizRepository(_context); }
                return _quiz;
            }
        }

        public IQuizResultRepository QuizResult
        {
            get
            {
                if (_quizResult == null) { _quizResult = new QuizResultRepository(_context); }
                return _quizResult;
            }
        }

        public INotificationRepository Notification
        {
            get
            { 
                if(_notification == null) { _notification = new NotificationRepository(_context); }
                return _notification;
            }
        }

        public ICommentRepository Comment
        {
            get
            {
                if (_comment == null) { _comment = new CommentRepository(_context); }
                return _comment;
            }
        }

        public IPostRepository Post
        {
            get
            {
                if (_post == null) { _post = new PostRepository(_context); }
                return _post;
            }
        }

        public ILikeRepository Like
        {
            get
            {
                if (_like == null) { _like = new LikeRepository(_context); }
                return _like;
            }
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
