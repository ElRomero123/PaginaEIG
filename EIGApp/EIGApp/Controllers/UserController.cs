using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace EIGApp.Controllers
{
    public class UserController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();
        /* Verifica que al crear un Usuario, NO exista el Username */
        public bool Get(string username)
        {
            var query = from U in BD.Users
                        where (U.Username.Equals(username))
                        select new { U.Id };
            return query.ToArray().Length == 0;
        }
        /* Verifica que al crear un Usuario, NO exista el Username */

        /* Crea un Usuario */
        public bool Post(M.User usuario)
        {
            bool R;
            try
            {
                O.User newUser = new O.User
                {
                    Username      = usuario.Username,
                    Password      = SHA256Encrypt(usuario.Password),
                    Name          = usuario.Name,
                    Email         = usuario.Email,
                    Address       = usuario.Address,
                    CountProfiles = 0,
                    JoinDate      = System.DateTime.Now.ToString("g"),
                    JoinHourZone  = System.TimeZoneInfo.Local.ToString()
                };

                BD.Users.Add(newUser);
                BD.SaveChanges();
                R = true;
            }
            catch{R = false;}
            return R;
        }
        
        /* Genera el encriptado SHA256 de una cadena */
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
        /* Genera el encriptado SHA256 de una cadena */
        /* Crea un Usuario */

        /* Obtiene el Consolidado de Usuarios Creados */
        public M.User[] Get()
        {
            /*
               S = Database Source
               Q = Query to S
               U = Each User/Result in Q
               UT = Temp User
               AU = Array version of U
               I = Item
            */
            var S = BD.Users;
            var Q = from U in S
                        where (true)
                        select new {U.Id, U.Username, U.Name, U.Email, U.Address, U.CountProfiles, U.JoinDate, U.JoinHourZone};
            int SC = S.Count();
            M.User[] AU = new M.User[SC];
            M.User UT;
            int c = 0;
            foreach(var I in Q)
            {
                UT = new M.User
                {
                    Id            = I.Id,
                    Username      = I.Username, //
                    Name          = I.Name, //
                    Email         = I.Email, //
                    Address       = I.Address, //
                    CountProfiles = I.CountProfiles,
                    JoinDate      = I.JoinDate, //
                    JoinHourZone  = I.JoinHourZone
                };
                AU[c] = UT;
                c++;
            }
            return AU;
        }
        /* Obtiene el Consolidado de Usuarios Creados */

        public M.User Get(string username, string password)
        {
            var query = from U in BD.Users
                        where (U.Username.Equals(username))
                        select new { U.Id, U.Username, U.Password, U.Name };

            M.User temp = new M.User();

            try
            {
                var lista = query.ToArray()[0];

                string hashPassword = SHA256Encrypt(password);

                if (lista.Password.Equals(hashPassword))
                {
                    temp.Id = lista.Id;
                    temp.Username = lista.Username;
                    temp.Name = lista.Name;
                }
            }

            catch
            {

            }

            return temp;
        }

        
    }
}