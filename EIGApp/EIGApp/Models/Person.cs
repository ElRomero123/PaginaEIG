using System;

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
        public bool Ciprin { get; set; }
        public bool Active { get; set; }
        public string CreationDate { get; set; }
        public string CreationHourZone { get; set; }
        public string Avatar { get; set; }
        public string NameAvatar { get; set; }
        public long Views { get; set; }
        public long IdUser { get; set; }

        /* Otros */
        public string Username { get; set; }
        public bool Type { get; set; }
    }
}