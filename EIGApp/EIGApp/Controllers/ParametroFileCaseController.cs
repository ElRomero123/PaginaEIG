﻿using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class ParametroFileCaseController : ApiController
    {
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public bool Post(M.ParametroPutFile parametroPutFile)
        {
            bool state = false;

            try
            {
                O.MultimediaCase multimediaCase = BD.MultimediaCases.FirstOrDefault(x => x.Id == parametroPutFile.Id);
                multimediaCase.FileName     = parametroPutFile.FileName;
                multimediaCase.DownloadLink = parametroPutFile.DownloadURL;
                multimediaCase.LoadDate     = System.DateTime.Now.ToString("g");
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