function playAudio(fileLocation) {
    if (isMuted) {
        return;
    }
    const audio = new Audio(fileLocation);

    audio.volume = volume / 100;

    audio.play();
}


