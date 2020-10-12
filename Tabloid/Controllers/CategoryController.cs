using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
       // private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CategoryController(ICategoryRepository categoryRepository, IUserProfileRepository userProfileRepository)
        {
            _categoryRepository = categoryRepository;
           // _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }


        //GET: ALL
        //Category
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        //GET: Single
        //Category/Edit/1
        [HttpPut("{id}")]
        public IActionResult Edit(int id, Category category)
        {
            var currentUserProfile = GetCurrentUserProfile();

            //if (currentUserProfile.UserType.Name != "admin")
            //{
            //    return Unauthorized();
            //}
            //if (category == null)
            //{

            //    return NotFound();

            //}
            //if (id != category.Id)
            //{
            //    return BadRequest();
            //}
            _categoryRepository.UpdateCategory(category);
            return Ok(category);
        }

       

        //Post Category
        //Category
        [HttpPost]
        public IActionResult Post(Category category)
        {

            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.UserType.Name != "Admin")
            {
                return Unauthorized();
            }

            _categoryRepository.Add(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }


        // GET: Owners/Delete/5
        // [Authorize(Roles = "Admin")]
        //public ActionResult Delete(int id)
        //{
        //    Category category = _categoryRepository.GetCategoryById(id);
        //    if (category == null)
        //    {

        //        return NotFound();

        //    }
        //    else if (category.Id == 1)
        //    {

        //        return NotFound();

        //    }
        //    return Ok(category);
        //}

        ////PUT: Owners/Delete/5
        //[HttpPut("{id")]
        [HttpDelete("{id}")]
        //// TRY WITH THIS LATER 
        ////[ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
        //    if (id == 1)
        //    {

        //        return NotFound();

        //    }
        //    try
        //    {
                _categoryRepository.DeleteCategory(id);

                return Ok(id);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(category);
        //        //ADD 
        //    }
        }

        //Firebase
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

       
    }
}
