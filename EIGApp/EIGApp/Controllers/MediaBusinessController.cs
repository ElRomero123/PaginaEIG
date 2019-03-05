using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaBusinessController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.MediaBusiness[] Get(long idBusiness)
        {
            var query = from MB in BD.MediaBusinesses
                        where (MB.IdBusiness.Equals(idBusiness))
                        select new {MB.Id, MB.FileName, MB.DownloadLink, MB.LoadDate};

            var lista = query.ToArray();

            M.MediaBusiness[] arrayMediaBusiness = new M.MediaBusiness[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.MediaBusiness temp = new M.MediaBusiness
                {
                    Id = lista[i].Id,
                    FileName = lista[i].FileName,
                    DownloadLink = lista[i].DownloadLink,
                    LoadDate = lista[i].LoadDate
                };

                arrayMediaBusiness[i] = temp;
            }

            return arrayMediaBusiness;
        }

        public long Post(M.MediaBusiness mediaBusiness)
        {
            O.MediaBusiness BDMediaBusiness = new O.MediaBusiness
            {
                FileName     = mediaBusiness.FileName,
                DownloadLink = mediaBusiness.DownloadLink,
                LoadDate     = System.DateTime.Now.ToString("g"),
                IdBusiness   = mediaBusiness.IdBusiness
            };

            BD.MediaBusinesses.Add(BDMediaBusiness);
            BD.SaveChanges();

            return BDMediaBusiness.Id;
        }

        public string Post(int idMediaBusiness)
        {
            string R = "";

            try
            {
                O.MediaBusiness BDMediaBusiness = BD.MediaBusinesses.FirstOrDefault(x => x.Id == idMediaBusiness);
                BD.MediaBusinesses.Remove(BDMediaBusiness);
                BD.SaveChanges();
                R = BDMediaBusiness.FileName;
            }

            catch { }

            return R;
        }
    }
}