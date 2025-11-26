import Styles from "./styles";

  const scoreStyles = (grade: string) => {
    switch (grade) {
      case "very-low": {
         return {
          backgroundColor: "#ED4348",
          borderColor: "#bf383a",
        };
        break;
      }
      case "low": {
         return {
          backgroundColor: "#ED4348",
          borderColor: "#bf383a",
        };
        break;
      }
      case "medium": {
         return {
          backgroundColor: Styles.backgroundTertiary,
          borderColor: "#e4a92d",
        };
        break;
      }
      case "high": {
         return {
          backgroundColor: "#4DEC71",
          borderColor: "#41ca55",
        };
        break;
      }
      default: {
         return {
          backgroundColor: "#ED4348",
          borderColor: "#bf383a",
        };
      }
    }
   
    };

  export default scoreStyles;