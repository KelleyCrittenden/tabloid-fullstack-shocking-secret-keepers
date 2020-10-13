using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration config) : base(config) { }
        public List<PostTag> GetAllPostTagsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())

                {
                    cmd.CommandText = @"
                            SELECT PostTag.Id, PostTag.TagId, PostTag.PostId, Tag.Name as tagName
                            FROM PostTag
                            LEFT JOIN Post ON PostTag.PostId = Post.Id
                            LEFT JOIN Tag on PostTag.TagId = Tag.Id
                            WHERE Post.Id = @postId";

                    cmd.Parameters.AddWithValue("@postId", id);

                    var postTags = new List<PostTag>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        PostTag postTag = new PostTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            TagId = reader.GetInt32(reader.GetOrdinal("TagId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Tag = new Tag
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                                Name = reader.GetString(reader.GetOrdinal("tagName"))
                            }

                        };

                        postTags.Add(postTag);


                    }
                    reader.Close();
                    return postTags;


                }
            }
        }

        public void Add(PostTag postTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostTag(PostId, TagId)
                        OUTPUT INSERTED.ID
                        VALUES (@postId, @tagId)";

                    DbUtils.AddParameter(cmd, "@postId", postTag.PostId);
                    DbUtils.AddParameter(cmd, "@tagtId", postTag.TagId);

                    postTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM PostTag
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
