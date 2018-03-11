using RegisterationApp.Interfaces;
using RegisterationApp.Models;

namespace RegisterationApp.Services
{
    public class RegisterationService : IRegisterationService
    {
        private IFileWriterService fileWriterService;

        public RegisterationService(IFileWriterService fileWriterService)
        {
            this.fileWriterService = fileWriterService;
        }

        public void Save(RegisterationInfo model)
        {
            fileWriterService.Write(model.ToString());
        }
    }
}