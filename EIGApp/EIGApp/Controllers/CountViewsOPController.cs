using System.Web.Http;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class CountViewsOPController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(long idOtherPerson)
        {
            bool R = false;
            try
            {
                O.OtherPerson BDOtherPerson = BD.OtherPersons.FirstOrDefault(x => x.Id == idOtherPerson);
                BDOtherPerson.Views = BDOtherPerson.Views + 1;
                BD.SaveChanges();
                R = true;
            }
            catch { R = false; }
            return R;
        }
    }
}