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
    
    public partial class JobApplication
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public JobApplication()
        {
            this.FileJobApplications = new HashSet<FileJobApplication>();
        }
    
        public long Id { get; set; }
        public string Name { get; set; }
        public string DocumentNumber { get; set; }
        public string DescriptionApplication { get; set; }
        public int Age { get; set; }
        public long IdUser { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FileJobApplication> FileJobApplications { get; set; }
        public virtual User User { get; set; }
    }
}