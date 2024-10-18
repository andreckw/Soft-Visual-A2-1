namespace GerenciadorTarefas.Models;

public class Card
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int BoardId { get; set; }
    public Board Board { get; set; } = null!;
}