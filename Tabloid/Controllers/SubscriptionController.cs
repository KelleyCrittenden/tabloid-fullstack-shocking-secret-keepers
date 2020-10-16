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

        public SubscriptionController(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet]
        public IActionResult GetAllSubscriptions()
        {
            return Ok(_subscriptionRepository.GetAllSubscriptions());
        }

        [HttpGet("{id}")]
        public IActionResult GetSubscriptionById(int id)
        {
            return Ok(_subscriptionRepository.GetSubscriptionByUserId(id));
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.AddSubscription(subscription);
            return Ok();
        }

    }
}
