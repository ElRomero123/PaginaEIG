using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;

namespace EIGApp.Controllers
{
    public class JobApplicationController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.JobApplication jobApplication)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.JobApplication, O.JobApplication>();
                #pragma warning restore CS0618
                O.JobApplication BDJobApplication = AutoMapper.Mapper.Map<O.JobApplication>(jobApplication);
                BD.JobApplications.Add(BDJobApplication);
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