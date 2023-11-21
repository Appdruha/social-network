import backgrounds from "../components/Common/backgrounds.module.css";

export const chooseMarkerBoxColor = (isMyFollow) => {
    if (isMyFollow) {
        return backgrounds.markerBox_trueBG;
    } else {
        return backgrounds.markerBox_falseBG;
    }
}