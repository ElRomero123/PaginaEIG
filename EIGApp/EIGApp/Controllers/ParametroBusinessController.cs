using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroBusinessController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool state = false;

            try
            {
                O.Business negocio = BD.Businesses.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                negocio.Avatar     = parametrosPutAvatar.DownloadURL;
                negocio.NameAvatar = parametrosPutAvatar.FileName;
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