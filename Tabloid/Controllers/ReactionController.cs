using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.WindowsRuntime;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;
        private readonly IPostReactionRepository _postReactionRepository;
        private readonly IUserProfileRepository _userProfileRepository;


        public ReactionController(IPostReactionRepository postReactionRepository, IReactionRepository reactionRepository, IUserProfileRepository userProfileRepository)
        {
            _reactionRepository = reactionRepository;
            _postReactionRepository = postReactionRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAllReactions()
        {
            return Ok(_reactionRepository.GetAllReactions());
        }

        //GET: ALL PostReactions
        [HttpGet("postReactions")]
        public IActionResult GetAllPostReactions()
        {
            return Ok(_postReactionRepository.GetAllPostReactions());
        }

        //GET: ALL Reactions made on a single post
        [HttpGet("GetAllReactionsByPost/{id}")]
        public IActionResult GetAllReactionsByPost(int id)
        {
            return Ok(_postReactionRepository.GetAllReactionsByPostId(id));
        }

        //GET: ALL Reactions made on a single post
        [HttpGet("GetAllReactionsCountedByPost/{id}")]
        public IActionResult GetAllReactionsCountByPost(int id)
        {
            return Ok(_postReactionRepository.GetAllReactionsCountedByPostId(id));
        }



        //POST : Add Reaction to a Post
        [HttpPost("PostReaction")]
        public IActionResult Post(PostReaction postReaction)
        {
            var previousReactions = _postReactionRepository.GetAllReactionsByPostId(postReaction.PostId);
           var existingReactionFromUserProfile = previousReactions.Find(previousReaction => previousReaction.UserProfileId == postReaction.UserProfileId);
            if (existingReactionFromUserProfile == null)
            {
                _postReactionRepository.AddPostReaction(postReaction);

                return CreatedAtAction(nameof(GetAllPostReactions), new { id = postReaction.Id }, postReaction);
            } else
            {
                return Ok();
            }
        }

        //POST: Create new Reaction Type
        [HttpPost]
        public IActionResult Post(Reaction reaction)
        {

            _reactionRepository.AddReaction(reaction);
           
            return CreatedAtAction(nameof(GetAllReactions), new { id = reaction.Id }, reaction);

        }

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _commentRepository.DeleteComment(id);
        //    //return status 204
        //    return NoContent();
        //}




    }
    
    }

