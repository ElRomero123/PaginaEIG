using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class SuggestionController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.Suggestion suggestion)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Suggestion, O.Suggestion>();
                #pragma warning restore CS0618
                O.Suggestion BDSuggestion = AutoMapper.Mapper.Map<O.Suggestion>(suggestion);
                BDSuggestion.PostedDate = System.DateTime.Now.ToString("g");
                BD.Suggestions.Add(BDSuggestion);
                BD.SaveChanges();
                state = true;
            }

            catch
            {
                state = false;
            }

            return state;
        }

        public M.Suggestion[] Get()
        {
            var query = from S in BD.Suggestions
                        where (true)
                        select new {S.Name, S.Description, S.PostedDate};

            var lista = query.ToArray();

            M.Suggestion[] arraySuggestion = new M.Suggestion[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Suggestion temp = new M.Suggestion
                {
                    Name        = lista[i].Name,
                    Description = lista[i].Description,
                    PostedDate  = lista[i].PostedDate
                };

                arraySuggestion[i] = temp;
            }

            return arraySuggestion;
        }
    }
}