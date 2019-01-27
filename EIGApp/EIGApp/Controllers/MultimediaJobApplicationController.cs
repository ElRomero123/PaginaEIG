using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;

namespace EIGApp.Controllers
{
    public class MultimediaJobApplicationController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.MultimediaJobApplication multimediaJobApplication)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.MultimediaJobApplication, O.MultimediaJobApplication>();
                #pragma warning restore CS0618
                O.MultimediaJobApplication BDMultimediaJobApplication = AutoMapper.Mapper.Map<O.MultimediaJobApplication>(multimediaJobApplication);
                BD.MultimediaJobApplications.Add(BDMultimediaJobApplication);
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