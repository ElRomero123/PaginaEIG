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
        public string City { get; set; }
        public string Address { get; set; }
        public string Date { get; set; }
        public string Avatar { get; set; }
        public int Ciprin { get; set; }
        public int Active { get; set; }
        public long IdPackage { get; set; }
    }
}