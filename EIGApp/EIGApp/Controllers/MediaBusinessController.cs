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
    }
}