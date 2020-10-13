using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        List<PostTag> GetAllPostTagsByPostId(int id);
        void Add(PostTag postTag);
        void Delete(int id);
    }
}