class Rate
{
    constructor(year, country, value, margin, posY, previousValue, previousYear, previousCountry, radiationPosY, valueSize)
    {
        let minVal = 4;
        let maxVal = 990;
        let marginY = 50;


        this.posX = map(year, 1984, 2011, margin, width - margin);
        this.previousX = map(previousYear, 1984, 2011, margin, width - margin);
        this.posY = height;

        this.year = year;
        this.previousYear = previousYear;

        this.country = country;
        this.previousCountry = previousCountry;

        this.value = value;
        this.previousValue = previousValue;

        this.mappedValue = map(value, minVal, maxVal, 0, posY / 4);
        this.previousMappedValue = map(previousValue, minVal, maxVal, 0, posY / 4);


        this.color = map(value, minVal, maxVal, 50, 255);

        this.lineY1 = this.posY - this.mappedValue / 2;
        this.lineY2 = this.posY + this.mappedValue / 2;
        this.stroke = 1;
        this.strokeAlpha = 255;
        this.fillAlpha = 50;
        this.fillColor1 = color(255, 0, 255, this.fillAlpha);
        this.fillColor2 = color(255, 0, 200, this.fillAlpha);
        this.fillColor3 = color(255, 255, 255, this.fillAlpha);
        this.strokeColor1 = color(255, 0, 255, this.strokeAlpha);
        this.strokeColor2 = color(255, 0, 200, this.strokeAlpha);
        this.strokeColor3 = color(255, 255, 255, this.strokeAlpha);
    }

    display()
    {
        push();
        if (this.year <= 2011 && this.year >= 1984)
        {
            noFill();

            if (this.country == 1)
            {
                // stroke(this.strokeColor1);
                // fill(this.fillColor1);
                stroke(0, 25, 242, this.strokeAlpha);
            }
            else if (this.country == 2)
            {
                // stroke(this.strokeColor2);
                // // fill(this.fillColor2);
                stroke(0, 25, 242, this.strokeAlpha);
            }
            else if (this.country == 3)
            {
                // stroke(this.strokeColor3);
                // // fill(this.fillColor3);
                stroke(0, 25, 242, this.strokeAlpha);
            }

            strokeWeight(this.stroke);
            line(this.previousX, this.posY - this.previousMappedValue, this.posX, this.posY - this.mappedValue);
            noStroke();
            if (this.country == 1)
            {
                // fill(this.fillColor1);
                fill(0, 25, 242, this.fillAlpha);
            }
            else if (this.country == 2)
            {
                // fill(this.fillColor2);
                fill(0, 25, 242, this.fillAlpha);
            }
            else if (this.country == 3)
            {
                // fill(this.fillColor3);
                fill(0, 25, 242, this.fillAlpha);
            }

            quad(this.previousX, this.posY, this.previousX, this.posY - this.previousMappedValue, this.posX, this.posY - this.mappedValue, this.posX, this.posY);


            // LINES & VALUES

            if (mouseY > radiationPosY && mouseX > this.previousX && mouseX < this.posX)
            {
                stroke(0, 25, 242);
                strokeWeight(1);
                line(this.posX, height / 4 * 3, this.posX, height);
                // line(this.posX, height/4, this.posX, this.posY);
                strokeWeight(10);
                stroke('black');
                fill(0, 25, 242);
                textSize(valueSize);
                
                if (this.country == 1)
                {
                    text("Belarus: " + this.value, this.posX, height / 4 * 3 - lineSpace * 2);
                }
                else if (this.country == 2)
                {
                    text("Lithuania: " + this.value, this.posX, height / 4 * 3 - lineSpace);
                }
                else if (this.country == 3)
                {
                    text("Latvia: " + this.value, this.posX, height / 4 * 3);
                }
            }

            // if (mouseY < radiationPosY && mouseX > this.previousX && mouseX < this.posX)
            // {
            //     strokeWeight(1);
            //     stroke(255, 20, 1);
            //     line(this.posX, height/4, this.posX, radiationPosY);
            // }

           

            // if (this.year >= 1983)
            // {
            //     stroke(this.color);
            // }
            pop();



        }

        //     display()
        //     {
        //         if (mouseX > this.posX - this.stroke*10 && mouseX < this.posX + this.stroke/2 && mouseY > this.lineY1 && mouseY < this.lineY2) 
        //         {
        //             noStroke();
        //             textSize(20);
        //             fill('white');
        //             textAlign(CENTER);
        //             text("thyroid cancer cases per 100.000 people: "+this.value, width/2, height/3);
        //         }
        //         push();
        //         noFill();
        //         stroke(this.color, this.color, this.color);
        //         strokeWeight(this.stroke);
        //         if (this.year <= 1985 && this.year >= 1984)
        //         {
        //             arc(this.posX, this.posY, this.mappedValue, this.mappedValue, HALF_PI, PI + HALF_PI);
        //         }
        //         else if (this.year >= 1986 && this.year <= 2011)
        //         {
        //             arc(this.posX, this.posY, this.mappedValue, this.mappedValue, PI + HALF_PI, HALF_PI);
        //         }


        //         if (this.year >=1983)
        //         {
        //         stroke(this.color);

        //         }
        //         pop();
        //     }
    }
}