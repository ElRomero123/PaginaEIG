namespace EIGApp.Models
{
    public class MediaOtherPerson
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string DownloadLink { get; set; }
        public string LoadDate { get; set; }
        public long IdOtherPerson { get; set; }
    }
}