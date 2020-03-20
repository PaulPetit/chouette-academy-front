import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../_services/course.service';
import {MessagesService} from '../../_services/messages.service';

declare var Hls: any;

@Component({
    selector: 'app-live-page',
    templateUrl: './live-page.component.html',
    styleUrls: ['./live-page.component.scss']
})
export class LivePageComponent implements OnInit, OnDestroy {
    private courseId: number;
    public chatId: number;
    private interval: any;

    constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router, private messagesService: MessagesService) {
        this.courseId = +this.route.snapshot.paramMap.get('course-id');
        this.courseService.getCourse(this.courseId)
            .subscribe(value => {
                console.log(value);
                const course = value.body;

                // Si le cours est en live et si on est inscrit ou owner on continue
                // Sinon on renvoie vers la page de description du cours
                if (course.live && (course.subscribed || course.owned)) {
                    const streamUrl = course.streamURL;
                    console.log(streamUrl);
                    this.chatId = course.chatId;
                    this.startStream(streamUrl);
                } else {
                    this.router.navigate(['course', this.courseId]);
                }

            });
    }

    ngOnInit() {
        this.interval = setInterval(() => {
            this.checkIfStillLive();
        }, 5000);
    }

    checkIfStillLive() {
        this.courseService.getCourse(this.courseId)
            .subscribe(value => {
                console.log(value);
                const isLive = value.body.live;
                if (!isLive) {
                    this.messagesService.addInfoMessage('Live', 'Le live est terminé');
                    this.router.navigate(['/']);
                }
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

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

}
