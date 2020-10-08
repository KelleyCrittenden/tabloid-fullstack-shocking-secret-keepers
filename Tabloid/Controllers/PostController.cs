using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using System.Security.Claims;

using Tabloid.Repositories;
using Tabloid.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IPostRepository _postRepository;



        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;

        }
        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_postRepository.GetAllPublishedPosts());
        }
        [HttpGet("User/{id}")]
        public IActionResult GetbyUser(int id)
        {
            return Ok(_postRepository.GetUserPostsById(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

                

            
            
               
                return Ok(_postRepository.GetPublishedPostById(id));
            
            
        }

        [HttpGet("category")]
        public IActionResult GetCategories()
        {






            return Ok(_postRepository.GetAllCategories());


        }
        [HttpPost]
        public IActionResult Post(Post post)
        {
         
               

                _postRepository.Add(post);

                return CreatedAtAction("Get", new { id = post.Id }, post);
            
          
        }
        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Post post)
        {
           if(id != post.Id)
            {
                return BadRequest();

            }

            _postRepository.UpdatePost(post);
            return NoContent();
        }

      

        
           

        [HttpPut("delete/{id}")]
        public IActionResult Delete(int id)
        {
            
                _postRepository.DeletePost(id);
            return NoContent();
          

            
        }

       
    }
}
