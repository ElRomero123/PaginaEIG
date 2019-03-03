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

        public M.User Get(string username, string password)
        {
            var query = from U in BD.Users
                        where (U.Username.Equals(username))
                        select new {U.Id, U.Username, U.Password, U.Name};

            M.User temp = new M.User();

            try
            {
                var lista = query.ToArray()[0];

                string hashPassword = SHA256Encrypt(password);

                if (lista.Password.Equals(hashPassword))
                {
                    temp.Id            = lista.Id;
                    temp.Username      = lista.Username;
                    temp.Name          = lista.Name;
                }
            }

            catch
            {

            }
            
            return temp;
        }

        public M.User[] Get()
        {
            var query = from U in BD.Users
                        where (true)
                        select new {U.Id, U.Username, U.Name, U.Email, U.Address, U.JoinDate, U.JoinHourZone};

            var lista = query.ToArray();
            int rsize = lista.Length;

            M.User[] arrayUser = new M.User[rsize];

            for (int i = 0; i < rsize; i++)
            {
                M.User temp = new M.User
                {
                    Id = lista[i].Id,
                    Username = lista[i].Username,
                    Name = lista[i].Name,
                    Email = lista[i].Email,
                    Address = lista[i].Address,
                    JoinDate = lista[i].JoinDate,
                    JoinHourZone = lista[i].JoinHourZone
                };

                arrayUser[i] = temp;
            }

            return arrayUser;
        }

        public bool Get(string username)
        {
            var query = from U in BD.Users
                        where (U.Username.Equals(username))
                        select new { U.Id };

            return query.ToArray().Length == 0;
        }

        public bool Post(M.User usuario)
        {
            bool S;
            try
            {
                O.User newUser = new O.User
                {
                    Username     = usuario.Username,
                    Password     = SHA256Encrypt(usuario.Password),
                    Name         = usuario.Name,
                    Email        = usuario.Email,
                    Address      = usuario.Address,
                    JoinDate     = System.DateTime.Now,
                    JoinHourZone = System.TimeZoneInfo.Local.ToString()
                };

                BD.Users.Add(newUser);
                BD.SaveChanges();
                S = true;
            }

            catch
            {
                S = false;
            }

            return S;
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