using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class PackageController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.Package[] Get(long idUser)
        {
            var query = from P in BD.Packages
                        where (P.IdUser.Equals(idUser))
                        select new { P.Id, P.Linea, P.Producto, P.Cantidad, P.FechaCompra, P.TiempoCubrimiento, P.Precio, P.Kind };

            var lista = query.ToArray();

            M.Package[] arrayPackage = new M.Package[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Package temp = new M.Package
                {
                    Id                = lista[i].Id,
                    Linea             = lista[i].Linea, 
                    Producto          = lista[i].Producto,
                    Cantidad          = lista[i].Cantidad,
                    FechaCompra       = lista[i].FechaCompra,
                    TiempoCubrimiento = lista[i].TiempoCubrimiento,
                    Precio            = lista[i].Precio,
                    Kind              = lista[i].Kind
                };

                arrayPackage[i] = temp;
            }

            return arrayPackage;
        }

        public bool Post(M.Package paquete)
        {
            bool state;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Package, O.Package>();
                #pragma warning restore CS0618
                O.Package BDPackage = AutoMapper.Mapper.Map<O.Package>(paquete);
                BDPackage.FechaCompra = System.DateTime.Now.ToString("g");
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
 