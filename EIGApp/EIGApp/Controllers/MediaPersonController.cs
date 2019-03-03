using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaPersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.MediaPerson[] Get(long idPerson)
        {
            var query = from MP in BD.MediaPersons
                        where (MP.IdPerson.Equals(idPerson))
                        select new {MP.Id, MP.FileName, MP.DownloadLink, MP.LoadDate};

            var lista = query.ToArray();

            M.MediaPerson[] arrayMediaPerson = new M.MediaPerson[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.MediaPerson temp = new M.MediaPerson
                {
                    Id = lista[i].Id,
                    FileName = lista[i].FileName,
                    DownloadLink = lista[i].DownloadLink,
                    LoadDate = lista[i].LoadDate
                };

                arrayMediaPerson[i] = temp;
            }

            return arrayMediaPerson;
        }

        public long Post(M.MediaPerson mediaPerson)
        {
            O.MediaPerson BDMediaPerson = new O.MediaPerson
            {
                FileName = mediaPerson.FileName,
                DownloadLink = mediaPerson.DownloadLink,
                LoadDate = System.DateTime.Now.ToString("g"),
                IdPerson = mediaPerson.IdPerson
            };

            BD.MediaPersons.Add(BDMediaPerson);
            BD.SaveChanges();

            return BDMediaPerson.Id;
        }

        public string Post(int idMediaPerson)
        {
            string result = "";

            try
            {
                O.MediaPerson BDMediaPerson = BD.MediaPersons.FirstOrDefault(x => x.Id == idMediaPerson);
                BD.MediaPersons.Remove(BDMediaPerson);
                BD.SaveChanges();
                result = BDMediaPerson.FileName;
            }

            catch
            {
            }

            return result;
        }
    }
}