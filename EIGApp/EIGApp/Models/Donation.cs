namespace EIGApp.Models
{
    public class Donation
    {
        public long Id { get; set; }
        public long Amount { get; set; }
        public string Date { get; set; }
        public string Username { get; set; }
        public long IdUser { get; set; }
    }
}