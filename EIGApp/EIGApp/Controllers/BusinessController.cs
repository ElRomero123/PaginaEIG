using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class BusinessController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.Business[] Get(string cadena)
        {
            var query = from B in BD.Businesses
                        where (B.Name.Contains(cadena) || B.SpecialismDescription.Contains(cadena))
                        orderby (B.Ciprin)
                        select new {B.Name, B.Specialism, B.SpecialismDescription, B.WebPage, B.Phone, B.Latitude, B.Longitude, B.Ciprin, B.Active, B.CreationDate, B.Avatar};
                          
            var lista = query.ToArray();

            M.Business[] arrayBusinesses = new M.Business[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Business temp = new M.Business
                {
                    Name                  = lista[i].Name,
                    Specialism            = lista[i].Specialism,
                    SpecialismDescription = lista[i].SpecialismDescription,
                    WebPage               = lista[i].WebPage,
                    Phone                 = lista[i].Phone,
                    Latitude              = lista[i].Latitude,
                    Longitude             = lista[i].Longitude,
                    Ciprin                = lista[i].Ciprin,
                    Active                = lista[i].Active,
                    CreationDate          = lista[i].CreationDate,
                    Avatar                = lista[i].Avatar,
                };

                arrayBusinesses[i] = temp;
            }

            return arrayBusinesses;
        }

        public long Post(M.Business negocio)
        {
            long id = 0;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Business, O.Business>();
                #pragma warning restore CS0618
                O.Business BDBusiness = AutoMapper.Mapper.Map<O.Business>(negocio);
                BDBusiness.CreationDate = System.DateTime.Now.ToString("g");
                BD.Businesses.Add(BDBusiness);
                BD.SaveChanges();

                id = BDBusiness.Id;
            }

            catch
            {
                id = 0;
            }

            return id;
        }
    }
}
 