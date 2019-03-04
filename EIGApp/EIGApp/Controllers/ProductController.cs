using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ProductController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.Product[] Get(long idPackage)
        {
            var query = from PR in BD.Products
                        where (PR.IdPackage.Equals(idPackage))
                        select new {PR.Id, PR.Name, PR.Type, PR.TypeDescription, PR.AttendantName, PR.AttendantWebPage, PR.AttendantEmail, PR.AttendantPhone, PR.Date, PR.Active, PR.CreationDate, PR.CreationHourZone};

            var lista = query.ToArray();

            M.Product[] arrayProducts = new M.Product[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Product temp = new M.Product
                {
                    Id               = lista[i].Id,
                    Name             = lista[i].Name,
                    Type             = lista[i].Type,
                    TypeDescription  = lista[i].TypeDescription,
                    AttendantName    = lista[i].AttendantName,
                    AttendantWebPage = lista[i].AttendantWebPage,
                    AttendantEmail   = lista[i].AttendantEmail,
                    AttendantPhone   = lista[i].AttendantPhone,
                    Date             = lista[i].Date,
                    Active           = lista[i].Active,              
                    CreationDate     = lista[i].CreationDate,
                    CreationHourZone = lista[i].CreationHourZone

                };

                arrayProducts[i] = temp;
            }

            return arrayProducts;
        }

        public long Post(M.Product producto)
        {
            O.Product BDProduct = new O.Product
            {
                Name             = producto.Name,
                Type             = producto.Type,
                TypeDescription  = producto.TypeDescription,
                AttendantName    = producto.AttendantName,
                AttendantWebPage = producto.AttendantWebPage,
                AttendantEmail   = producto.AttendantEmail,
                AttendantPhone   = producto.AttendantPhone,
                Latitude         = producto.Latitude,
                Longitude        = producto.Longitude,
                Date             = producto.Date,
                Active           = producto.Active,
                CreationDate     = System.DateTime.Now,
                CreationHourZone = System.TimeZoneInfo.Local.ToString(),
                Avatar           = producto.Avatar,
                NameAvatar       = producto.NameAvatar,
                IdPackage        = producto.IdPackage
            };

            BD.Products.Add(BDProduct);
            BD.SaveChanges();

            return BDProduct.Id;
        }

        public string Post(long idProduct)
        {
            string S = "";
            try
            {
                O.Product BDProduct = BD.Products.FirstOrDefault(x => x.Id == idProduct);
                BD.Products.Remove(BDProduct);
                BD.SaveChanges();
                S = BDProduct.NameAvatar;
            }

            catch { }
            return S;
        }

        /*
        public M.Product[] Get(string cadena)
        {
            var query = from PR in BD.Products
                        where(PR.Name.Contains(cadena) || PR.TypeDescription.Contains(cadena) || PR.AttendantName.Contains(cadena) || PR.Date.Contains(cadena))
                        select new {PR.Name, PR.Type, PR.TypeDescription, PR.AttendantName, PR.AttendantWebPage, PR.AttendantEmail, PR.AttendantPhone, PR.Longitude, PR.Latitude, PR.Date, PR.Avatar, PR.Ciprin, PR.Active, PR.CreationDate};

            var lista = query.ToArray();

            M.Product[] arrayProducts = new M.Product[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Product temp = new M.Product
                {
                    Name             = lista[i].Name,
                    Type             = lista[i].Type,
                    TypeDescription  = lista[i].TypeDescription,
                    AttendantName    = lista[i].AttendantName,
                    AttendantWebPage = lista[i].AttendantWebPage,
                    AttendantEmail   = lista[i].AttendantEmail,
                    AttendantPhone   = lista[i].AttendantPhone,
                    Longitude        = lista[i].Longitude,
                    Latitude         = lista[i].Latitude,
                    Date             = lista[i].Date,
                    Avatar           = lista[i].Avatar,
                    Ciprin           = lista[i].Ciprin,
                    Active           = lista[i].Active,
                    CreationDate     = lista[i].CreationDate
                };

                arrayProducts[i] = temp;
            }

            return arrayProducts;
        }

        public int Post(long id)
        {
            int c = 0;

            try
            {
                O.Product BDProduct = BD.Products.FirstOrDefault(x => x.Id == id);

                if (BDProduct.Active == 1)
                {
                    BDProduct.Active = 0;
                    c = 0;
                }

                else
                {
                    BDProduct.Active = 1;
                    c = 1;
                }

                BD.SaveChanges();
            }

            catch
            {
            }

            return c;
        }

        
        */
    }
}
 