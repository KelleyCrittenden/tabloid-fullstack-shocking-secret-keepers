using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        //private readonly IPostRepository _postRepository;

        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
            //_postRepository = postRepository;
        }
     
        //this will show the whole list of posts for that specific post
        [HttpGet("GetAllCommentsByPost/{id}")]
        public IActionResult GetAllCommentsByPost(int id)
        {
            return Ok(_commentRepository.GetAllCommentsByPostId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            //int userId = GetCurrentUserProfileId();
            Comment comment = _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
            //Post post = _postRepository.GetPublishedPostById(comment.PostId);

            //PostCommentViewModel vm = new PostCommentViewModel
            //{
            //    Post = post,
            //    Comment = comment
            //};

            //return View(vm);
        }

       
        [HttpPost]
        public IActionResult Post(Post post, Comment comment, UserProfile userProfile)
        {

            //will need to somehow get how is logged in 
            
            //UserProfile userProfile = _userProfileRepository.GetByFirebaseUserId()
            //comment.UserProfileId = userId;
            comment.PostId = post.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.AddComment(comment);
                return CreatedAtAction("Get", new { id = comment.Id }, comment);

        }

     

        // POST: CommentsController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Update(int id, Comment comment)
        //{

        //    try
        //    {

        //        //comment.UserProfileId = userId;
        //        _commentRepository.UpdateComment(comment);
        //        return RedirectToAction("Details", new { id = comment.Id });
        //    }
        //    catch
        //    {
        //        //    return View(comment);
        //        //}
        //    }

            // GET: CommentsController/Delete/5
            //public IActionResult Delete(int id)
            //{
            //    int userId = GetCurrentUserProfileId();
            //    Comment comment = _commentRepository.GetCommentById(id);

            //    if (comment.UserProfileId != userId || comment == null)
            //    {
            //        return NotFound();
            //    }
            //    return View(comment);
            //}

            // POST: CommentsController/Delete/5
            //[HttpPost]
            //[ValidateAntiForgeryToken]
            //public ActionResult Delete(int id, Comment comment)
            //{
            //    try
            //    {
            //        int userId = GetCurrentUserProfileId();
            //        Comment aComment = _commentRepository.GetCommentById(id);
            //        List<Post> posts = _postRepository.GetUserPostsById(userId);
            //        foreach (Post aPost in posts)
            //        {
            //            if (aPost.Id == aComment.PostId)
            //            {
            //                _commentRepository.DeleteComment(id);
            //            }
            //        }
            //        return RedirectToAction("Index", new { id = aComment.PostId });
            //    }
            //    catch
            //    {
            //        return View(comment);
            //    }
            //}
        }
    
    }

