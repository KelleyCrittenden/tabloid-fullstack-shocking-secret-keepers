using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void DeletePost(int id);
        List<Post> GetAllPublishedPosts();
        Post GetPublishedPostById(int id);
        Post GetUserPostById(int id, int userProfileId);
        List<Post> GetUserPostsById(int userProfileId);
        void UpdatePost(Post post);
    }
}