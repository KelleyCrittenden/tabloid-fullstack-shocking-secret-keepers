using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);

        List<Comment> GetAllComments();
        void DeleteComment(int id);
        List<Comment> GetAllCommentsByPostId(int id);
        Comment GetCommentById(int id);
        void UpdateComment(Comment comment);
    }
}