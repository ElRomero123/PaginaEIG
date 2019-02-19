﻿using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace EIGApp.Controllers
{
    public class ManagerController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public M.Manager Get(string password)
        {
            var query = from M in BD.Managers
                        where (M.Clave.Equals(SHA256Encrypt(password)))
                        select new {M.Id, M.Name, M.Email, M.Phone};

            M.Manager temp = new M.Manager();

            try
            {
                var lista = query.ToArray()[0];
   
                temp.Id = lista.Id;
                temp.Name = lista.Name;
                temp.Email = lista.Email;
                temp.Phone = lista.Phone;
            }

            catch
            {

            }

            return temp;
        }

        private string SHA256Encrypt(string input)
        {
            SHA256CryptoServiceProvider provider = new SHA256CryptoServiceProvider();

            byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            byte[] hashedBytes = provider.ComputeHash(inputBytes);

            StringBuilder output = new StringBuilder();

            for (int i = 0; i < hashedBytes.Length; i++)
                output.Append(hashedBytes[i].ToString("x2").ToLower());

            return output.ToString();
        }
    }
}