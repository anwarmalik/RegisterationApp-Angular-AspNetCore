using RegisterationApp.Models;

namespace RegisterationApp.Interfaces
{
    public interface IRegisterationService
    {
        void Save(RegisterationInfo model);
    }
}