using System;
using RegisterationApp.Interfaces;

namespace RegisterationApp.Services
{
    public class FileWriterService : IFileWriterService
    {
        public void Write(string data)
        {
            System.IO.File.WriteAllText($"data_{System.DateTime.Now.ToFileTime()}.txt", data);
        }
    }
}