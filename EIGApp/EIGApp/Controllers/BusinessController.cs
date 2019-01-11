using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class BusinessController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.Business[] Get(string cadena)
        {
            var query = from B in BD.Businesses
                        where (B.Name.Contains(cadena) || B.Specialism.Contains(cadena) || B.SpecialismDescription.Contains(cadena) || B.City.Contains(cadena))
                        select new {B.Name, B.Specialism, B.SpecialismDescription, B.WebPage, B.Phone, B.City, B.Address, B.Avatar};

            var lista = query.ToArray();

            M.Business[] arrayBusinesses = new M.Business[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Business temp = new M.Business
                {
                    Name = lista[i].Name,
                    Specialism = lista[i].Specialism,
                    SpecialismDescription = lista[i].SpecialismDescription,
                    WebPage = lista[i].WebPage,
                    Phone = lista[i].Phone,
                    City = lista[i].City,
                    Address = lista[i].Address,
                    Avatar = lista[i].Avatar
                };

                arrayBusinesses[i] = temp;

            }

            return arrayBusinesses;
        }
    }
}