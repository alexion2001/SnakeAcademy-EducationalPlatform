using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PythonAcademy.Models.Entities;

namespace PythonAcademy.Data
{
    public class Context :  IdentityDbContext<User, Role, int,
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>,IdentityUserToken<int>>  //DbContext,
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuizResult> QuizResults { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<TextFile> TextFiles { get; set; }
        public DbSet<Like> Likes { get; set; }

        public DbSet<SessionToken> SessionTokens { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            // One to One

            modelBuilder.Entity<Chapter>()
                    .HasOne(a => a.Quiz)
                    .WithOne(b => b.Chapter)
                    .HasForeignKey<Quiz>(b => b.ChapterId);


            // One to Many 
            modelBuilder.Entity<User>()
                .HasMany(a => a.Friends)
                .WithOne(b => b.User);
   

            modelBuilder.Entity<User>()
               .HasMany(a => a.Notifications)
               .WithOne(b => b.User);

            modelBuilder.Entity<User>()
               .HasMany(a => a.Posts)
               .WithOne(b => b.User);

            modelBuilder.Entity<Post>()
               .HasMany(a => a.Comments)
               .WithOne(b => b.Post);

            modelBuilder.Entity<Chapter>()
               .HasMany(a => a.Lessons)
               .WithOne(b => b.Chapter);

            modelBuilder.Entity<Quiz>()
               .HasMany(a => a.Questions)
               .WithOne(b => b.Quiz);

            modelBuilder.Entity<User>()
               .HasMany(a => a.Exercises)
               .WithOne(b => b.User);

            modelBuilder.Entity<Lesson>()
               .HasMany(a => a.Exercises)
               .WithOne(b => b.Lesson);

            modelBuilder.Entity<TextFile>()
               .HasMany(a => a.Exercises)
               .WithOne(b => b.TextFile);


            // Many to many

            modelBuilder.Entity<QuizResult>().HasKey(a => new {a.QuizId, a.UserId}); //FK

            modelBuilder.Entity<QuizResult>()
                .HasOne(a => a.User)
                .WithMany(b => b.QuizResults)
                .HasForeignKey(a => a.UserId);

            modelBuilder.Entity<QuizResult>()
                .HasOne(a => a.Quiz)
                .WithMany(b => b.QuizResults)
                .HasForeignKey(a => a.QuizId);


            modelBuilder.Entity<Like>().HasKey(a => new { a.PostId, a.UserId }); //FK

            modelBuilder.Entity<Like>()
                .HasOne(a => a.User)
                .WithMany(b => b.Likes)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Like>()
                .HasOne(a => a.Post)
                .WithMany(b => b.Likes)
                .HasForeignKey(a => a.PostId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<UserRole>(ur =>
            {
                ur.HasKey(ur => new { ur.UserId, ur.RoleId });

                ur.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId);
                ur.HasOne(ur => ur.User).WithMany(u => u.UserRoles).HasForeignKey(ur => ur.UserId);

               
            });        



            base.OnModelCreating(modelBuilder);
        }
    }
}
