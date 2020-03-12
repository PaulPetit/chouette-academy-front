import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../_services/course.service";

declare var Hls: any;

@Component({
    selector: 'app-live-page',
    templateUrl: './live-page.component.html',
    styleUrls: ['./live-page.component.scss']
})
export class LivePageComponent implements OnInit {
    private courseId: number;

    constructor(private route: ActivatedRoute, private courseService: CourseService) {
    }

    ngOnInit() {
        this.courseId = +this.route.snapshot.paramMap.get('course-id');
        this.courseService.getCourse(this.courseId)
            .subscribe(value => {
                const streamUrl = value.body.streamURL;
                console.log(streamUrl);
                this.startStream(streamUrl);
            });
    }

    private startStream(streamUrl: string) {
        const video: any = document.getElementById('video');
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        }
    }

}
