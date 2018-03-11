using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RegisterationApp.Interfaces;
using RegisterationApp.Models;

namespace RegisterationApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Register")]
    public class RegisterController : Controller
    {
        private IRegisterationService service;

        public RegisterController(IRegisterationService service)
        {
            this.service = service;
        }

        public IActionResult Post([FromBody]RegisterationInfo registerationInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            service.Save(registerationInfo);
            return Ok();
        }

    }
}