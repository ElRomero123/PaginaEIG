﻿using System.Web.Http;
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
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.OtherPerson, O.OtherPerson>();
                #pragma warning restore CS0618
                O.OtherPerson BDOtherPerson = AutoMapper.Mapper.Map<O.OtherPerson>(otraPersona);
                BDOtherPerson.CreationDate = System.DateTime.Now.ToString("g");
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
    }
}