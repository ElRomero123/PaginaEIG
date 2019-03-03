using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class OtherPersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.OtherPerson[] Get(string criterio)
        {
            var query = from OP in BD.OtherPersons
                        where ((OP.Name.Contains(criterio) || OP.Profesion.Contains(criterio) || OP.ProfesionDescription.Contains(criterio)))
                        select new {OP.Id, OP.Name, OP.Profesion, OP.ProfesionDescription, OP.Email, OP.Phone, OP.Latitude, OP.Longitude, OP.Ciprin, OP.Active, OP.CreationDate, OP.CreationHourZone, OP.Avatar, OP.User.Username};

            var lista = query.ToArray();

            M.OtherPerson[] arrayOtherPersons = new M.OtherPerson[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.OtherPerson temp = new M.OtherPerson
                {
                    Id                   = lista[i].Id, 
                    Name                 = lista[i].Name,
                    Profesion            = lista[i].Profesion, 
                    ProfesionDescription = lista[i].ProfesionDescription, 
                    Email                = lista[i].Email, 
                    Phone                = lista[i].Phone, 
                    Latitude             = lista[i].Latitude,
                    Longitude            = lista[i].Longitude,
                    Ciprin               = lista[i].Ciprin, 
                    CreationDate         = lista[i].CreationDate, 
                    CreationHourZone     = lista[i].CreationHourZone, 
                    Avatar               = lista[i].Avatar,
                    Username             = lista[i].Username 
                };

                arrayOtherPersons[i] = temp;
            }

            return arrayOtherPersons;
        }

        public long Post(M.OtherPerson otraPersona)
        {
            O.OtherPerson BDOtherPerson = new O.OtherPerson
            {
                Name                 = otraPersona.Name,
                Profesion            = otraPersona.Profesion,
                ProfesionDescription = otraPersona.ProfesionDescription,
                Email                = otraPersona.Email,
                Phone                = otraPersona.Phone,
                Latitude             = otraPersona.Latitude,
                Longitude            = otraPersona.Longitude,
                Ciprin               = otraPersona.Ciprin,
                Active               = otraPersona.Active,
                CreationDate         = System.DateTime.Now,
                CreationHourZone     = System.TimeZoneInfo.Local.ToString(),
                Avatar               = otraPersona.Avatar,
                NameAvatar           = otraPersona.NameAvatar,
                IdUser               = otraPersona.IdUser
            };

            BD.OtherPersons.Add(BDOtherPerson);
            BD.SaveChanges();

            return BDOtherPerson.Id;
        }

        public bool Post(long idOtherPerson)
        {
            bool S = false;
            try
            {
                O.OtherPerson BDOtherPerson = BD.OtherPersons.FirstOrDefault(x => x.Id == idOtherPerson);

                if (BDOtherPerson.Active)
                {
                    BDOtherPerson.Active = false;
                    S = false;
                }

                else
                {
                    BDOtherPerson.Active = true;
                    S = true;
                }

                BD.SaveChanges();
            }
            catch { }
            return S;
        }

        public string Post(int idOtherPerson)
        {
            string R = "";

            try
            {
                O.OtherPerson BDOtherPerson = BD.OtherPersons.FirstOrDefault(x => x.Id == idOtherPerson);
                BD.OtherPersons.Remove(BDOtherPerson);
                BD.SaveChanges();
                R = BDOtherPerson.NameAvatar;
            }

            catch{}

            return R;
        }
    }
}