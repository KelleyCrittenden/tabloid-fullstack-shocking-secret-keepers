using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Utils;


namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration config) : base(config) { }
        public void AddSubscription(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@subscriberUserProfileId, @providerUserProfileId, @beginDateTime, @endDateTime)";
                    cmd.Parameters.AddWithValue("@subscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@providerUserProfileId", subscription.ProviderUserProfileId);
                    cmd.Parameters.AddWithValue("@beginDateTime", DateTime.Now);
                    cmd.Parameters.AddWithValue("@endDateTime", DbUtils.ValueOrDBNull(subscription.EndDateTime));
                    //cmd.Parameters.AddWithValue("@endDateTime", DbUtils.ValueOrDBNull(subscription.EndDateTime));

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Subscription GetSubscriptionByUserId(int id, int authorId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime, IsSubscribed
                        FROM Subscription
                       WHERE SubscriberUserProfileId = @id 
                       AND ProviderUserProfileId = @authorId ";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@authorId", authorId);
                    //var subscriptions = new List<Subscription>();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Subscription subscription = new Subscription
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            SubscriberUserProfileId = reader.GetInt32(reader.GetOrdinal("SubscriberUserProfileId")),
                            ProviderUserProfileId = reader.GetInt32(reader.GetOrdinal("ProviderUserProfileId")),
                            BeginDateTime = reader.GetDateTime(reader.GetOrdinal("BeginDateTime")),
                            EndDateTime = reader.GetDateTime(reader.GetOrdinal("EndDateTime")),
                            IsSubscribed = reader.GetInt32(reader.GetOrdinal("IsSubscribed"))
                            
                        };
                        reader.Close();
                        return subscription;

                        //subscriptions.Add(subscription);

                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public List<Subscription> GetAllSubscriptions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME() AND  p.IsDeleted = 0
                        ORDER BY p.CreateDateTime DESC";
                    var reader = cmd.ExecuteReader();

                    var subscriptions = new List<Subscription>();

                    //while (reader.Read())
                    //{
                    //    posts.Add();
                    //}

                    //reader.Close();

                    return subscriptions;
                }
            }
        }
    }
}
