using System.ComponentModel.DataAnnotations;

namespace ApiRotas.Models
{
    public class Rota
    {
        public Guid Id { get; set; }

        [Required]
        public string Origem { get; set; }

        [Required]
        public string Destino { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Valor { get; set; }

        public string[] conexoes  { get; set; }

    }
}