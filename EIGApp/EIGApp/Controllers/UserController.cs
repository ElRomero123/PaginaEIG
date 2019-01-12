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
        private O.bdEIGEntities BD = new O.bdEIGEntities();

        public M.User Get(string username, string password)
        {
            var query = from U in BD.Users
                        where (U.Username.Equals(username))
                        select new {U.Username, U.Password, U.Name};

            var lista = query.ToArray()[0];

            M.User temp = new M.User();

            string hashPassword = SHA256Encrypt(password);

            if (lista.Password.Equals(hashPassword))
            { 
                temp.Username = lista.Username;
                temp.Name = lista.Name;
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