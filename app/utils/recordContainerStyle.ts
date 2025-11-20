import Styles from "./styles";

export function recordContainerStyle(submitAudio: boolean, showResults: boolean) {
    if(submitAudio) {
        return "transparent";
    } 
    if(showResults) {
        return Styles.backgroundColor;
    }
    return "white";
}

