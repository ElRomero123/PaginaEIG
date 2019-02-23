namespace EIGApp.Models
{
    public class Person
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string ProfesionDescription { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int Ciprin { get; set; }
        public int Active { get; set; }
        public string CreationDate { get; set; }
        public bool Type { get; set; }
        public string Avatar { get; set; }
        public long IdUser { get; set; }
    }
}