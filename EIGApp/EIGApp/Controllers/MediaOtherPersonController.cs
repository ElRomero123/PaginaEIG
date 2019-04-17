using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaOtherPersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.MediaOtherPerson[] Get(long idOtherPerson)
        {
            var SMOP = BD.MediaOtherPersons;
            var query = from MOP in SMOP
                        where (MOP.IdOtherPerson.Equals(idOtherPerson))
                        select new {MOP.Id, MOP.FileName, MOP.DownloadLink, MOP.LoadDate};

            M.MediaOtherPerson[] arrayMediaOtherPerson = new M.MediaOtherPerson[query.Count()];

            int i = 0;
            foreach(var item in query)
            {
                M.MediaOtherPerson temp = new M.MediaOtherPerson
                {
                    Id           = item.Id,
                    FileName     = item.FileName,
                    DownloadLink = item.DownloadLink,
                    LoadDate     = item.LoadDate
                };
                arrayMediaOtherPerson[i] = temp;
                i++;
            }
            return arrayMediaOtherPerson;
        }

        public long Post(M.MediaOtherPerson mediaOtherPerson)
        {
            O.MediaOtherPerson BDMediaOtherPerson = new O.MediaOtherPerson
            {
                FileName      = "",
                DownloadLink  = "",
                LoadDate      = System.DateTime.Now.ToString("g"),
                LoadHourZone  = System.TimeZoneInfo.Local.ToString(),
                IdOtherPerson = mediaOtherPerson.IdOtherPerson
            };

            BD.MediaOtherPersons.Add(BDMediaOtherPerson);
            BD.SaveChanges();

            return BDMediaOtherPerson.Id;
        }

        public string Post(int idMediaOtherPerson)
        {
            string R = "";

            try
            {
                O.MediaOtherPerson BDMediaOtherPerson = BD.MediaOtherPersons.FirstOrDefault(x => x.Id == idMediaOtherPerson);
                BD.MediaOtherPersons.Remove(BDMediaOtherPerson);
                BD.SaveChanges();
                R = BDMediaOtherPerson.FileName;
            }

            catch{}

            return R;
        }
    }
}