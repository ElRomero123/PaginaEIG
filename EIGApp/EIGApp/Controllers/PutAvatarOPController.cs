using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class PutAvatarOPController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool S = false;

            try
            {
                O.OtherPerson otraPersona = BD.OtherPersons.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                otraPersona.Avatar = parametrosPutAvatar.DownloadURL;
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