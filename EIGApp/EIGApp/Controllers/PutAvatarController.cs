using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class PutAvatarController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool S = false;

            try
            {
                O.Person persona = BD.People.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                persona.Avatar = parametrosPutAvatar.DownloadURL;
                BD.SaveChanges();
                S = true;
            }

            catch
            {
                S = false;
            }

            return S;
        }
    }
}