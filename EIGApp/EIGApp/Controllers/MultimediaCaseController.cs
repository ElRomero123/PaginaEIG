using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MultimediaCaseController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public long Post(M.MultimediaCase multimediaCase)
        {
            long id;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.MultimediaCase, O.MultimediaCase>();
                #pragma warning restore CS0618
                O.MultimediaCase BDMultimediaCase = AutoMapper.Mapper.Map<O.MultimediaCase>(multimediaCase);
                BD.MultimediaCases.Add(BDMultimediaCase);
                BD.SaveChanges();
                id = BDMultimediaCase.Id;
            }

            catch
            {
                id = 0;
            }

            return id;
        }

        public M.MultimediaCase[] Get(long idCase)
        {
            var query = from MC in BD.MultimediaCases
                        where (MC.IdCase.Equals(idCase))
                        select new {MC.Id, MC.DownloadLink};

            var lista = query.ToArray();

            M.MultimediaCase[] arrayMultimediaCase = new M.MultimediaCase[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.MultimediaCase temp = new M.MultimediaCase
                {
                    Id = lista[i].Id,
                    DownloadLink = lista[i].DownloadLink
                };

                arrayMultimediaCase[i] = temp;
            }

            return arrayMultimediaCase;
        }
    }
}