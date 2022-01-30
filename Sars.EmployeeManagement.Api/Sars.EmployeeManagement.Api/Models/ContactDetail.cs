using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Sars.EmployeeManagement.Api.Models
{
    public class ContactDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string LandLineNumber { get; set; }
        [Required]
        public string MobileNumber { get; set; }
        public string FacebookLink { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        public string LinkedInLink { get; set; }
    }
}
