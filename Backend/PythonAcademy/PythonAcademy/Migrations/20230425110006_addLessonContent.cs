using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PythonAcademy.Migrations
{
    /// <inheritdoc />
    public partial class addLessonContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LessonContent",
                table: "Lessons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
       

            migrationBuilder.DropColumn(
                name: "LessonContent",
                table: "Lessons");
        }
    }
}
