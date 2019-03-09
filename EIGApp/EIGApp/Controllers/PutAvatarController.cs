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
                persona.Avatar     = parametrosPutAvatar.DownloadURL;
                persona.NameAvatar = parametrosPutAvatar.FileName;
                BD.SaveChanges();
                S = true;
            }

            catch
            {
                S = false;
            }

            return S;
        }

        /* Elimina un Investigador Privado */
        public string Post(int idPerson)
        {
            string R = "";
            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == idPerson);
                BD.People.Remove(BDPerson);
                BD.SaveChanges();

                O.User BDUser = BD.Users.FirstOrDefault(x => x.Id == BDPerson.IdUser);
                BDUser.CountProfiles = BDUser.CountProfiles - 1;
                BD.SaveChanges();

                R = BDPerson.NameAvatar;   
            }
            catch { }
            return R;
        }
        /* Elimina un Investigador Privado */
    }
}