﻿namespace EIGApp.Models
{
    public class Case
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string DescriptionCase { get; set; }
        public string PostedDate { get; set; }
        public string PostedHourZone { get; set; }
        public long IdUser { get; set; }
        
        /* Otros */
        public string Username { get; set; }
    }
}