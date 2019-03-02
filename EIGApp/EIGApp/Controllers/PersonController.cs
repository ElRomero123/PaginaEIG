using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class PersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.Person[] Get(string cadena)
        {
            var query = from P in BD.People
                        where (P.Name.Contains(cadena) || P.ProfesionDescription.Contains(cadena))
                        orderby (P.Ciprin)
                        select new {P.Id, P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Latitude, P.Longitude, P.Ciprin, P.Active, P.CreationDate, P.Avatar};

            var lista = query.ToArray();

            M.Person[] arrayPeople = new M.Person[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Person temp = new M.Person
                {
                    Id                   = lista[i].Id,
                    Name                 = lista[i].Name,
                    ProfesionDescription = lista[i].ProfesionDescription,
                    Email                = lista[i].Email,
                    Phone                = lista[i].Phone,
                    Latitude             = lista[i].Latitude,
                    Longitude            = lista[i].Longitude,
                    Ciprin               = lista[i].Ciprin,
                    Active               = lista[i].Active,
                    CreationDate         = lista[i].CreationDate,
                    Avatar               = lista[i].Avatar
                };

                arrayPeople[i] = temp;
            }

            return arrayPeople;
        }

        public void Get(long idUser)
        {
            /*
            var query = from P in BD.People
                        where (P.IdUser.Equals(idUser))
                        select new {P.Id, P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Latitude, P.Longitude, P.Ciprin, P.Active, P.CreationDate, P.Avatar};

            var query2 = from P in BD.OtherPersons
                        where (P.IdUser.Equals(idUser))
                        select new {P.Id, P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Latitude, P.Longitude, P.Ciprin, P.Active, P.CreationDate, P.Avatar};

            var lista = query.ToArray();
            var lista2 = query2.ToArray();

            int size1 = lista.Length;
            int size2 = lista2.Length;

            M.Person[] arrayPeople = new M.Person[size1 + size2];

            int i;
            for (i = 0; i < size1; i++)
            {
                M.Person temp = new M.Person
                {
                    Id                   = lista[i].Id,
                    Name                 = lista[i].Name,
                    ProfesionDescription = lista[i].ProfesionDescription,
                    Email                = lista[i].Email,
                    Phone                = lista[i].Phone,
                    Latitude             = lista[i].Latitude,
                    Longitude            = lista[i].Longitude,
                    Ciprin               = lista[i].Ciprin,
                    Active               = lista[i].Active,
                    CreationDate         = lista[i].CreationDate,
                    Avatar               = lista[i].Avatar,
                    Type                 = false
                };

                arrayPeople[i] = temp;
            }

            i = 0;
            for (int j = size1; j < size1 + size2; j++)
            {
                M.Person temp = new M.Person
                {
                    Id                   = lista2[i].Id,
                    Name                 = lista2[i].Name,
                    ProfesionDescription = lista2[i].ProfesionDescription,
                    Email                = lista2[i].Email,
                    Phone                = lista2[i].Phone,
                    Latitude             = lista2[i].Latitude,
                    Longitude            = lista2[i].Longitude,
                    Ciprin               = lista2[i].Ciprin,
                    Active               = lista2[i].Active,
                    CreationDate         = lista2[i].CreationDate,
                    Avatar               = lista2[i].Avatar,
                    Type                 = true
                };

                arrayPeople[j] = temp;
                i++;
            }

            return arrayPeople;
            */
        }

        public long Post(M.Person persona)
        { 
            O.Person BDPerson = new O.Person
            {
                Name                 = persona.Name,
                ProfesionDescription = persona.ProfesionDescription,
                Email                = persona.Email,
                Phone                = persona.Phone,
                Latitude             = persona.Latitude,
                Longitude            = persona.Longitude,
                Ciprin               = persona.Ciprin,
                Active               = persona.Active,
                CreationDate         = System.DateTime.Now,
                CreationHourZone     = System.TimeZoneInfo.Local.ToString(),
                Avatar               = persona.Avatar,
                IdUser               = persona.IdUser
            };

            BD.People.Add(BDPerson);
            BD.SaveChanges();

            return BDPerson.Id;
        }

        /*
        public bool Post(long id)
        {
            bool state = false;

            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == id);

                if (BDPerson.Active)
                {
                    BDPerson.Active = false;
                    state = false;
                }

                else
                {
                    BDPerson.Active = true;
                    state = true;
                }

                BD.SaveChanges();
            }

            catch { }
            return state;
        }
        */

        public void Post(int idPerson)
        {
            /*
            bool result = false;

            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == idPerson);
                BD.People.Remove(BDPerson);
                BDPerson.Active = 0;
                BD.SaveChanges();
                result = true;
            }

            catch { }
            return result;
            */
        }
    }
}
 