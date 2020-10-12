using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;


namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {

        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }


        // GET: api/<TagController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }


        // POST api/<TagController>
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepository.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        // PUT api/<TagController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.GetById(id);
            if(tag != null)
            {
                NotFound();
            }
            return Ok(tag);
        }

        // DELETE api/<TagController>/5
        //[HttpPut("{id}")]
       // public IActionResult Delete(int id)
        //{
            //_tagRepository.Delete(id);
            //return NoContent();
        //}
    
        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            { 
                return BadRequest();
            }
            _tagRepository.Update(tag);
            return NoContent();
        }


    }
}
