using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class JobApplicationController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

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

        public M.JobApplication[] Get()
        {
            var query = from JA in BD.JobApplications
                        where (true)
                        select new {JA.Id, JA.Name, JA.DocumentNumber, JA.DescriptionApplication, JA.Age, JA.PostedDate, JA.User.Username};

            var lista = query.ToArray();

            M.JobApplication[] arrayJobApplication = new M.JobApplication[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.JobApplication temp = new M.JobApplication
                {
                    Id                     = lista[i].Id,
                    Name                   = lista[i].Name,
                    DocumentNumber         = lista[i].DocumentNumber,
                    DescriptionApplication = lista[i].DescriptionApplication,
                    Age                    = lista[i].Age,
                    PostedDate             = lista[i].PostedDate,
                    Username               = lista[i].Username
                };

                arrayJobApplication[i] = temp;
            }

            return arrayJobApplication;
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

        /* Agrega una Postulación */
        public bool Post(M.JobApplication jobApplication)
        {
            O.JobApplication BDJobApplication = new O.JobApplication
            {
                Name                   = jobApplication.Name,
                DocumentNumber         = jobApplication.DocumentNumber,
                DescriptionApplication = jobApplication.DescriptionApplication,
                PostedDate             = System.DateTime.Now.ToString("g"),
                PostedHourZone         = System.TimeZoneInfo.Local.ToString(),
                IdUser                 = jobApplication.IdUser
            };
            BD.JobApplications.Add(BDJobApplication);
            BD.SaveChanges();
            return true;
        }
        /* Agrega una Postulación */
    }
}