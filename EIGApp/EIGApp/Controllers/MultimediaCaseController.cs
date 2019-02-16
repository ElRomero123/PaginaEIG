using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MultimediaCaseController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public long Post(M.MultimediaCase multimediaCase)
        {
            long id;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.MultimediaCase, O.MultimediaCase>();
                #pragma warning restore CS0618
                O.MultimediaCase BDMultimediaCase = AutoMapper.Mapper.Map<O.MultimediaCase>(multimediaCase);
                BDMultimediaCase.LoadDate = System.DateTime.Now.ToString("g");
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

        public bool Post(long idMC)
        {
            bool result = false;

            try
            {
                O.MultimediaCase MC = BD.MultimediaCases.FirstOrDefault(x => x.Id == idMC);
                BD.MultimediaCases.Remove(MC);
                BD.SaveChanges();
                result = true;
            }
            catch
            {
                result = false;
            }

            return result;
        }

        public M.MultimediaCase[] Get(long idCase)
        {
            var query = from MC in BD.MultimediaCases
                        where (MC.IdCase.Equals(idCase))
                        select new {MC.Id, MC.FileName, MC.DownloadLink, MC.LoadDate};

            var lista = query.ToArray();

            M.MultimediaCase[] arrayMultimediaCase = new M.MultimediaCase[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.MultimediaCase temp = new M.MultimediaCase
                {
                    Id           = lista[i].Id,
                    FileName     = lista[i].FileName,
                    DownloadLink = lista[i].DownloadLink,
                    LoadDate     = lista[i].LoadDate
                };

                arrayMultimediaCase[i] = temp;
            }

            return arrayMultimediaCase;
        }
    }
}