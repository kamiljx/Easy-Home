using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOs
{
    public class CreateMessageDto
    {
        public string RecipentUsername { get; set; }
        public string SenderUsername { get; set; }
        public string Content { get; set; }
    }
}
