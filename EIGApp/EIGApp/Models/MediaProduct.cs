namespace EIGApp.Models
{
    public class MediaProduct
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string DownloadLink { get; set; }
        public string LoadDate { get; set; }
        public long IdProduct { get; set; }
    }
}