﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

    }
}
