namespace EIGApp.Models
{
    public class MediaCase
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string DownloadLink { get; set; }
        public string LoadDate { get; set; }
        public string LoadHourZone { get; set; }
        public long IdCase { get; set; }
    }
}