using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaPersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        /* Obtiene los archivos de un Investigador Privado */
        public M.MediaPerson[] Get(long idPerson)
        {
            var SMP = BD.MediaPersons;
            var query = from MP in SMP
                        where (MP.IdPerson.Equals(idPerson))
                        select new {MP.Id, MP.FileName, MP.DownloadLink, MP.LoadDate, MP.LoadHourZone};
           
            M.MediaPerson[] arrayMediaPerson = new M.MediaPerson[SMP.Count()];

            int i = 0;
            foreach(var item in query)
            {
                M.MediaPerson temp = new M.MediaPerson
                {
                    Id           = item.Id,
                    FileName     = item.FileName,
                    DownloadLink = item.DownloadLink,
                    LoadDate     = item.LoadDate,
                    LoadHourZone = item.LoadHourZone
                };
                arrayMediaPerson[i] = temp;
                i++;
            }
            return arrayMediaPerson;
        }
        /* Obtiene los archivos de un Investigador Privado */

        public long Post(M.MediaPerson mediaPerson)
        {
            O.MediaPerson BDMediaPerson = new O.MediaPerson
            {
                FileName     = "",
                DownloadLink = "",
                LoadDate     = System.DateTime.Now.ToString("g"),
                LoadHourZone = System.TimeZoneInfo.Local.ToString(),
                IdPerson     = mediaPerson.IdPerson
            };

            BD.MediaPersons.Add(BDMediaPerson);
            BD.SaveChanges();

            return BDMediaPerson.Id;
        }

        public string Post(int idMediaPerson)
        {
            string R = "";

            try
            {
                O.MediaPerson BDMediaPerson = BD.MediaPersons.FirstOrDefault(x => x.Id == idMediaPerson);
                BD.MediaPersons.Remove(BDMediaPerson);
                BD.SaveChanges();
                R = BDMediaPerson.FileName;
            }

            catch{}

            return R;
        }
    }
}