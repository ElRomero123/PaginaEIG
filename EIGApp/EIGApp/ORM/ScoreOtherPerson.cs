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
    
    public partial class ScoreOtherPerson
    {
        public long Id { get; set; }
        public int Score { get; set; }
        public long IdOtherPerson { get; set; }
    
        public virtual OtherPerson OtherPerson { get; set; }
    }
}
