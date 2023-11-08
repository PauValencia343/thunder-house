import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['AVAILABLE', 'BUSY', 'MAINTENANCE'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: ['#2f4a15', '#10c4d5', '#A5A5A5'],
                    hoverBackgroundColor: ['#2f4a15','#10c4d5', '#A5A5A5']
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}
