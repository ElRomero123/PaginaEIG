namespace EIGApp.Models
{
    public class Business
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Specialism { get; set; }
        public string SpecialismDescription { get; set; }
        public string WebPage { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public long IdPackage { get; set; }
    }
}