using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeApp.API.Migrations
{
    public partial class IsActiveToEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "Employees",
                type: "varchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(1)");

            migrationBuilder.AddColumn<int>(
                name: "IsActive",
                table: "Employees",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Employees");

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "Employees",
                type: "varchar(1)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(10)");
        }
    }
}
