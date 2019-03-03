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

        public M.Person[] Get(long idUser)
        {
            var query = from P in BD.People
                        where (P.IdUser.Equals(idUser))
                        select new {P.Id, P.Name, P.ProfesionDescription, P.Email, P.Phone, P.Ciprin, P.Active, P.CreationDate, P.CreationHourZone, P.Avatar, P.User.Username};

            var query2 = from P in BD.OtherPersons
                        where (P.IdUser.Equals(idUser))
                        select new {P.Id, P.Name, P.Profesion, P.Email, P.Phone, P.Ciprin, P.Active, P.CreationDate, P.CreationHourZone, P.Avatar, P.User.Username};

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
                    Ciprin               = lista[i].Ciprin,
                    Active               = lista[i].Active,
                    CreationDate         = lista[i].CreationDate,
                    CreationHourZone     = lista[i].CreationHourZone,
                    Avatar               = lista[i].Avatar,
                    Type                 = false,
                    Username             = lista[i].Username
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
                    ProfesionDescription = lista2[i].Profesion,
                    Email                = lista2[i].Email,
                    Phone                = lista2[i].Phone,
                    Ciprin               = lista2[i].Ciprin,
                    Active               = lista2[i].Active,
                    CreationDate         = lista2[i].CreationDate,
                    CreationHourZone     = lista2[i].CreationHourZone,
                    Avatar               = lista2[i].Avatar,
                    Type                 = true,
                    Username             = lista2[i].Username
                };

                arrayPeople[j] = temp;
                i++;
            }

            return arrayPeople;
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
                NameAvatar           = persona.NameAvatar,
                IdUser               = persona.IdUser
            };

            BD.People.Add(BDPerson);
            BD.SaveChanges();

            return BDPerson.Id;
        }

       
        public bool Post(long idPerson)
        {
            bool S = false;
            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == idPerson);

                if (BDPerson.Active)
                {
                    BDPerson.Active = false;
                    S = false;
                }

                else
                {
                    BDPerson.Active = true;
                    S = true;
                }

                BD.SaveChanges();
            }

            catch { }
            return S;
        }

        public string Post(int idPerson)
        {
            string R = " ";

            try
            {
                O.Person BDPerson = BD.People.FirstOrDefault(x => x.Id == idPerson);
                BD.People.Remove(BDPerson);
                BD.SaveChanges();
                R = BDPerson.NameAvatar;
            }

            catch { }
            return R;
        }
    }
}
 