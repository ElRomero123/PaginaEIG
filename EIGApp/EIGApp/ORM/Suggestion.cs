//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EIGApp.ORM
{
    using System;
    using System.Collections.Generic;
    
    public partial class Suggestion
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PostedDate { get; set; }
        public long IdUser { get; set; }
    
        public virtual User User { get; set; }
    }
}
