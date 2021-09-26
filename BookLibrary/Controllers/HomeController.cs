using BookLibrary.Models;
using BookLibrary.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookLibrary.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        public readonly IBookRepository _bookRepository;

        public HomeController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
       
        [HttpGet]
        public async Task<IEnumerable<Book>> Get()
        {
            return await _bookRepository.LoarRecordsAsync();
        }

        [HttpPut]
        public async Task Post(Book book)
        {
            await _bookRepository.InsertRecordAsync(book);
        }

        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await _bookRepository.DeleteRecordByIdAsync(id);
        }
    }
}
