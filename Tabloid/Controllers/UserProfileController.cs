using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("admin")]
        public IActionResult GetAllAdminProfiles()
        {
            return Ok(_userProfileRepository.GetAllAdminUserProfiles());
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        //Get All Users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUserProfiles());
        }

        //Get User by User.Id
        [HttpGet("details/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

        [HttpGet("deactivatedProfiles")]
        public IActionResult GetDeactivatedUsers()
        {
            return Ok(_userProfileRepository.GetAllDeactivatedUserProfiles());
        }

        [HttpPut("deactivate/{id}")]
        public ActionResult Deactivate(int id)
        {
         _userProfileRepository.DeactivateProfile(id);
                return NoContent();
        }

        [HttpPut("reactivate/{id}")]
        public ActionResult Reactivate(int id)
        {
            _userProfileRepository.ReactivateProfile(id);
            return NoContent();

        }
        [HttpGet("userTypes")]
        public IActionResult GetAllUserTypes()
        {
            return Ok(_userProfileRepository.GetAllUserTypes());
        }
        [HttpPut("edit/{id}")]
        public ActionResult EditUserType(int id, UserProfile user)
        {
            _userProfileRepository.EditUserType(user);
            return NoContent();

        }
    }
}
