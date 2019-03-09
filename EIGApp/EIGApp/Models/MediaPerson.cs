namespace EIGApp.Models
{
    public class MediaPerson
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string DownloadLink { get; set; }
        public string LoadDate { get; set; }
        public string LoadHourZone { get; set; }
        public long IdPerson { get; set; }
    }
}