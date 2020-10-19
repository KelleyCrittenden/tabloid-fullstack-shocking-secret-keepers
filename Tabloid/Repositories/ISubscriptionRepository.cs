using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        void AddSubscription(Subscription subscription);
        List<Subscription> GetSubscribedPostsForUser(int id);
        Subscription GetSubscriptionByUserId(int id, int authorId);
        void UpdateSubscription(Subscription subscription);
        public List<Subscription> GetAllSubscriptionsByUserId(int id);
    }
}