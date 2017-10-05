export function print(props) {
    console.log("- Character: " + this.getName())

    if (props && props.health) {
      console.log("- HEALTH: " + this.getHp() + "/" + this.getHpMax())
    }

    if(props && props.special) {
      console.log("- SPECIAL:")
      console.log("-- S: " +    this.getSpecial({attribute: "S"}))
      console.log("-- P: " +    this.getSpecial({attribute: "P"}))
      console.log("-- E: " +    this.getSpecial({attribute: "E"}))
      console.log("-- C: " +    this.getSpecial({attribute: "C"}))
      console.log("-- I: " +    this.getSpecial({attribute: "I"}))
      console.log("-- A: " +    this.getSpecial({attribute: "A"}))
      console.log("-- L: " +    this.getSpecial({attribute: "L"}))
    }

    if (props && props.attack) {
      console.log("- ATTACK: ");
      console.log("-- Base Damage: " +  this.getBaseDamage().min + "-" + this.getBaseDamage().max);
			console.log("-- Crit Chance: " +  this.getCritChance() + "%");
      console.log("-- Crit Damage: x" + this.getCritMultiplier());
    }

    if (props && props.defense) {
      console.log("- DEFENSE: ");
			console.log("-- Dodge Chance: " +  this.getDodgeChance() + "%");
      console.log("-- Damage Threshold: " + this.getDT());
    }


    if (props && props.xp) {
      console.log("- EXPERIENCE: ");
      // console.log("-- XP:  " + this.exp.getXP());
      // console.log("-- LVL: " + this.exp.getLevel());
      // console.log("-- SkP: " + this.exp.getSkillPoints());
    }

    console.log("")

  }