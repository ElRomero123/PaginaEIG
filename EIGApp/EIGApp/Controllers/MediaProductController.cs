using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class MediaProductController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.MediaProduct[] Get(long idProduct)
        {
            var query = from MP in BD.MediaProducts
                        where (MP.IdProduct.Equals(idProduct))
                        select new {MP.Id, MP.FileName, MP.DownloadLink, MP.LoadDate};

            var lista = query.ToArray();

            M.MediaProduct[] arrayMediaProduct = new M.MediaProduct[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.MediaProduct temp = new M.MediaProduct
                {
                    Id = lista[i].Id,
                    FileName = lista[i].FileName,
                    DownloadLink = lista[i].DownloadLink,
                    LoadDate = lista[i].LoadDate
                };

                arrayMediaProduct[i] = temp;
            }

            return arrayMediaProduct;
        }

        public long Post(M.MediaProduct mediaProduct)
        {
            O.MediaProduct BDMediaProduct = new O.MediaProduct
            {
                FileName     = mediaProduct.FileName,
                DownloadLink = mediaProduct.DownloadLink,
                LoadDate     = System.DateTime.Now.ToString("g"),
                IdProduct    = mediaProduct.IdProduct
            };

            BD.MediaProducts.Add(BDMediaProduct);
            BD.SaveChanges();

            return BDMediaProduct.Id;
        }

        public string Post(long idMediaProduct)
        {
            string S = "";
            try
            {
                O.MediaProduct BDMediaProduct = BD.MediaProducts.FirstOrDefault(x => x.Id == idMediaProduct);
                BD.MediaProducts.Remove(BDMediaProduct);
                BD.SaveChanges();
                S = BDMediaProduct.FileName;
            }

            catch { }
            return S;
        }


    }
}