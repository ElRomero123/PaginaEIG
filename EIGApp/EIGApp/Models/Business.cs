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
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public bool Ciprin { get; set; }
        public bool Active { get; set; }
        public System.DateTime CreationDate { get; set; }
        public string CreationHourZone { get; set; }
        public string Avatar { get; set; }
        public string NameAvatar { get; set; }
        public long IdPackage { get; set; }

        // Other
        public bool Type { get; set; }
    }
}