namespace EIGApp.Models
{
    public class Suggestion
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PostedDate { get; set; }
        public string Username { get; set; }
        public long IdUser { get; set; }
    }
}