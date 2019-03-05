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
            var query = from MOP in BD.MediaOtherPersons
                        where (MOP.IdOtherPerson.Equals(idOtherPerson))
                        select new {MOP.Id, MOP.FileName, MOP.DownloadLink, MOP.LoadDate};

            var lista = query.ToArray();

            M.MediaOtherPerson[] arrayMediaOtherPerson = new M.MediaOtherPerson[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.MediaOtherPerson temp = new M.MediaOtherPerson
                {
                    Id = lista[i].Id,
                    FileName = lista[i].FileName,
                    DownloadLink = lista[i].DownloadLink,
                    LoadDate = lista[i].LoadDate
                };

                arrayMediaOtherPerson[i] = temp;
            }

            return arrayMediaOtherPerson;
        }

        public long Post(M.MediaOtherPerson mediaOtherPerson)
        {
            O.MediaOtherPerson BDMediaOtherPerson = new O.MediaOtherPerson
            {
                FileName      = mediaOtherPerson.FileName,
                DownloadLink  = mediaOtherPerson.DownloadLink,
                LoadDate      = System.DateTime.Now.ToString("g"),
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