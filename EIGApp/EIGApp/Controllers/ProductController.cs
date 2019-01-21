﻿using System.Web.Http;
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
            var query = from P in BD.Products
                        where(P.Name.Contains(cadena) || P.Type.Contains(cadena) || P.TypeDescription.Contains(cadena) || P.AttendantName.Contains(cadena) || P.City.Contains(cadena) || P.Date.Contains(cadena))
                        select new { P.Name, P.Type, P.TypeDescription, P.AttendantName, P.AttendantPhone, P.AttendantEmail, P.City, P.Address, P.Date, P.Avatar };

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
                    AttendantPhone = lista[i].AttendantPhone,
                    AttendantEmail = lista[i].AttendantEmail,
                    City = lista[i].City,
                    Address = lista[i].Address,
                    Date = lista[i].Date,
                    Avatar = lista[i].Avatar
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