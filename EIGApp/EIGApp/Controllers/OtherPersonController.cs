using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class OtherPersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.OtherPerson[] Get(string cadena)
        {
            var query = from OP in BD.OtherPersons
                        where (OP.Name.Contains(cadena) || OP.Profesion.Contains(cadena) || OP.ProfesionDescription.Contains(cadena))
                        select new {OP.Name, OP.Profesion, OP.ProfesionDescription, OP.Email, OP.Phone, OP.Latitude, OP.Longitude, OP.Ciprin, OP.Active, OP.CreationDate, OP.Avatar};

            var lista = query.ToArray();

            M.OtherPerson[] arrayOtherPersons = new M.OtherPerson[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.OtherPerson temp = new M.OtherPerson
                {
                    Name                 = lista[i].Name,
                    Profesion            = lista[i].Profesion,
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

                arrayOtherPersons[i] = temp;
            }

            return arrayOtherPersons;
        }

        public long Post(M.OtherPerson otraPersona)
        {
            long id = 0;

            try
            {
                O.OtherPerson BDOtherPerson = new O.OtherPerson
                {
                    CreationDate = System.DateTime.Now
                };

                BD.OtherPersons.Add(BDOtherPerson);
                BD.SaveChanges();

                id = BDOtherPerson.Id;
            }

            catch
            {
                id = 0;
            }

            return id;
        }

        public int Post(long id)
        {
            int c = 0;

            try
            {
                O.OtherPerson BDOtherPerson = BD.OtherPersons.FirstOrDefault(x => x.Id == id);

                if (BDOtherPerson.Active == 1)
                {
                    BDOtherPerson.Active = 0;
                    c = 0;
                }

                else
                {
                    BDOtherPerson.Active = 1;
                    c = 1;
                }

                BD.SaveChanges();
            }

            catch
            {
            }

            return c;
        }

        public bool Post(int idOtherPerson)
        {
            bool result = false;

            try
            {
                O.OtherPerson BDOtherPerson = BD.OtherPersons.FirstOrDefault(x => x.Id == idOtherPerson);
                BD.OtherPersons.Remove(BDOtherPerson);
                BD.SaveChanges();
                result = true;
            }

            catch
            {
            }

            return result;
        }
    }
}