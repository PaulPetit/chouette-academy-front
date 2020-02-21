import {Component, OnInit} from '@angular/core';

declare var Hls: any;

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.css']
})
export class LivePageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.startStream('paul');
  }

  private startStream(streamKey: string) {
    const video: any = document.getElementById('video');
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('http://192.168.244.85:8080/hls/' + streamKey + '.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }

}
