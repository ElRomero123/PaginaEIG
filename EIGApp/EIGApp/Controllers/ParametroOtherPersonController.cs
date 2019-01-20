using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroOtherPersonController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool state = false;

            try
            {
                O.OtherPerson otraPersona = BD.OtherPersons.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                otraPersona.Avatar = parametrosPutAvatar.DownloadURL;
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