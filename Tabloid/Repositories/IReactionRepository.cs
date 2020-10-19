using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IReactionRepository
    {
        void AddReaction(Reaction reaction);
        List<Reaction> GetAllReactions();
        Reaction GetReactionById(int id);

    }
}