﻿namespace EIGApp.Models
{
    public class MultimediaJobApplication
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string DownloadLink { get; set; }
        public string LoadDate { get; set; }
        public long IdJobApplication { get; set; }
    }
}