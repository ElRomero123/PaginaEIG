using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class PersonController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.Person[] Get(string cadena)
        {
            var query = from P in BD.People
                        where (P.Name.Contains(cadena) || P.LastName.Contains(cadena) || P.City.Contains(cadena) || P.ProfesionDescription.Contains(cadena))
                        select new { P.Name, P.LastName, P.ProfesionDescription, P.WebPage, P.Email, P.Phone, P.City, P.Address, P.Avatar };

            var lista = query.ToArray();

            M.Person[] arrayPeople = new M.Person[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Person temp = new M.Person
                {
                    Name = lista[i].Name,
                    LastName = lista[i].LastName,
                    ProfesionDescription = lista[i].ProfesionDescription,
                    WebPage = lista[i].WebPage,
                    Email = lista[i].Email,
                    Phone = lista[i].Phone,
                    City = lista[i].City,
                    Address = lista[i].Address,
                    Avatar = lista[i].Avatar
                };

                arrayPeople[i] = temp;
            }

            return arrayPeople;
        }
    }
}