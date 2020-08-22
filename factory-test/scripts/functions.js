import * as html5PlayerModule from './html5player.js';
import * as youTubePlayerModule from './youtubeplayer.js';

document.getElementById('doPlay').addEventListener('click', function() { doPlay('myVideo'); })

const videoPlayer = function(myVideoDIV) {
    var player;
    var videoSrc = myVideoDIV.getAttribute("data-video-src");
    var videoType = myVideoDIV.getAttribute("data-video-type");
    if(videoType==undefined || videoType=='') {
        throw new Error('Video Type is not defined. It must be html5 or youtube');
    }
    else {
        if(videoType.toLowerCase()!="html5" && videoType.toLowerCase()!="youtube")
            throw new Error('Invalid Video Type defined. It must be html5 or youtube');
        
        if(videoSrc==undefined || videoSrc=='')
            throw new Error('You must define a Video URL');
        
        if(videoType.toLowerCase()=="html5") {
            player = new html5PlayerModule.html5Player();
        }

        if(videoType.toLowerCase()=="youtube") {
            player = new youTubePlayerModule.youTubePlayer();
        }
    }

    player.videoSrc = videoSrc;
    player.videoDiv = myVideoDIV;
    return player;
 
}

function doPlay(videoDIV) {
    var myPlayer = videoPlayer(document.getElementById(videoDIV));
    myPlayer.play();
}

