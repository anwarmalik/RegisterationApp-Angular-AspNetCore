using NSubstitute;
using RegisterationApp.Interfaces;
using RegisterationApp.Models;
using RegisterationApp.Services;
using Xunit;

namespace Registerations.Test
{
    public class RegisterationServiceUnitTests
    {
        [Fact]
        public void Given_ValidUserInfo_UserIsSaved()
        {
            var fileWriterService = Substitute.For<IFileWriterService>();
            var model = new RegisterationInfo();
            var service = new RegisterationService(fileWriterService);

            service.Save(model);

            fileWriterService.Received().Write(model.ToString());
        }
    }

}
