using System;
using Microsoft.EntityFrameworkCore;


namespace GerenciadorTarefas.Models{
    public class AppDbContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Board> Boards{ get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<List> Lists { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=gerenciadortarefas.db");
        }
    }
}

