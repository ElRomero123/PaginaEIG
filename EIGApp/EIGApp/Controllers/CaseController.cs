using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class CaseController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.Case[] Get(long idUser)
        {
            var query = from C in BD.Cases
                        where (C.IdUser.Equals(idUser))
                        select new {C.Id, C.Name, C.DescriptionCase, C.PostedDate};

            var lista = query.ToArray();

            M.Case[] arrayCase = new M.Case[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Case temp = new M.Case
                {
                    Id              = lista[i].Id,
                    Name            = lista[i].Name,
                    DescriptionCase = lista[i].DescriptionCase,
                    PostedDate      = lista[i].PostedDate
                };

                arrayCase[i] = temp;
            }

            return arrayCase;
        }

        public M.Case[] Get()
        {
            var query = from C in BD.Cases
                        where (true)
                        select new {C.Id, C.Name, C.DescriptionCase, C.PostedDate, C.User.Username};

            var lista = query.ToArray();

            M.Case[] arrayCase = new M.Case[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Case temp = new M.Case
                {
                    Id              = lista[i].Id,
                    Name            = lista[i].Name,
                    DescriptionCase = lista[i].DescriptionCase,
                    PostedDate      = lista[i].PostedDate,
                    Username        = lista[i].Username
                };

                arrayCase[i] = temp;
            }

            return arrayCase;
        }

        public bool Post(long idCase)
        {
            bool result = false;

            try
            {
                O.Case caso = BD.Cases.FirstOrDefault(x => x.Id == idCase);
                BD.Cases.Remove(caso);
                BD.SaveChanges();
                result = true;
            }
            catch
            {
                result = false;
            }
            
            return result;
        }

        public bool Post(M.Case caso)
        {
            O.Case BDCaso = new O.Case
            {
                Name = caso.Name,
                DescriptionCase = caso.DescriptionCase,
                PostedDate = System.DateTime.Now.ToString("g"),
                PostedHourZone = System.TimeZoneInfo.Local.ToString(),
                IdUser = caso.IdUser
            };
            BD.Cases.Add(BDCaso);
            BD.SaveChanges();
            return true;
        }
    }
}