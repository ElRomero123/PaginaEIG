﻿using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroProductController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool S = false;
            try
            {
                O.Product producto = BD.Products.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                producto.Avatar     = parametrosPutAvatar.DownloadURL;
                producto.NameAvatar = parametrosPutAvatar.FileName;
                BD.SaveChanges();
                S = true;
            }

            catch
            {
                S = false;
            }
            return S;
        }
    }
}