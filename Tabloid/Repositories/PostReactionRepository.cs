using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO.Pipelines;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{

    public class PostReactionRepository : BaseRepository, IPostReactionRepository

    {
        public PostReactionRepository(IConfiguration config) : base(config) { }



        public List<PostReaction> GetAllReactionsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT pr.Id, pr.PostId, pr.ReactionId, pr.UserProfileId AS UserProfileIdReactingToPost, 
                        r.Id, r.Name, r.ImageLocation 
                        FROM PostReaction pr
                        JOIN  Reaction r
                        ON pr.ReactionId = r.Id
                        WHERE pr.PostId = @id
                       ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var postReactions = new List<PostReaction>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        PostReaction postReaction = new PostReaction
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            ReactionId = reader.GetInt32(reader.GetOrdinal("ReactionId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileIdReactingToPost")),
                            Reaction = new Reaction
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"))
                            }
                        };

                        postReactions.Add(postReaction);

                    }

                    reader.Close();

                    return postReactions;
                }
            }
        }


        public void AddPostReaction(PostReaction postReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostReaction (PostId, ReactionId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@postId, @reactionId, @userProfileId)";
                    cmd.Parameters.AddWithValue("@postId", postReaction.PostId);
                    cmd.Parameters.AddWithValue("@reactionId", postReaction.ReactionId);
                    cmd.Parameters.AddWithValue("@userProfileId", postReaction.UserProfileId);

                    int id = (int)cmd.ExecuteScalar();

                    postReaction.Id = id;
                }
            }
        }


    }
}


