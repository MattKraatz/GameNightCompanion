﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GameNightBuddy_Server.Models
{
  public class UserStat
  {
    // Primary Key
    public Guid UserStatId { get; set; }
    // Foreign Keys
    [Required]
    public Guid UserId { get; set; }
    public User User { get; set; }
    // Foreign Keys Elsewhere
    // User Stat Entities manage many-to-many stat relationships
    // stat title is controlled via bool columns
    public List<UserStatEntity> UserStatEntities { get; set; }

    // Unique Columns
    public int GamesInCollectionCount { get; set; }
    public int MatchesPlayedCount { get; set; }
    public int MatchesWonCount { get; set; }

    // Default
    public DateTime DateCreated { get; set; }
    public string UserCreated { get; set; }
    public DateTime DateUpdated { get; set; }
    public string UserUpdated { get; set; }
    public Boolean IsActive { get; set; }
  }
}