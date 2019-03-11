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
            bool S = false;
            try
            {
                O.MediaCase mediaCase = BD.MediaCases.FirstOrDefault(x => x.Id == parametroPutFile.Id);
                mediaCase.FileName     = parametroPutFile.FileName;
                mediaCase.DownloadLink = parametroPutFile.DownloadURL;
                BD.SaveChanges();
                S = true;
            }

            catch{S = false;}
            return S;
        }
    }
}