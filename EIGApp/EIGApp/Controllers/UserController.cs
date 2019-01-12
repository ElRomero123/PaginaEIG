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

            M.User temp = new M.User();

            try
            {
                var lista = query.ToArray()[0];

                string hashPassword = SHA256Encrypt(password);

                if (lista.Password.Equals(hashPassword))
                {
                    temp.Username = lista.Username;
                    temp.Name = lista.Name;
                }
            }

            catch
            {

            }
            
            return temp;
        }

        public bool Post(M.User usuario)
        {
            bool state;
            string password = SHA256Encrypt(usuario.Password);
            usuario.Password = password;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.User, O.User>();
                #pragma warning restore CS0618
                O.User BDUser = AutoMapper.Mapper.Map<O.User>(usuario);
                BD.Users.Add(BDUser);
                BD.SaveChanges();
                state = true;
            }

            catch
            {
                state = false;
            }

            return state;
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