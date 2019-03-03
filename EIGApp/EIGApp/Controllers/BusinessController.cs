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

        public M.Business[] Get(long idPackage)
        {
            var query = from B in BD.Businesses
                        where (B.IdPackage.Equals(idPackage))
                        select new {B.Id, B.Name, B.Specialism, B.WebPage, B.Phone, B.CreationDate, B.CreationHourZone, B.Ciprin, B.Active, B.Avatar};

            var lista = query.ToArray();
            int size1 = lista.Length;
            M.Business[] arrayBusiness = new M.Business[size1];

            int i;
            for (i = 0; i < size1; i++)
            {
                M.Business temp = new M.Business
                {
                    Id               = lista[i].Id,
                    Name             = lista[i].Name,
                    Specialism       = lista[i].Specialism,
                    WebPage          = lista[i].WebPage,
                    Phone            = lista[i].Phone,
                    CreationDate     = lista[i].CreationDate,
                    CreationHourZone = lista[i].CreationHourZone,
                    Ciprin           = lista[i].Ciprin,
                    Active           = lista[i].Active,
                    Avatar           = lista[i].Avatar
                };

                arrayBusiness[i] = temp;
            }

            return arrayBusiness;
        }

        public long Post(M.Business negocio)
        {
            O.Business BDBusiness = new O.Business
            {
                Name                  = negocio.Name,
                Specialism            = negocio.Specialism,
                SpecialismDescription = negocio.SpecialismDescription,
                WebPage               = negocio.WebPage,
                Phone                 = negocio.Phone,
                Latitude              = negocio.Latitude,
                Longitude             = negocio.Longitude,
                Ciprin                = negocio.Ciprin,
                Active                = negocio.Active,
                CreationDate          = System.DateTime.Now,
                CreationHourZone      = System.TimeZoneInfo.Local.ToString(),
                Avatar                = negocio.Avatar,
                NameAvatar            = negocio.NameAvatar,
                IdPackage             = negocio.IdPackage
            };

            BD.Businesses.Add(BDBusiness);
            BD.SaveChanges();

            return BDBusiness.Id;
        }

        public string Post(long idBusiness)
        {
            string S = "";
            try
            {
                O.Business BDBusiness = BD.Businesses.FirstOrDefault(x => x.Id == idBusiness);
                BD.Businesses.Remove(BDBusiness);
                BD.SaveChanges();
                S = BDBusiness.NameAvatar;
            }

            catch { }
            return S;
        }

        /*
        public int Post(long id)
        {
            int c = 0;

            try
            {
                O.Business BDBusiness = BD.Businesses.FirstOrDefault(x => x.Id == id);

                if (BDBusiness.Active == 1)
                {
                    BDBusiness.Active = 0;
                    c = 0;
                }

                else
                {
                    BDBusiness.Active = 1;
                    c = 1;
                }

                BD.SaveChanges();
            }

            catch
            {
            }

            return c;
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
        */
    }
}
 