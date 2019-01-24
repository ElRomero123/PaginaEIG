using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class CaseController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.Case[] Get(long idUser)
        {
            var query = from C in BD.Cases
                        where (C.IdUser.Equals(idUser))
                        select new { C.Id, C.Name, C.DescriptionCase };

            var lista = query.ToArray();

            M.Case[] arrayCase = new M.Case[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Case temp = new M.Case
                {
                    Id = lista[i].Id,
                    Name = lista[i].Name,
                    DescriptionCase = lista[i].DescriptionCase
                };

                arrayCase[i] = temp;
            }

            return arrayCase;
        }

        public bool Post(M.Case caso)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Case, O.Case>();
                #pragma warning restore CS0618
                O.Case BDCase = AutoMapper.Mapper.Map<O.Case>(caso);
                BD.Cases.Add(BDCase);
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