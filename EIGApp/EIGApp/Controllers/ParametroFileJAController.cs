using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroFileJAController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        /* Sincroniza BD con FS Nube */
        public bool Post(M.ParametroPutFile parametroPutFile)
        {
            bool S = false;
            try
            {
                O.MediaJobApplication mediaJobApplication = BD.MediaJobApplications.FirstOrDefault(x => x.Id == parametroPutFile.Id);
                mediaJobApplication.FileName     = parametroPutFile.FileName;
                mediaJobApplication.DownloadLink = parametroPutFile.DownloadURL;
                BD.SaveChanges();
                S = true;
            }
            catch { S = false; }
            return S;
        }
        /* Sincroniza BD con FS Nube */
    }
}