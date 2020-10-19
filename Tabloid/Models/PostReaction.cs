using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class PostReaction
    {
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }
        [Required]
        public int ReactionId { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public Reaction Reaction { get; set; }
        

    }
}
