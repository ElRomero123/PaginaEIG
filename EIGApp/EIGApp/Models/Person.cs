namespace EIGApp.Models
{
    public class Person
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string ProfesionDescription { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public bool Approved { get; set; }
        public long IdUser { get; set; }
    }
}