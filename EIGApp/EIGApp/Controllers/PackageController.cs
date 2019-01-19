using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;

namespace EIGApp.Controllers
{
    public class PackageController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.Package paquete)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Package, O.Package>();
                #pragma warning restore CS0618
                O.Package BDPackage = AutoMapper.Mapper.Map<O.Package>(paquete);
                BD.Packages.Add(BDPackage);
                BD.SaveChanges();
                state = true;
            }

            catch
            {
                state = false;
            }

            return state;
        }
    }
}