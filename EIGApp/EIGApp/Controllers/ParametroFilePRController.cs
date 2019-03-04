using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroFilePRController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametroPutFile parametroPutFile)
        {
            bool state = false;

            try
            {
                O.MediaProduct mediaProduct = BD.MediaProducts.FirstOrDefault(x => x.Id == parametroPutFile.Id);
                mediaProduct.FileName = parametroPutFile.FileName;
                mediaProduct.DownloadLink = parametroPutFile.DownloadURL;
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