using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class JobApplicationController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();
        /* Obtiene Postulaciones de un Usuario */
        public M.JobApplication[] Get(long idUser)
        {
            var query = from JA in BD.JobApplications
                        where (JA.IdUser.Equals(idUser))
                        select new {JA.Id, JA.Name, JA.DocumentNumber, JA.DescriptionApplication, JA.Age, JA.PostedDate, JA.PostedHourZone};
            M.JobApplication[] arrayJobApplication = new M.JobApplication[query.Count()];
            M.JobApplication temp;
            int i = 0;
            foreach(var item in query)
            {
                temp = new M.JobApplication
                {
                    Id                     = item.Id,
                    Name                   = item.Name,
                    DocumentNumber         = item.DocumentNumber,
                    DescriptionApplication = item.DescriptionApplication,
                    Age                    = item.Age,
                    PostedDate             = item.PostedDate,
                    PostedHourZone         = item.PostedHourZone
                };

                arrayJobApplication[i] = temp;
                i++;
            }
            return arrayJobApplication;
        }
        /* Obtiene Postulaciones de un Usuario */

        /* Agrega una Postulación */
        public bool Post(M.JobApplication jobApplication)
        {
            O.JobApplication BDJobApplication = new O.JobApplication
            {
                Name = jobApplication.Name,
                DocumentNumber = jobApplication.DocumentNumber,
                DescriptionApplication = jobApplication.DescriptionApplication,
                PostedDate = System.DateTime.Now.ToString("g"),
                PostedHourZone = System.TimeZoneInfo.Local.ToString(),
                IdUser = jobApplication.IdUser
            };
            BD.JobApplications.Add(BDJobApplication);
            BD.SaveChanges();
            return true;
        }
        /* Agrega una Postulación */

        /* Elimina una Postulación */
        public bool Post(long idJA)
        {
            bool R = false;
            try
            {
                O.JobApplication JA = BD.JobApplications.FirstOrDefault(x => x.Id == idJA);
                BD.JobApplications.Remove(JA);
                BD.SaveChanges();
                R = true;
            }
            catch { R = false; }
            return R;
        }
        /* Elimina una Postulación */

       
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

        
    }
}