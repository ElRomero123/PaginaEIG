namespace EIGApp.Models
{
    public class JobApplication
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string DocumentNumber { get; set; }
        public string DescriptionApplication { get; set; }
        public int Age { get; set; }
        public string PostedDate { get; set; }
        public string PostedHourZone { get; set; }
        public long IdUser { get; set; }

        /* Otros */
        public string Username { get; set; }
    }
}