using System;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorTarefas.Models;

public class AppDbContext : DbContext
{
    public DbSet<Usuario> Usuarios { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=gerenciadortarefas.db");
    }
}
