namespace EIGApp.Models
{
    public class Product
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string TypeDescription { get; set; }
        public string AttendantName { get; set; }
        public string AttendantWebPage { get; set; }
        public string AttendantEmail { get; set; }
        public string AttendantPhone { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Date { get; set; }
        public bool Ciprin { get; set; }
        public bool Active { get; set; }
        public System.DateTime CreationDate { get; set; }
        public string CreationHourZone { get; set; }
        public string Avatar { get; set; }
        public string NameAvatar { get; set; }
        public long IdPackage { get; set; }
    }
}