using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroFileOPController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametroPutFile parametroPutFile)
        {
            bool state = false;

            try
            {
                O.MediaOtherPerson mediaOtherPerson = BD.MediaOtherPersons.FirstOrDefault(x => x.Id == parametroPutFile.Id);
                mediaOtherPerson.FileName = parametroPutFile.FileName;
                mediaOtherPerson.DownloadLink = parametroPutFile.DownloadURL;
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