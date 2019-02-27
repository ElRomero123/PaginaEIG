using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaPersonController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public long Post(M.MediaPerson mediaPerson)
        {
            long id;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.MediaPerson, O.MediaPerson>();
                #pragma warning restore CS0618
                O.MediaPerson BDMediaPerson = AutoMapper.Mapper.Map<O.MediaPerson>(mediaPerson);
                BDMediaPerson.LoadDate = System.DateTime.Now.ToString("g");
                BD.MediaPersons.Add(BDMediaPerson);
                BD.SaveChanges();
                id = BDMediaPerson.Id;
            }

            catch
            {
                id = 0;
            }

            return id;
        }

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

        public bool Post(int idMediaPerson)
        {
            bool result = false;

            try
            {
                O.MediaPerson BDMediaPerson = BD.MediaPersons.FirstOrDefault(x => x.Id == idMediaPerson);
                BD.MediaPersons.Remove(BDMediaPerson);
                BD.SaveChanges();
                result = true;
            }

            catch
            {
            }

            return result;
        }
    }
}