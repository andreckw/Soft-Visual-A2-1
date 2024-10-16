using GerenciadorTarefas.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gerenciadortarefas.db"));

builder.Services.AddControllers();
var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/", () => Results.Redirect("/index.html"));

app.MapControllers();

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

app.UseStaticFiles();
app.UseRouting();
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();
