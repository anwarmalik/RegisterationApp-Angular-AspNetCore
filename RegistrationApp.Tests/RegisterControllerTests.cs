using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using RegisterationApp.Controllers;
using RegisterationApp.Interfaces;
using RegisterationApp.Models;
using Shouldly;
using Xunit;

namespace Registerations.Test
{
    public class RegisterControllerTests
    {
        [Fact]
        public void Post_Method_GivenValidInput_Expect_ValidMessage()
        {
            var service = NSubstitute.Substitute.For<IRegisterationService>();
            var controller = new RegisterController(service);
            var registerationInfo = new RegisterationInfo();

            var result = controller.Post(registerationInfo);

            service.Received().Save(Arg.Any<RegisterationInfo>());
            result.GetType().ShouldBe(typeof(OkResult));
        }

        [Fact]
        public void Post_Method_GivenInvalidInput_Expect_BadRequestAsResult()
        {
            var service = NSubstitute.Substitute.For<IRegisterationService>();
            var controller = new RegisterController(service);
            var registerationInfo = new RegisterationInfo();
            controller.ModelState.AddModelError(nameof(RegisterationInfo.AccountName), "fakeError");
            var result = controller.Post(registerationInfo);

            service.DidNotReceive().Save(Arg.Any<RegisterationInfo>());
            result.GetType().ShouldBe(typeof(BadRequestObjectResult));
            var badResult = (BadRequestObjectResult)result;
            badResult.Value.GetType().ShouldBe(typeof(SerializableError));
        }
    }
}
