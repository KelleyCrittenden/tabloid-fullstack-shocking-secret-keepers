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
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IPostRepository _postRepository;

        public SubscriptionController(ISubscriptionRepository subscriptionRepository, IPostRepository postRepository )
        {
            _subscriptionRepository = subscriptionRepository;
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult GetAllSubscriptions()
        {
            return Ok(_subscriptionRepository.GetAllSubscriptions());
        }

        [HttpGet("{id}&{authorId}")]
        public IActionResult GetSubscriptionById(int id, int authorId)
        {
           
            return Ok(_subscriptionRepository.GetSubscriptionByUserId(id, authorId));
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.AddSubscription(subscription);
            return Ok();
        }

    }
}
