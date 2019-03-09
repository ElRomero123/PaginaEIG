﻿using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class PutAvatarOPController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();
        /* Actualiza el avatar de un Profesional Afín */
        public bool Post(M.ParametrosPutAvatar parametrosPutAvatar)
        {
            bool R = false;
            try
            {
                O.OtherPerson otraPersona = BD.OtherPersons.FirstOrDefault(x => x.Id == parametrosPutAvatar.Id);
                otraPersona.Avatar = parametrosPutAvatar.DownloadURL;
                otraPersona.NameAvatar = parametrosPutAvatar.FileName;
                BD.SaveChanges();
                R = true;
            }
            catch {R = false;}
            return R;
        }
        /* Actualiza el avatar de un Profesional Afín */
    }
}