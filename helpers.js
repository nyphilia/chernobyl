
class Helper
{
    constructor(year, value, margin, posY, valueSize, descriptionSize, lineSpace)
    {

        // this.d = 0;
        this.year = year;
        this.posX = map(year, 1984, 2011, margin, width - margin);
        this.posY = posY;

        this.value = value;
        this.rValue = map(value, 0, 305826, 0, posY * 1.3);
        this.width = 2;
        this.textColor = color(255, 255, 255);
        this.fillColor = 255
        this.cY = posY + this.rValue / 1.6 + this.width
    }

    display()
    {
        push();
        let shade = map(mouseX, 0, width, 230, 0);

        // this.d = dist(mouseX, mouseY, this.posX, this.cY);
        // this.d = this.d < 0 ? this.d = 0 : this.d = this.d;
        // this.d = this.d > 50 ? this.d = 50 : this.d = this.d;
        // this.d = map(this.d, 0, 50, 50,5);

        if (mouseX > this.posX - this.width * 25 && mouseX < this.posX + this.width * 25 && mouseY > this.posY && mouseY < this.posY + this.rValue / 1.6 + 10)
        {
            helperHovered = true;
        }
        noStroke();

        fill(this.fillColor, shade);

        rectMode(CORNER);
        rect(this.posX - this.width / 2, this.posY, this.width, this.rValue / 1.6, 5);
        noFill();
        stroke(this.fillColor, shade);
        strokeWeight(this.width);
        // circle(this.posX, this.cY, this.d);

    }

    displayHovered()
    {
        stroke('black');
        fill(this.textColor);
        textAlign(CENTER);
        textSize(valueSize);
        text("Jahr: " + this.year, this.posX, this.textY);
        text(this.value, this.posX, this.posY + this.rValue / 1.6 + this.width * 20);
        textSize(descriptionSize);
        text("Anzahl der Hilfskraefte, die beim Aufraeumen der Unfallstelle halfen", width / 2, height / 15)
        noStroke();
        circle(this.posX, this.posY + this.rValue / 1.6 + this.width * 2, this.width * 2);
        pop();
    }


}