using System;
using System.Collections.Generic;
using System.Text;

namespace Commons.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string Username { get; set; }
        public string Container { get; set; } = "Unread";
    }
}
