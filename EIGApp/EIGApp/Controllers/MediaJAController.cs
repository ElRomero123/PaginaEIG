using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaJAController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        /* Obtiene los archivos multimedia de un Caso */
        public M.MediaJobApplication[] Get(long idJA)
        {
            var query = from MJA in BD.MediaJobApplications
                        where (MJA.IdJobApplication.Equals(idJA))
                        select new {MJA.Id, MJA.FileName, MJA.DownloadLink, MJA.LoadDate, MJA.LoadHourZone};
            M.MediaJobApplication[] arrayMediaJA = new M.MediaJobApplication[query.Count()];
            M.MediaJobApplication temp;
            int i = 0;
            foreach (var item in query)
            {
                temp = new M.MediaJobApplication
                {
                    Id           = item.Id,
                    FileName     = item.FileName,
                    DownloadLink = item.DownloadLink,
                    LoadDate     = item.LoadDate,
                    LoadHourZone = item.LoadHourZone
                };
                arrayMediaJA[i] = temp;
                i++;
            }
            return arrayMediaJA;
        }
        /* Obtiene los archivos multimedia de un Caso */

        /* Agrega un archivo para una Postulación */
        public long Post(M.MediaJobApplication mediaJA)
        {
            O.MediaJobApplication BDMediaJobApplication = new O.MediaJobApplication
            {
                FileName         = "",
                DownloadLink     = "",
                LoadDate         = System.DateTime.Now.ToString(),
                LoadHourZone     = System.TimeZoneInfo.Local.ToString(),
                IdJobApplication = mediaJA.IdJobApplication
            };
            BD.MediaJobApplications.Add(BDMediaJobApplication);
            BD.SaveChanges();
            return BDMediaJobApplication.Id;
        }
        /* Agrega un archivo para una Postulación */

        /* Elimina un Archivo de Solicitud de Empleo */
        public string Post(long idMJA)
        {
            O.MediaJobApplication MJA = BD.MediaJobApplications.FirstOrDefault(x => x.Id == idMJA);
            BD.MediaJobApplications.Remove(MJA);
            BD.SaveChanges();
            return MJA.FileName;
        }
        /* Elimina un Archivo de Solicitud de Empleo */
    }
}