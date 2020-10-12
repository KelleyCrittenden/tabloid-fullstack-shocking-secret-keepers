using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        void Add(Tag tag);
        void Delete(int id);
        void Update(Tag tag);
        Tag GetById(int id);
    }
}
