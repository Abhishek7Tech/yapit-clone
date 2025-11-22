function genrateAgentsBackground(levels: string) {
  switch (levels) {
    case "A1": {
      return ["#F43F5E", "#EF4444"];
      break;
    }
    case "A2": {
      return ["#D97706", "#F97316"];
      break;
    }
    case "B1": {
      return ["#EAB308", "#84CC16"]
;
      break;
    }
    case "B2": {
      return ["#10B981", "#22C55E"]
;
      break;
    }
    case "C1": {
      return ["#0EA5E9", "#3B82F6"]
;
      break;
    }
    case "C2": {
      return ["#8B5CF6", "#A855F7"]
;
      break;
    }
    default:
      return ["#F43F5E", "#EF4444"];
  }
}

export default genrateAgentsBackground;
