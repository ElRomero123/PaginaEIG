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
                        where (P.Name.Contains(cadena) || P.ProfesionDescription.Contains(cadena) || P.City.Contains(cadena))
                        select new { P.Name, P.ProfesionDescription, P.Email, P.Phone, P.City, P.Address, P.Avatar };

            var lista = query.ToArray();

            M.Person[] arrayPeople = new M.Person[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Person temp = new M.Person
                {
                    Name = lista[i].Name,
                    ProfesionDescription = lista[i].ProfesionDescription,
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

        public long Post(M.Person persona)
        {
            long id = 0;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Person, O.Person>();
                #pragma warning restore CS0618
                O.Person BDPerson = AutoMapper.Mapper.Map<O.Person>(persona);
                BD.People.Add(BDPerson);
                BD.SaveChanges();

                id = BDPerson.Id;
            }

            catch
            {
                id = 0;
            }

            return id;
        }


        public bool Post(long idPerson, string downloadURL)
        {
            bool state = false;

            try
            {
                O.Person persona = BD.People.FirstOrDefault(x => x.Id == idPerson);
                persona.Avatar = downloadURL;
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