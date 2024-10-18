using GerenciadorTarefas.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

app.MapGet("/", () => Results.Redirect("/index.html"));

app.MapPost("/cadastrar", ([FromBody] Usuario user, 
    [FromServices] AppDbContext context) => {

        var userExist = context.Usuarios.FirstOrDefault(u => u.Email == user.Email);

        if (userExist != null) {
            return Results.BadRequest("Email digitado já existente nos registros");
        }

        PasswordHasher<Usuario> pass = new PasswordHasher<Usuario>();
        user.Senha = pass.HashPassword(user, user.Senha);

        context.Usuarios.Add(user);
        context.SaveChanges();
        return Results.Created("", user);
});

app.MapPost("/login", ([FromBody] Usuario user, 
    [FromServices] AppDbContext context) => {
        PasswordHasher<Usuario> pass = new PasswordHasher<Usuario>();
        var userLogin = context.Usuarios.FirstOrDefault(u => u.Email == user.Email);

        if (userLogin == null) {
            return Results.Unauthorized();
        } else if (pass.VerifyHashedPassword(user, userLogin.Senha, user.Senha) == 0) {
            return Results.Unauthorized();
        }

        return Results.Ok(userLogin);
});

app.MapGet("/api/boards/{user_id}", (int user_id, [FromServices] AppDbContext context) => {

        var boards = context.Boards.Include(board => board.Cards)
        .Where(b => b.UsuarioId == user_id)
        .Select(b => new {b.Name, b.Cards})
        .ToList();

        if (boards.Count == 0) {
            return Results.NotFound();
        }

        return Results.Ok(boards);

});

app.MapPost("/api/boards", ([FromBody] Board board,
    [FromServices] AppDbContext context) => {
        context.Boards.Add(board);
        context.SaveChanges();

        return Results.Created("", board);
});

app.Run();
