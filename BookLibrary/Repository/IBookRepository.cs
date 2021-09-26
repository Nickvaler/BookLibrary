using BookLibrary.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookLibrary.Repository
{
    public interface IBookRepository
    {
        Task InsertRecordAsync(Book record);
        Task<List<Book>> LoarRecordsAsync();
        Task<Book> LoarRecordsByIdAsync(Guid id);
        Task UpsertRecordAsync(Guid id);
        Task DeleteRecordByIdAsync(Guid id);
    }
}
