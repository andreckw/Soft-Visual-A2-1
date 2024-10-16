using GerenciadorTarefas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ListsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ListsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{boardId}")]
    public async Task<IActionResult> GetLists(int boardId)
    {
        var lists = await _context.Lists
            .Where(l => l.BoardId == boardId)
            .Include(l => l.Cards)
            .ToListAsync();

        return Ok(lists);
    }

    [HttpPost]
    public async Task<IActionResult> CreateList([FromBody] List list)
    {
        _context.Lists.Add(list);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetLists), new { boardId = list.BoardId }, list);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateList(int id, [FromBody] List updatedList)
    {
        var list = await _context.Lists.FindAsync(id);
        if (list == null)
        {
            return NotFound();
        }

        list.Title = updatedList.Title;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteList(int id)
    {
        var list = await _context.Lists.FindAsync(id);
        if (list == null)
        {
            return NotFound();
        }

        _context.Lists.Remove(list);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
