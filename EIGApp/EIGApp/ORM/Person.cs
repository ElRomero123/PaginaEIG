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
    
    public partial class Person
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string ProfesionDescription { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int Ciprin { get; set; }
        public int Active { get; set; }
        public string CreationDate { get; set; }
        public string Avatar { get; set; }
        public long IdUser { get; set; }
    
        public virtual User User { get; set; }
    }
}
