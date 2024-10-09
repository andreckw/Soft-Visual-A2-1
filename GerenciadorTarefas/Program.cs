using GerenciadorTarefas.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

app.MapGet("/", () => "Gerenciador de tarefas");

app.MapPost("/cadastrar", ([FromBody] Usuario user, 
    [FromServices] AppDbContext context) => {
        context.Usuarios.Add(user);
        context.SaveChanges();
        return Results.Created("", user);
});

app.Run();
