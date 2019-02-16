using System.Web.Http;
using M = EIGApp.Models;
using O = EIGApp.ORM;

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
    }
}