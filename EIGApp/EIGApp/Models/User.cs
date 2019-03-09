﻿namespace EIGApp.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public long CountProfiles { get; set; }
        public string JoinDate { get; set; }
        public string JoinHourZone { get; set; }
    }
}