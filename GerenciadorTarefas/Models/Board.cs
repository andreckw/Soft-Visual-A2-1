public class Board
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public List<List> Lists { get; set; } = new();
}