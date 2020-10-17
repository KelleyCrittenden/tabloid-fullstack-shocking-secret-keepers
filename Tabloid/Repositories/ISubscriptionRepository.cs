using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        void AddSubscription(Subscription subscription);
        List<Subscription> GetSubscribedPostsForUser(int id);
        Subscription GetSubscriptionByUserId(int id, int authorId);
    }
}