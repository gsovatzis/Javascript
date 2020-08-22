export class youTubePlayer {

    videoSrc='';
    videoDiv='';

    play() {
        console.log(`YouTube video playing from URL: ${this.videoSrc}`);
        var mySrc = `http://www.youtube.com/embed/${this.videoSrc.split("v=")[1]}?enablejsapi=1&origin=http://example.com&autoplay=1`
        this.videoDiv.innerHTML = `<iframe id='player' type='text/html' width='640' height='390' src='${mySrc}' frameborder='0'></iframe>`;
    }
}