import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { IAuthor } from '../model/iauthor';
import { IPost } from '../model/ipost';
import { IForum } from '../model/iforum';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css',
})
export class FirstPageComponent implements OnInit {
  private authors: IAuthor[] = [];
  private post: IPost[] = [];

  public forum: IForum[] = [];
  public clientTimezone: string = '';

  public displayNavbar = '1';
  constructor(private helperService: HelperService) {}
  ngOnInit(): void {

    this.helperService.getAuthorsData().subscribe((data) => {
      if (data === null) return ;
      this.authors = data;
    });

    this.helperService.getpostsData().subscribe((data) => {
      this.post = data;
    });
    dayjs.extend(utc);
    dayjs.extend(timezone);

    this.clientTimezone = dayjs.tz.guess();

    setTimeout(() => {
      if (this.post?.length > 0 && this.authors?.length > 0)
        this.mapData().then(() => {
          this.displayNavbar = '';
        });
    }, 3500);
  }

  async mapData() {
    await this.post.forEach((item) => {
      let author = this.authors.filter((f) => f.id === item.author_id)[0];
      this.forum.push({
        id: item.id,
        name: author.name,
        role: author.role,
        place: author.place,
        avatar_url: author.avatar_url,
        title: item.title,
        body: item.body,
        image_url: item.image_url,
        created_at: dayjs(item.created_at).format('dddd, MMMM, YYYY, HH:MM'),
        author_id: item.author_id,
      });
    });
  }
}
