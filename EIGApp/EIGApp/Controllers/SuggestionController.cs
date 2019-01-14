using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;

namespace EIGApp.Controllers
{
    public class SuggestionController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.Suggestion suggestion)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Suggestion, O.Suggestion>();
                #pragma warning restore CS0618
                O.Suggestion BDSuggestion = AutoMapper.Mapper.Map<O.Suggestion>(suggestion);
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
    }
}