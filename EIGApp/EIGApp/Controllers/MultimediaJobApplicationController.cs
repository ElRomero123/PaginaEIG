using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MultimediaJobApplicationController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public long Post(M.MultimediaJobApplication multimediaJobApplication)
        {
            long id;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.MultimediaJobApplication, O.MultimediaJobApplication>();
                #pragma warning restore CS0618
                O.MultimediaJobApplication BDMultimediaJobApplication = AutoMapper.Mapper.Map<O.MultimediaJobApplication>(multimediaJobApplication);
                BDMultimediaJobApplication.LoadDate = System.DateTime.Now.ToString("g");
                BD.MultimediaJobApplications.Add(BDMultimediaJobApplication);
                BD.SaveChanges();
                id = BDMultimediaJobApplication.Id;
            }

            catch
            {
                id = 0;
            }

            return id;
        }

        public bool Post(long idMJA)
        {
            bool result = false;

            try
            {
                O.MultimediaJobApplication MJA = BD.MultimediaJobApplications.FirstOrDefault(x => x.Id == idMJA);
                BD.MultimediaJobApplications.Remove(MJA);
                BD.SaveChanges();
                result = true;
            }
            catch
            {
                result = false;
            }

            return result;
        }

        public M.MultimediaJobApplication[] Get(long idJA)
        {
            var query = from MJA in BD.MultimediaJobApplications
                        where (MJA.IdJobApplication.Equals(idJA))
                        select new {MJA.Id, MJA.FileName, MJA.DownloadLink, MJA.LoadDate};

            var lista = query.ToArray();

            M.MultimediaJobApplication[] arrayMultimediaJobApplication = new M.MultimediaJobApplication[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.MultimediaJobApplication temp = new M.MultimediaJobApplication
                {
                    Id = lista[i].Id,
                    FileName = lista[i].FileName,
                    DownloadLink = lista[i].DownloadLink,
                    LoadDate = lista[i].LoadDate
                };

                arrayMultimediaJobApplication[i] = temp;
            }

            return arrayMultimediaJobApplication;
        }
    }
}