using PythonAcademy.Repositories;

namespace PythonAcademy.Repositories
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
        IChapterRepository Chapter { get; }
        ISessionTokenRepository SessionToken { get; }
        IFriendRepository Friend { get; }
        ILessonRepository Lesson { get; }
        IQuizRepository Quiz { get; }
        IQuizResultRepository QuizResult { get; }
        INotificationRepository Notification { get; }
        ICommentRepository Comment { get; }
        IPostRepository Post { get; }
        ILikeRepository Like { get; }
        Task SaveAsync();

    }
}
