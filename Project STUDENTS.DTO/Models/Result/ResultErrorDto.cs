﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Project_student.DTO.Models.Result
{
    public class ResultErrorDto:ResultDto
    {
         public List<string> Errors { get; set; }
    }
}
