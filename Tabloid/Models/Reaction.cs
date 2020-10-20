using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Reaction
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [DisplayName("Image")]
        [MaxLength(255)]

        public string ImageLocation { get; set; }

        public int ReactionCount { get; set; }




    }
}
