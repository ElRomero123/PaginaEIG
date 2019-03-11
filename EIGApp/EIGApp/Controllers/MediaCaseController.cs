using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaCaseController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        /* Agrega un archivo de un Caso */
        public long Post(M.MediaCase mediaCase)
        {
            O.MediaCase BDMediaCase = new O.MediaCase
            {
                FileName     = "",
                DownloadLink = "",
                LoadDate     = System.DateTime.Now.ToString(),
                LoadHourZone = System.TimeZoneInfo.Local.ToString(),
                IdCase       = mediaCase.IdCase
            };

            BD.MediaCases.Add(BDMediaCase);
            BD.SaveChanges();
            return BDMediaCase.Id;
        }

        /* Elimina un archivo del Caso */
        public string Post(long idMC)
        {
            O.MediaCase MC = BD.MediaCases.FirstOrDefault(x => x.Id == idMC);
            BD.MediaCases.Remove(MC);
            BD.SaveChanges();
            return MC.FileName;
        }
        /* Elimina un archivo del Caso */

        /* Obtiene los archivos multimedia de un Caso */
        public M.MediaCase[] Get(long idCase)
        {
            var query = from MC in BD.MediaCases
                        where (MC.IdCase.Equals(idCase))
                        select new {MC.Id, MC.FileName, MC.DownloadLink, MC.LoadDate, MC.LoadHourZone};
            M.MediaCase[] arrayMultimediaCase = new M.MediaCase[query.Count()];
            M.MediaCase temp;
            int i = 0;
            foreach(var item in query)
            {
                temp = new M.MediaCase
                {
                    Id           = item.Id,
                    FileName     = item.FileName,
                    DownloadLink = item.DownloadLink,
                    LoadDate     = item.LoadDate,
                    LoadHourZone = item.LoadHourZone
                };
                arrayMultimediaCase[i] = temp;
                i++;
            }
            return arrayMultimediaCase;
        }
        /* Obtiene los archivos multimedia de un Caso */
    }
}