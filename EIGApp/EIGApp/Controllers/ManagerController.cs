using System.Web.Http;
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

        public M.Manager Get(string username, string password)
        {
            var query = from M in BD.Managers
                        where (M.Username.Equals(username))
                        select new {M.Id, M.Username, M.Password, M.Name};

            M.Manager temp = new M.Manager();

            try
            {
                var lista = query.ToArray()[0];

                string hashPassword = SHA256Encrypt(password);

                if (lista.Password.Equals(hashPassword))
                {
                    temp.Id = lista.Id;
                    temp.Username = lista.Username;
                    temp.Password = lista.Name;
                }
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