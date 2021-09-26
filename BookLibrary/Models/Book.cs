using MongoDB.Bson.Serialization.Attributes;
using System;

namespace BookLibrary.Models
{
    public class Book
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int PublicationYear { get; set; }
    }
}
