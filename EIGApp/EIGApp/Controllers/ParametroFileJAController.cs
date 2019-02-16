using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroFileJAController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametroPutFile parametroPutFile)
        {
            bool state = false;

            try
            {
                O.MultimediaJobApplication multimediaJobApplication = BD.MultimediaJobApplications.FirstOrDefault(x => x.Id == parametroPutFile.Id);
                multimediaJobApplication.FileName = parametroPutFile.FileName;
                multimediaJobApplication.DownloadLink = parametroPutFile.DownloadURL;
                BD.SaveChanges();
                state = true;
            }

            catch
            {
                state = false;
            }

            return state;
        }
    }
}