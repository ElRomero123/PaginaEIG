using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroFileCaseController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametroPutFile parametroPutFile)
        {
            bool state = false;

            try
            {
                O.MultimediaCase multimediaCase = BD.MultimediaCases.FirstOrDefault(x => x.Id == parametroPutFile.Id);
                multimediaCase.FileName     = parametroPutFile.FileName;
                multimediaCase.DownloadLink = parametroPutFile.DownloadURL;
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