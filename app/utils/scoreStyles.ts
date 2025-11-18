import Styles from "./styles";

  const scoreStyles = (grade: string) => {
    let styles = {};
    switch (grade) {
      case "very-low": {
        styles = {
          backgroundColor: "#ED4348",
          borderColor: "#bf383a",
        };
        break;
      }
      case "low": {
        styles = {
          backgroundColor: "#ED4348",
          borderColor: "#bf383a",
        };
        break;
      }
      case "medium": {
        styles = {
          backgroundColor: Styles.backgroundTertiary,
          borderColor: "#e4a92d",
        };
        break;
      }
      case "high": {
        styles = {
          backgroundColor: "#4DEC71",
          borderColor: "#41ca55",
        };
        break;
      }
      default: {
        styles = {
          backgroundColor: "#ED4348",
          borderColor: "#bf383a",
        };
      }
    }
    console.log("Styles", styles);
    return styles;
  };

  export default scoreStyles;