using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class JobApplicationController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.JobApplication[] Get(long idUser)
        {
            var query = from JA in BD.JobApplications
                        where (JA.IdUser.Equals(idUser))
                        select new {JA.Id, JA.Name, JA.DocumentNumber, JA.DescriptionApplication, JA.Age, JA.PostedDate};

            var lista = query.ToArray();

            M.JobApplication[] arrayJobApplication = new M.JobApplication[lista.Length];

            for(int i = 0; i < lista.Length; i++)
            {
                M.JobApplication temp = new M.JobApplication
                {
                    Id                     = lista[i].Id,
                    Name                   = lista[i].Name,
                    DocumentNumber         = lista[i].DocumentNumber,
                    DescriptionApplication = lista[i].DescriptionApplication,
                    Age                    = lista[i].Age,
                    PostedDate             = lista[i].PostedDate
                };

                arrayJobApplication[i] = temp;
            }

            return arrayJobApplication;
        }

        public bool Post(M.JobApplication jobApplication)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.JobApplication, O.JobApplication>();
                #pragma warning restore CS0618
                O.JobApplication BDJobApplication = AutoMapper.Mapper.Map<O.JobApplication>(jobApplication);
                BDJobApplication.PostedDate = System.DateTime.Now.ToString("g");
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

        public bool Post(long idJA)
        {
            bool result = false;

            try
            {
                O.JobApplication JA = BD.JobApplications.FirstOrDefault(x => x.Id == idJA);
                BD.JobApplications.Remove(JA);
                BD.SaveChanges();
                result = true;
            }
            catch
            {
                result = false;
            }

            return result;
        }
    }
}