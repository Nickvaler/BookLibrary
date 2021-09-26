using BookLibrary.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookLibrary.Repository
{
    public class BookRepository : IBookRepository
    {
        private IMongoDatabase _mongoDatabase;
        const string _dbName = "Library";
        const string _bookTableName = "Books";
        public BookRepository()
        {
            var client = new MongoClient();
            _mongoDatabase = client.GetDatabase(_dbName);
        }

        public async Task InsertRecordAsync(Book record)
        {
            var collection = _mongoDatabase.GetCollection<Book>(_bookTableName);
            await collection.InsertOneAsync(record);
        }

        public async Task<List<Book>> LoarRecordsAsync()
        {
            var collection = _mongoDatabase.GetCollection<Book>(_bookTableName);
            var documents = await collection.FindAsync<Book>(new BsonDocument());
            return documents.ToList();
        }

        public async Task<Book> LoarRecordsByIdAsync(Guid id)
        {
            var collection = _mongoDatabase.GetCollection<Book>(_bookTableName);
            var filter = Builders<Book>.Filter.Eq("Id", id);
            var book = await collection.FindAsync(filter);
            return book.First();
        }

        public Task UpsertRecordAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteRecordByIdAsync(Guid id)
        {
            var collection = _mongoDatabase.GetCollection<Book>(_bookTableName);
            var filter = Builders<Book>.Filter.Eq("Id", id);
            await collection.DeleteOneAsync(filter);
        }
    }
}
