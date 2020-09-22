using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeApp.API.Migrations
{
    public partial class IsActiveToEmployeeBool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Employees",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "IsActive",
                table: "Employees",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool));
        }
    }
}
