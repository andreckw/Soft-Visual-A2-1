using GerenciadorTarefas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CardsController : ControllerBase
{
    private readonly AppDbContext _context;

    public CardsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{listId}")]
    public async Task<IActionResult> GetCards(int listId)
    {
        var cards = await _context.Cards
            .Where(c => c.ListId == listId)
            .ToListAsync();

        return Ok(cards);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCard([FromBody] Card card)
    {
        _context.Cards.Add(card);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCards), new { listId = card.ListId }, card);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCard(int id, [FromBody] Card updatedCard)
    {
        var card = await _context.Cards.FindAsync(id);
        if (card == null)
        {
            return NotFound();
        }

        card.Title = updatedCard.Title;
        card.Description = updatedCard.Description;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCard(int id)
    {
        var card = await _context.Cards.FindAsync(id);
        if (card == null)
        {
            return NotFound();
        }

        _context.Cards.Remove(card);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}