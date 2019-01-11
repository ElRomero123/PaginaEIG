using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class UserController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.User Get(string username, string password)
        {
            var query = from U in BD.Users
                        where (U.Username == username)
                        select new {U.Password, U.Name, U.Phone, U.Email};

            var lista = query.ToArray()[0];

            M.User temp = new M.User();

            if (lista.Password.Equals(password))
            { 
                temp.Name = lista.Name;
                temp.Phone = lista.Phone;
                temp.Email = lista.Email;
            }
            
            return temp;
        }
    }
}