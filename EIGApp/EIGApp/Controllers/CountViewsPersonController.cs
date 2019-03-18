using System.Web.Http;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class CountViewsPersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(long idPerson)
        {
            bool R = false;
            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == idPerson);
                BDPerson.Views = BDPerson.Views + 1;
                BD.SaveChanges();
                R = true;
            }
            catch { R = false; }
            return R;
        }
    }
}