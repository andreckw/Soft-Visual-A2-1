using System.Net.Http.Headers;
using GerenciadorTarefas.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

app.MapGet("/", () => "Trabalho de Software Visual A2-1");

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
        .Select(b => new {b.Id, b.Name, b.Cards})
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

app.MapPost("/api/cards", async ([FromBody] Card card, [FromServices] AppDbContext context) =>
{
    var boardExist = await context.Boards.FindAsync(card.BoardId);
    if (boardExist == null)
    {
        return Results.BadRequest("Board nao encontrado");
    }

    context.Cards.Add(card);
    await context.SaveChangesAsync();
    return Results.Created();
});


app.MapDelete("/api/cards/{id}", async (int id, [FromServices] AppDbContext context) =>
{
    var card = await context.Cards.FindAsync(id);
    
    if (card == null)
    {
        return Results.NotFound("Tarefa nao encontrada");
    }

    context.Cards.Remove(card);
    await context.SaveChangesAsync();
    return Results.Ok("Tarefa deletada com sucesso");
});

app.MapDelete("/api/boards/{id}", async (int id, [FromServices] AppDbContext context) =>
{
    var board = await context.Boards.Include(b => b.Cards).FirstOrDefaultAsync(b => b.Id == id);
    
    if (board == null)
    {
        return Results.NotFound("Board nao encontrado");
    }

    context.Cards.RemoveRange(board.Cards);

    context.Boards.Remove(board); 
    await context.SaveChangesAsync();

    return Results.Ok("Board e seus cards deletados com sucesso");
});

app.MapPut("/api/boards/{id}", async (int id, [FromBody] Board updatedBoard, [FromServices] AppDbContext context) =>
{
    var board = await context.Boards.FindAsync(id);

    if (board == null)
    {
        return Results.NotFound("Board nao encontrado");
    }

    board.Name = updatedBoard.Name;
    board.IsPublic = updatedBoard.IsPublic;

    await context.SaveChangesAsync();
    return Results.Ok(board);
});

app.MapPut("/api/cards/{id}", async (int id, [FromBody] Card updatedCard, [FromServices] AppDbContext context) =>
{
    var card = await context.Cards.FindAsync(id);

    if (card == null)
    {
        return Results.NotFound("Tarefa nao encontrada");
    }

    card.Title = updatedCard.Title;
    card.Description = updatedCard.Description;
    card.Situacao = updatedCard.Situacao;

    await context.SaveChangesAsync();
    return Results.Ok(card);
});

app.MapGet("/api/boards/cards/{id}",(int id, [FromServices] AppDbContext context) =>
{
    var cards = context.Cards.Where(c => c.BoardId == id).ToList();

    if (cards.Count == 0) {
        return Results.NotFound();
    }

    return Results.Ok(cards);
}
);

app.MapGet("/api/boards/publicos",([FromServices]AppDbContext context)=>
{
    var boardsPublicos = context.Boards
    .Where(b => b.IsPublic)
    .Include(b => b.Cards)
    .Select(b => new {
        b.Id,
        b.Name,
        Cards = b.Cards.Select(c => new { c.Id, c.Title, c.Description, c.Situacao})
    }).ToList();

    if(boardsPublicos.Count() == 0)
    {
        return Results.NotFound("");
    }

    return Results.Ok(boardsPublicos);
}
);

app.Run();
