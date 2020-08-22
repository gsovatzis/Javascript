export class html5Player {
    
    videoSrc='';
    videoDiv='';

    play() {
        console.log(`HTML5 video playing from URL: ${this.videoSrc}`);
        var videoNode = document.createElement("video");
        videoNode.src = this.videoSrc;
        this.videoDiv.appendChild(videoNode);
        videoNode.play();
    }
}