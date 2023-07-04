class Line
{
    constructor(year, margin)
    {
        this.year = year;
        this.posX = map(year, 1984, 2011, margin, width - margin);
        this.posYTop = 20;
        this.posYBottom = height - 20;
    }

    display()
    {
        if (this.year >= 1984 && this.year <= 2011)
        {
        strokeWeight(1);
        stroke('#262525');
        line(this.posX, this.posYTop, this.posX, this.posYBottom);
        }
    }
}





