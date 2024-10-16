using GerenciadorTarefas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BoardsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BoardsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBoards()
    {
        var boards = await _context.Boards.Include(b => b.Lists).ToListAsync();
        return Ok(boards);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBoard(Board board)
    {
        _context.Boards.Add(board);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBoards), new { id = board.Id }, board);
    }
}