using System.Text.Json.Serialization;

public class List
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public int BoardId { get; set; }

    [JsonIgnore]
    public Board? Board { get; set; }
    public List<Card> Cards { get; set; } = new();
}