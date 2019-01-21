using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroBusinessController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool state = false;

            try
            {
                O.Business negocio = BD.Businesses.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                negocio.Avatar = parametrosPutAvatar.DownloadURL;
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