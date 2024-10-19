namespace GerenciadorTarefas.Models;

public class Board
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; } = null!;
    public ICollection<Card> Cards { get; } = new List<Card>();
    public bool IsPublic { get; set; } = false;
}