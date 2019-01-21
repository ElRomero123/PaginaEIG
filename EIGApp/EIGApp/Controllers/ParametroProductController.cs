using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroProductController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool state = false;

            try
            {
                O.Product producto = BD.Products.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                producto.Avatar = parametrosPutAvatar.DownloadURL;
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