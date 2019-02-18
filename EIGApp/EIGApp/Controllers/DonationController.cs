using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;
using System.Linq;

namespace EIGApp.Controllers
{
    public class DonationController : ApiController
    {
        private O.BDEIGEntities BD = new O.BDEIGEntities();

        public bool Post(M.Donation donation)
        {
            bool result = false;

            try
            {
                #pragma warning disable CS0618
                AutoMapper.Mapper.CreateMap<M.Donation, O.Donation>();
                #pragma warning restore CS0618
                O.Donation BDDonation = AutoMapper.Mapper.Map<O.Donation>(donation);
                BDDonation.Date = System.DateTime.Now.ToString("g");
                BD.Donations.Add(BDDonation);
                BD.SaveChanges();

                result = true;
            }

            catch
            {
                result = false;
            }

            return result;
        }

        public M.Donation[] Get()
        {
            var query = from D in BD.Donations
                        where (true)
                        select new {D.Amount, D.Date, D.User.Username};

            var lista = query.ToArray();

            M.Donation[] arrayDonation = new M.Donation[lista.Length];

            for (int i = 0; i < lista.Length; i++)
            {
                M.Donation temp = new M.Donation
                {
                    Amount = lista[i].Amount,
                    Date = lista[i].Date,
                    Username = lista[i].Username
                };

                arrayDonation[i] = temp;
            }

            return arrayDonation;
        }
    }
}