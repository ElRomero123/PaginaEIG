﻿using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class PersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.Person[] Get(string criterio)
        {
            var query = from P in BD.People
                        where ((P.Name.Contains(criterio) || P.ProfesionDescription.Contains(criterio)) && P.Active)
                        select new {P.Id, P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Latitude, P.Longitude, P.Ciprin, P.Active, P.CreationDate, P.CreationHourZone, P.Avatar, P.User.Username};

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
                    CreationDate         = lista[i].CreationDate, 
                    CreationHourZone     = lista[i].CreationHourZone, 
                    Avatar               = lista[i].Avatar,
                    Username             = lista[i].Username
                };

                arrayPeople[i] = temp;
            }

            return arrayPeople;
        }

        /* Obtiene todos los perfiles creados por un Usuario */
        public M.Person[] Get(long idUser)
        {
            var SP  = BD.People;
            var SOP = BD.OtherPersons;

            var query  = from P in SP
                        where (P.IdUser.Equals(idUser))
                        select new {P.Id, P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Ciprin, P.Active, P.CreationDate, P.CreationHourZone, P.Avatar, P.Views};

            var query2 = from OP in SOP
                        where (OP.IdUser.Equals(idUser))
                        select new {OP.Id, OP.Name, OP.Profesion, OP.Email, OP.Phone, OP.Ciprin, OP.Active, OP.CreationDate, OP.CreationHourZone, OP.Avatar, OP.Views};

            M.Person[] arrayPeople = new M.Person[SP.Count() + SOP.Count()];
            M.Person PT; 

            int i = 0;

            foreach(var item in query)
            {
                PT = new M.Person
                {
                    Id                   = item.Id,
                    Name                 = item.Name,
                    ProfesionDescription = item.ProfesionDescription,
                    Email                = item.Email,
                    Phone                = item.Phone,
                    Ciprin               = item.Ciprin,
                    Active               = item.Active,
                    CreationDate         = item.CreationDate,
                    CreationHourZone     = item.CreationHourZone,
                    Avatar               = item.Avatar,
                    Views                = item.Views,
                    Type                 = false
                };
                arrayPeople[i] = PT;
                i++;
            }

            foreach (var item in query2)
            {
                PT = new M.Person
                {
                    Id                   = item.Id,
                    Name                 = item.Name,
                    ProfesionDescription = item.Profesion,
                    Email                = item.Email,
                    Phone                = item.Phone,
                    Ciprin               = item.Ciprin,
                    Active               = item.Active,
                    CreationDate         = item.CreationDate,
                    CreationHourZone     = item.CreationHourZone,
                    Avatar               = item.Avatar,
                    Views                = item.Views,
                    Type                 = true
                };
                arrayPeople[i] = PT;
                i++;
            }

            return arrayPeople;
        }
        /* Obtiene todos los perfiles creados por un Usuario */

        /* Agregar un Investigador Privado */
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
                Active               = false,
                CreationDate         = System.DateTime.Now.ToString(),
                CreationHourZone     = System.TimeZoneInfo.Local.ToString(),
                Avatar               = "",
                NameAvatar           = "",
                Views                = 0,
                IdUser               = persona.IdUser
            };
            BD.People.Add(BDPerson);
            BD.SaveChanges();

            O.User BDUser = BD.Users.FirstOrDefault(x => x.Id == persona.IdUser);
            BDUser.CountProfiles = BDUser.CountProfiles + 1;
            BD.SaveChanges();
       
            return BDPerson.Id;
        }
        /* Agregar un Investigador Privado */

        /* Activar/Desactivar Perfil */
        public bool Post(long idPerson)
        {
            bool R = false;
            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == idPerson);
                if (BDPerson.Active)
                {
                    BDPerson.Active = false;
                    R = false;
                }

                else
                {
                    BDPerson.Active = true;
                    R = true;
                }
                BD.SaveChanges();
            }
            catch { }
            return R;
        }
        /* Activar/Desactivar Perfil */
    }
}
 