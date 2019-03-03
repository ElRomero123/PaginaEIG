namespace EIGApp.Models
{
    public class OtherPerson
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Profesion { get; set; }
        public string ProfesionDescription { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public bool Ciprin { get; set; }
        public bool Active { get; set; }
        public System.DateTime CreationDate { get; set; }
        public string CreationHourZone { get; set; }
        public string Avatar { get; set; }
        public string NameAvatar { get; set; }
        public long IdUser { get; set; }

        /* Otras */
        public string Username { get; set; }
    }
}