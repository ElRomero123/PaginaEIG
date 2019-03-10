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
            var SOP = BD.OtherPersons;
            var query = from OP in SOP
                        where ((OP.City.Contains(criterio)) && OP.Active)
                        select new {OP.Id, OP.Name, OP.Profesion, OP.ProfesionDescription, OP.Email, OP.Phone, OP.Latitude, OP.Longitude, OP.Ciprin, OP.CreationDate, OP.CreationHourZone, OP.Avatar, OP.Views, OP.User.Username};

            M.OtherPerson[] arrayOtherPerson = new M.OtherPerson[query.Count()];
            M.OtherPerson temp;

            long i = 0;
            foreach (var item in query)
            {
                temp = new M.OtherPerson
                {
                    Id                   = item.Id,
                    Name                 = item.Name,
                    Profesion            = item.Profesion,
                    ProfesionDescription = item.ProfesionDescription,
                    Email                = item.Email,
                    Phone                = item.Phone,
                    Latitude             = item.Latitude,
                    Longitude            = item.Longitude,
                    Ciprin               = item.Ciprin,
                    CreationDate         = item.CreationDate,
                    CreationHourZone     = item.CreationHourZone,
                    Avatar               = item.Avatar,
                    Views                = item.Views,
                    Username             = item.Username
                };

                arrayOtherPerson[i] = temp;
                i++;
            }
            return arrayOtherPerson;
        }

        /* Agregar un Profesional Afín */
        public long Post(M.OtherPerson otraPersona)
        {
            O.OtherPerson BDOtherPerson = new O.OtherPerson
            {
                Name                 = otraPersona.Name,
                Profesion            = otraPersona.Profesion,
                ProfesionDescription = otraPersona.ProfesionDescription,
                Email                = otraPersona.Email,
                Phone                = otraPersona.Phone,
                City                 = otraPersona.City,
                Latitude             = otraPersona.Latitude,
                Longitude            = otraPersona.Longitude,
                Ciprin               = otraPersona.Ciprin,
                Active               = false,
                CreationDate         = System.DateTime.Now.ToString("g"),
                CreationHourZone     = System.TimeZoneInfo.Local.ToString(),
                Avatar               = "",
                NameAvatar           = "",
                Views                = 0,
                IdUser               = otraPersona.IdUser
            };
            BD.OtherPersons.Add(BDOtherPerson);
            BD.SaveChanges();

            O.User BDUser = BD.Users.FirstOrDefault(x => x.Id == otraPersona.IdUser);
            BDUser.CountProfiles = BDUser.CountProfiles + 1;
            BD.SaveChanges();

            return BDOtherPerson.Id;
        }
        /* Agregar un Profesional Afín */

        /* Activar/Desactivar Perfil Afín */
        public bool Post(long idOtherPerson)
        {
            bool R = false;
            try
            {
                O.OtherPerson BDOtherPerson = BD.OtherPersons.FirstOrDefault(x => x.Id == idOtherPerson);
                if (BDOtherPerson.Active)
                {
                    BDOtherPerson.Active = false;
                    R = false;
                }

                else
                {
                    BDOtherPerson.Active = true;
                    R = true;
                }
                BD.SaveChanges();
            }
            catch { }
            return R;
        }
        /* Activar/Desactivar Perfil Afín */
    }
}