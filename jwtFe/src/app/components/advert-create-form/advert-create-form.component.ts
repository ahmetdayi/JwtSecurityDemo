import {Component, OnInit} from '@angular/core';
import {AdvertService} from "../../services/advert.service";
import {catchError, map, of} from "rxjs";
import {CreateAdvertRequest} from "../../models/createAdvertRequest";

@Component({
  selector: 'app-advert-create-form',
  standalone: true,
  imports: [],
  templateUrl: './advert-create-form.component.html',
  styleUrl: './advert-create-form.component.css'
})
export class AdvertCreateFormComponent implements OnInit{

  constructor(private advertService:AdvertService) {
  }

  async ngOnInit(): Promise<void> {

    const request: CreateAdvertRequest = {price: "12223", name: "asdsad", title: "asdasdsadd"}
    let [response] = await Promise.all([(await this.advertService.createAdvert(request)).subscribe({
      next: value => {
        console.log(value)
      }, error: err => {
        console.log(err)
      }
    })])

  }


}
