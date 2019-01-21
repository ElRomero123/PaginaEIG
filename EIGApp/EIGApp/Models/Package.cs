namespace EIGApp.Models
{
    public class Package
    {
        public long Id { get; set; }
        public string Linea { get; set; }
        public string Producto { get; set; }
        public string Cantidad { get; set; }
        public string FechaCompra { get; set; }
        public string TiempoCubrimiento { get; set; }
        public string Precio { get; set; }
        public int Kind { get; set; }
        public long IdUser { get; set; }
    }
}