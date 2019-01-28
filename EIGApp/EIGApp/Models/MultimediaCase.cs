namespace EIGApp.Models
{
    public class MultimediaCase
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string DownloadLink { get; set; }
        public string LoadDate { get; set; }
        public long IdCase { get; set; }
    }
}