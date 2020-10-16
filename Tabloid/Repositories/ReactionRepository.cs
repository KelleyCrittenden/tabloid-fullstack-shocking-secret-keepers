using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO.Pipelines;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{

    public class ReactionRepository : BaseRepository, IReactionRepository

    {
        public ReactionRepository(IConfiguration config) : base(config) { }

        public List<Reaction> GetAllReactions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT r.Id, r.Name, r.ImageLocation
                        FROM  Reaction r
                       ";


                    var reactions = new List<Reaction>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Reaction reaction = new Reaction
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"))
                        };

                        reactions.Add(reaction);

                    }

                    reader.Close();

                    return reactions;
                }
            }

        }



        public Reaction GetReactionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT r.Id, r.Name, r.ImageLocation
                        FROM  Reaction r
                       
                        WHERE r.Id = @id 
                       ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Reaction reaction = new Reaction
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"))
                        };

                        reader.Close();
                        return reaction;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddReaction(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Reaction (Name, ImageLocation)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @imageLocation)";
                    cmd.Parameters.AddWithValue("@name", reaction.Name);
                    cmd.Parameters.AddWithValue("@imageLocation", reaction.ImageLocation);

                    int id = (int)cmd.ExecuteScalar();

                    reaction.Id = id;
                }
            }
        }

    }
}


