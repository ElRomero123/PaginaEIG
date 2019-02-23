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
                        select new {P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Latitude, P.Longitude, P.Ciprin, P.Active, P.CreationDate, P.Avatar};

            var lista = query.ToArray();

            M.Person[] arrayPeople = new M.Person[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Person temp = new M.Person
                {
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

        public M.Person[] Get(long idUser)
        {
            var query = from P in BD.People
                        where (P.IdUser.Equals(idUser))
                        select new {P.Id, P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Latitude, P.Longitude, P.Ciprin, P.Active, P.CreationDate, P.Avatar};

            var lista = query.ToArray();

            M.Person[] arrayPeople = new M.Person[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Person temp = new M.Person
                {
                    Id = lista[i].Id,
                    Name = lista[i].Name,
                    ProfesionDescription = lista[i].ProfesionDescription,
                    Email = lista[i].Email,
                    Phone = lista[i].Phone,
                    Latitude = lista[i].Latitude,
                    Longitude = lista[i].Longitude,
                    Ciprin = lista[i].Ciprin,
                    Active = lista[i].Active,
                    CreationDate = lista[i].CreationDate,
                    Avatar = lista[i].Avatar
                };

                arrayPeople[i] = temp;
            }

            return arrayPeople;
        }

        public int Post(long id)
        {
            int c = 0;

            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == id);

                if (BDPerson.Active == 1)
                {
                    BDPerson.Active = 0;
                    c = 0;
                }

                else
                {
                    BDPerson.Active = 1;
                    c = 1;
                }

                BD.SaveChanges();
            }
                
            catch
            { 
            }

            return c;
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
                BDPerson.CreationDate = System.DateTime.Now.ToString("g");
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
    }
}
 