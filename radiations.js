class Radiation 
{
    constructor(year, country, unit, value, previousYear, previousValue, previousCountry, previousUnit, margin, posY, valueSize, lineSpace) 
    {
        let minVal = 0;
        let maxVal = 241000;

        this.unit = unit;
        this.previousUnit = previousUnit;

        this.year = year;
        this.previousYear = previousYear;

        this.country = country;
        this.previousCountry = previousCountry;

        this.posX = map(year, 1984, 2011, margin, width - margin);
        this.previousX = map(previousYear, 1984, 2011, margin, width - margin);
        this.posY = posY;

        this.value = value;
        this.previousValue = previousValue;

        this.mappedValue = map(value, minVal, maxVal, 0, height / 0.7);
        this.previousMappedValue = map(previousValue, minVal, maxVal, 0, height / 0.7);

        this.lineY1 = this.posY - this.mappedValue;
        this.lineY2 = this.posY + this.mappedValue;

        this.alpha = 80;
        this.strokeWeight = 1;
        this.strokeAlpha = 200;
    }

    display()
    {
        if(this.country == "United Kingdom" && this.previousCountry == "United Kingdom" &&
        this.unit == "BQ/M3" && this.previousUnit == "BQ/M3" && mouseY < this.posY && mouseX > this.previousX && mouseX < this.posX)
        {
            stroke(255, 20, 1);
            line(this.posX, this.posY, this.posX, height/4+lineSpace*3-10);
        }

       
      
        if
            (
            this.country == "United Kingdom" && this.previousCountry == "United Kingdom" &&
            this.unit == "BQ/M3" && this.previousUnit == "BQ/M3"
        )
        {
            noFill();
            strokeWeight(this.strokeWeight);
            stroke(255, 20, 1, this.strokeAlpha);
            line(this.previousX, this.posY - this.previousMappedValue, this.posX, this.posY - this.mappedValue);
            line(this.previousX, this.posY + this.previousMappedValue, this.posX, this.posY + this.mappedValue);

            fill(255, 20, 1, this.alpha);
            noStroke();
            quad(this.previousX, this.posY - this.previousMappedValue, this.previousX, this.posY + this.previousMappedValue,
                this.posX, this.posY + this.mappedValue, this.posX, this.posY - this.mappedValue);


            fill(255, 20, 1);
            textSize(valueSize);

            if (mouseY < this.posY && mouseX > this.previousX && mouseX < this.posX)
            {
                text("UK: " + this.value.toFixed(1), this.posX, height / 4);
                text(this.year, this.posX, height / 4 - lineSpace);
            }
        }

        if
            (
            this.country == "The Netherlands" && this.previousCountry == "The Netherlands" &&
            this.unit == "BQ/M3" && this.previousUnit == "BQ/M3"
        )
        {
            noFill()
            strokeWeight(this.strokeWeight);
            stroke(255, 20, 1, this.strokeAlpha);
            line(this.previousX, this.posY - this.previousMappedValue, this.posX, this.posY - this.mappedValue);
            line(this.previousX, this.posY + this.previousMappedValue, this.posX, this.posY + this.mappedValue);

            fill(255, 20, 1, this.alpha);
            noStroke();
            quad(this.previousX, this.posY - this.previousMappedValue, this.previousX, this.posY + this.previousMappedValue,
                this.posX, this.posY + this.mappedValue, this.posX, this.posY - this.mappedValue);

            fill(255, 20, 1);
            textSize(valueSize);
            if (mouseY < this.posY && mouseX > this.previousX && mouseX < this.posX)
            {
                text("Niederlande: " + this.value.toFixed(1), this.posX, height / 4 + lineSpace);
            }
        }

        if
            (
            this.country == "Belgium" && this.previousCountry == "Belgium" &&
            this.unit == "BQ/M3" && this.previousUnit == "BQ/M3"
        )
        {
            noFill()
            strokeWeight(this.strokeWeight);
            stroke(255, 20, 1, this.strokeAlpha);
            line(this.previousX, this.posY - this.previousMappedValue, this.posX, this.posY - this.mappedValue);
            line(this.previousX, this.posY + this.previousMappedValue, this.posX, this.posY + this.mappedValue);
            fill(255, 20, 1, this.alpha);
            noStroke();
            quad(this.previousX, this.posY - this.previousMappedValue, this.previousX, this.posY + this.previousMappedValue,
                this.posX, this.posY + this.mappedValue, this.posX, this.posY - this.mappedValue);

            fill(255, 20, 1);
            textSize(valueSize);
            if (mouseY < this.posY && mouseX > this.previousX && mouseX < this.posX)
            {
                text("Belgien: " + this.value.toFixed(1), this.posX, height / 4 + lineSpace *2);
            }
        }

    }
}
