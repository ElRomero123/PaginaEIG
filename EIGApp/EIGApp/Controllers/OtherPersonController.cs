using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class OtherPersonController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.OtherPerson[] Get(string cadena)
        {
            var query = from OP in BD.OtherPersons
                        where (OP.Name.Contains(cadena) || OP.Profesion.Contains(cadena) || OP.ProfesionDescription.Contains(cadena) || OP.City.Contains(cadena))
                        select new { OP.Name, OP.Profesion, OP.ProfesionDescription, OP.WebPage, OP.Email, OP.Phone, OP.City, OP.Address, OP.Avatar };

            var lista = query.ToArray();

            M.OtherPerson[] arrayOtherPersons = new M.OtherPerson[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.OtherPerson temp = new M.OtherPerson
                {
                    Name = lista[i].Name,
                    Profesion = lista[i].Profesion,
                    ProfesionDescription = lista[i].ProfesionDescription,
                    WebPage = lista[i].WebPage,
                    Email = lista[i].Email,
                    Phone = lista[i].Phone,
                    City = lista[i].City,
                    Address = lista[i].Address,
                    Avatar = lista[i].Avatar
                };

                arrayOtherPersons[i] = temp;
            }

            return arrayOtherPersons;
        }
    }
}