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
                      
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public List<Subscription> GetAllSubscriptionsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime, IsSubscribed
                        FROM Subscription
                       WHERE SubscriberUserProfileId = @id AND IsSubscribed != 0";
                     

                    cmd.Parameters.AddWithValue("@id", id);
                   

                    var reader = cmd.ExecuteReader();
                    List<Subscription> subs = new List<Subscription>();
                    while (reader.Read())
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

                        subs.Add(subscription);
                    };
                    reader.Close();
                    return subs;

                }
            }
        }

        public List<Subscription> GetSubscribedPostsForUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT s.Id AS SubscriptionId, s.SubscriberUserProfileId, s.ProviderUserProfileId, s.BeginDateTime, s.EndDateTime, s.IsSubscribed,
                        p.Id AS PostId, p.Title, p.Content, p.ImageLocation AS HeaderImage, p.CreateDateTime, p.PublishDateTime, p.CategoryId, p.UserProfileId,

                        up.FirstName, up.LastName, up.DisplayName, 
                        up.Email, up.CreateDateTime, up.ImageLocation AS AvatarImage,
                        up.UserTypeId,

                         c.[Name] AS CategoryName,

                          ut.[Name] AS UserTypeName
                        FROM Subscription s
                        LEFT JOIN Post p ON s.ProviderUserProfileId = p.UserProfileId
                        LEFT JOIN Category c ON p.CategoryId = c.Id
                        LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                        LEFT JOIN UserType ut ON up.UserTypeId = ut.Id
                       WHERE SubscriberUserProfileId = @id AND s.IsSubscribed = 1 AND p.IsDeleted = 0
                      
                    ORDER BY p.CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var subscriptions = new List<Subscription>();

                    while (reader.Read())
                    {
                        //can have multiple posts for each subscription so getting unique subscriptions
                        var subscriptionId = DbUtils.GetInt(reader, "SubscriptionId");

                        //returns first element of sequence that matches the subscriptionId so only gets unique value
                        var existingSubscription = subscriptions.FirstOrDefault(subscription => subscription.Id == subscriptionId);

                        if (existingSubscription == null)
                        {
                            existingSubscription = new Subscription()
                            {
                                Id = subscriptionId,
                                SubscriberUserProfileId = reader.GetInt32(reader.GetOrdinal("SubscriberUserProfileId")),
                                ProviderUserProfileId = reader.GetInt32(reader.GetOrdinal("ProviderUserProfileId")),
                                BeginDateTime = reader.GetDateTime(reader.GetOrdinal("BeginDateTime")),
                                EndDateTime = reader.GetDateTime(reader.GetOrdinal("EndDateTime")),
                                IsSubscribed = reader.GetInt32(reader.GetOrdinal("IsSubscribed")),
                                Posts = new List<Post>()

                            };
                            subscriptions.Add(existingSubscription);
                        }
                        if (DbUtils.IsNotDbNull(reader, "PostId"))
                        {
                            existingSubscription.Posts.Add(new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PostId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Category = new Category()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                                },
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                UserProfile = new UserProfile()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    UserType = new UserType()
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                    }
                                }

                            });
                        }
                    }

                    reader.Close();

                    return subscriptions;

                }
            }
        }

        public void UpdateSubscription(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Subscription
                            SET  
                                SubscriberUserProfileId = @subscriberUserProfileId, 
                                ProviderUserProfileId = @providerUserProfileId,
                                EndDateTime = @endDateTime,
                                IsSubscribed = @isSubscribed
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@subscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@providerUserProfileId", subscription.ProviderUserProfileId);
                    cmd.Parameters.AddWithValue("@endDateTime", DateTime.Now);
                    cmd.Parameters.AddWithValue("@id", subscription.Id);
                    cmd.Parameters.AddWithValue("@isSubscribed", 0);

                   

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void ReactivateSubscription(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Subscription
                        SET
                        IsSubscribed = @isSubscribed
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@isSubscribed", 1);
                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }

        }

        public void DeleteSubscription(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                 DELETE FROM Subscription
                                 WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }

        }
    }
}
