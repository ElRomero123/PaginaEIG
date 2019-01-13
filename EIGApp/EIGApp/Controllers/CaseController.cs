using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;

namespace EIGApp.Controllers
{
    public class CaseController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

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