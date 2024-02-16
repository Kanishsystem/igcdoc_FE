import { Component } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {

  currentImageIndex = 0;
  imageSources = ["../../../../assets/images/bg-1.jpg", "bg-2.jpg", "bg-3.jpg"]; // Add your image file names here
  currentImage: string;

  ngOnInit() {
    this.changeImage(); // Change image initially
    setInterval(() => this.changeImage(), 1000); // Change image every second
  }

  changeImage() {
    this.currentImage = this.imageSources[this.currentImageIndex];

    // Increment the index or reset to 0 if it reaches the end
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageSources.length;
  }
}
