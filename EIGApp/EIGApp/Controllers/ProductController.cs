using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ProductController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.Product[] Get(string cadena)
        {
            var query = from PR in BD.Products
                        where(PR.Name.Contains(cadena) || PR.TypeDescription.Contains(cadena) || PR.AttendantName.Contains(cadena) || PR.Date.Contains(cadena))
                        select new {PR.Name, PR.Type, PR.TypeDescription, PR.AttendantName, PR.AttendantWebPage, PR.AttendantEmail, PR.AttendantPhone, PR.City, PR.Address, PR.Date, PR.Avatar, PR.Ciprin, PR.Active};

            var lista = query.ToArray();

            M.Product[] arrayProducts = new M.Product[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Product temp = new M.Product
                {
                    Name = lista[i].Name,
                    Type = lista[i].Type,
                    TypeDescription = lista[i].TypeDescription,
                    AttendantName = lista[i].AttendantName,
                    AttendantWebPage = lista[i].AttendantWebPage,
                    AttendantEmail = lista[i].AttendantEmail,
                    AttendantPhone = lista[i].AttendantPhone,
                    City = lista[i].City,
                    Address = lista[i].Address,
                    Date = lista[i].Date,
                    Avatar = lista[i].Avatar,
                    Ciprin = lista[i].Ciprin,
                    Active = lista[i].Active
                };

                arrayProducts[i] = temp;
            }

            return arrayProducts;
        }

        public long Post(M.Product producto)
        {
            long id = 0;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Product, O.Product>();
                #pragma warning restore CS0618
                O.Product BDProduct = AutoMapper.Mapper.Map<O.Product>(producto);
                BD.Products.Add(BDProduct);
                BD.SaveChanges();

                id = BDProduct.Id;
            }

            catch
            {
                id = 0;
            }

            return id;
        }
    }
}
 