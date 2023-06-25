class Ukraine 
{
    constructor
        (
            year,
            previousYear,
            microRoentgenPerHour,
            previousMicroRoentgenPerHour,
            betaM3,
            previousBetaM3,
            cs137M3,
            previousCs137M3,
            str90M3,
            previousStr90M3,
            betaM2,
            previousBetaM2,
            cs137M2,
            previousCs137M2,
            str90M2,
            previousStr90M2,
            margin,
            posY,
            valueSize,
            lineSpace
        ) 
    {

        let marginY = 50;

        this.year = year;
        this.previousYear = previousYear;
        this.posX = map(year, 1984, 2011, margin, width - margin);
        this.previousX = map(previousYear, 1984, 2011, margin, width - margin);
        this.posY = posY;
        this.clickedPosY = height / 2;
        this.marginY = marginY;



        // UNCLICKED VALUES
        let minValRoentgen = 0;
        let maxValRoentgen = 4219;
        let minValM3 = 0;
        let maxValM3 = 557.4;
        let minValM2 = 0;
        let maxValM2 = 12333.33;


        this.mappedCs137M3 = map(cs137M3, minValM3, maxValM3, 0, posY);
        this.previousMappedCs137M3 = map(previousCs137M3, minValM3, maxValM3, 0, posY);


        // CLICKED VALUES
        let minValM3Clicked = 0;
        let maxValM3Clicked = 10000;


        this.microRoentgenPerHour = map(microRoentgenPerHour, minValRoentgen, maxValRoentgen, 0, height / 2 - marginY*4);
        this.previousMicroRoentgenPerHour = map(previousMicroRoentgenPerHour, minValRoentgen, maxValRoentgen, 0, height / 2 - marginY*4);

        this.mappedBetaM3 = map(betaM3, minValM3Clicked, maxValM3Clicked, 0, height / 2 - marginY);
        this.previousMappedBetaM3 = map(previousBetaM3, minValM3Clicked, maxValM3Clicked, 0, height / 2 - marginY);
        this.mappedStr90M3 = map(str90M3, minValM3Clicked, maxValM3Clicked, 0, height / 2 - marginY);
        this.previousMappedStr90M3 = map(previousStr90M3, minValM3Clicked, maxValM3Clicked, 0, height / 2 - marginY);

        this.mappedBetaM2 = map(betaM2, minValM2, maxValM2, 0, height / 2 - marginY);
        this.previousMappedBetaM2 = map(previousBetaM2, minValM2, maxValM2, 0, height / 2 - marginY);
        this.mappedCs137M2 = map(cs137M2, minValM2, maxValM2, 0, height / 2 - marginY);
        this.previousMappedCs137M2 = map(previousCs137M2, minValM2, maxValM2, 0, height / 2 - marginY);
        this.mappedStr90M2 = map(str90M2, minValM2, maxValM2, 0, height / 2 - marginY);
        this.previousMappedStr90M2 = map(previousStr90M2, minValM2, maxValM2, 0, height / 2 - marginY);

        this.cs137M3Clicked = map(cs137M3, minValM3Clicked, maxValM3Clicked, 0, height / 2 - marginY);
        this.previousCs137M3Clicked = map(previousCs137M3, minValM3Clicked, maxValM3Clicked, 0, height / 2 - marginY);
    }

    checkHover()
    {
        // The diagonal line from top left to bottom right divides the quad into two triangles.
        // We'll use a method to check if a point is in a triangle twice.
        let isInFirstTriangle = this.pointInTriangle(
            { x: mouseX, y: mouseY },
            { x: this.previousX, y: this.posY - this.previousMappedCs137M3 },
            { x: this.posX, y: this.posY - this.mappedCs137M3 },
            { x: this.previousX, y: this.posY + this.previousMappedCs137M3 }
        );

        let isInSecondTriangle = this.pointInTriangle(
            { x: mouseX, y: mouseY },
            { x: this.posX, y: this.posY - this.mappedCs137M3 },
            { x: this.previousX, y: this.posY + this.previousMappedCs137M3 },
            { x: this.posX, y: this.posY + this.mappedCs137M3 }
        );

        return isInFirstTriangle || isInSecondTriangle;
    }

    pointInTriangle(pt, vt1, vt2, vt3)
    {
        let P = createVector(pt.x, pt.y);
        let A = createVector(vt1.x, vt1.y);
        let B = createVector(vt2.x, vt2.y);
        let C = createVector(vt3.x, vt3.y);

        let v0 = p5.Vector.sub(C, A);
        let v1 = p5.Vector.sub(B, A);
        let v2 = p5.Vector.sub(P, A);

        let dot00 = p5.Vector.dot(v0, v0);
        let dot01 = p5.Vector.dot(v0, v1);
        let dot02 = p5.Vector.dot(v0, v2);
        let dot11 = p5.Vector.dot(v1, v1);
        let dot12 = p5.Vector.dot(v1, v2);

        let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        let v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        return (u >= 0) && (v >= 0) && (u + v < 1);
    }

    mouseClicked()
    {
        let thisSegmentIsClicked = false;

        if (this.checkHover())
        {
            thisSegmentIsClicked = true;
            console.log(thisSegmentIsClicked + "clicked");
        }
        return thisSegmentIsClicked;
    }


    displayClicked()
    {
        if (ukraineIsInActiveState)
        {
            noStroke();
            fill(255, 20, 1, 200);
            quad(this.previousX, this.clickedPosY - this.previousCs137M3Clicked, this.previousX, this.clickedPosY + this.previousCs137M3Clicked,
                this.posX, this.clickedPosY + this.cs137M3Clicked, this.posX, this.clickedPosY - this.cs137M3Clicked);

            strokeWeight(1);
            stroke(255, 20, 1);

            // stroke(255, 255, 255, 150);    
            line(this.previousX, this.clickedPosY - this.previousMicroRoentgenPerHour, this.posX, this.clickedPosY - this.microRoentgenPerHour);
            line(this.previousX, this.clickedPosY + this.previousMicroRoentgenPerHour, this.posX, this.clickedPosY + this.microRoentgenPerHour);
            stroke(255, 20, 1);


            line(this.previousX, this.clickedPosY - this.previousCs137M3Clicked, this.posX, this.clickedPosY - this.cs137M3Clicked);
            line(this.previousX, this.clickedPosY + this.previousCs137M3Clicked, this.posX, this.clickedPosY + this.cs137M3Clicked);

            line(this.previousX, this.clickedPosY - this.previousMappedBetaM3, this.posX, this.clickedPosY - this.mappedBetaM3);
            line(this.previousX, this.clickedPosY + this.previousMappedBetaM3, this.posX, this.clickedPosY + this.mappedBetaM3);

            line(this.previousX, this.clickedPosY + this.previousMappedStr90M3, this.posX, this.clickedPosY + this.mappedStr90M3);
            line(this.previousX, this.clickedPosY - this.previousMappedStr90M3, this.posX, this.clickedPosY - this.mappedStr90M3);

            // stroke(0, 25, 242, 200);
            line(this.previousX, this.clickedPosY - this.previousMappedBetaM2, this.posX, this.clickedPosY - this.mappedBetaM2);
            line(this.previousX, this.clickedPosY + this.previousMappedBetaM2, this.posX, this.clickedPosY + this.mappedBetaM2);

            line(this.previousX, this.clickedPosY - this.previousMappedCs137M2, this.posX, this.clickedPosY - this.mappedCs137M2);
            line(this.previousX, this.clickedPosY + this.previousMappedCs137M2, this.posX, this.clickedPosY + this.mappedCs137M2);

            line(this.previousX, this.clickedPosY - this.previousMappedStr90M2, this.posX, this.clickedPosY - this.mappedStr90M2);

            line(this.previousX, this.clickedPosY + this.previousMappedStr90M2, this.posX, this.clickedPosY + this.mappedStr90M2);


            // HOVER INTERACTION

            if (mouseX > this.previousX && mouseX < this.posX)
            {
                push();
                stroke(255, 20, 1, 150);
                line(this.posX, this.clickedPosY, this.posX, this.posY / 2);
                line(this.posX, this.clickedPosY, this.posX, this.posY / 2 * 3);
                noStroke();
                fill(255, 20, 1, 255);
                // fill(255, 255, 255, 255);

                textSize(valueSize);

                //M3
                textAlign(LEFT, CENTER);
                text("Cs137: " + this.cs137M3Clicked.toFixed(1), this.posX, this.posY / 2);
                text("Beta: " + this.mappedBetaM3.toFixed(1), this.posX, this.posY / 2 + lineSpace);
                text("Str90: " + this.mappedStr90M3.toFixed(1), this.posX, this.posY / 2 + lineSpace * 2);
                textAlign(RIGHT, CENTER);
                text("BQ/M3", this.posX - 10, this.posY / 2 + lineSpace);

                //M2
                textAlign(LEFT, CENTER);
                text("Beta: " + this.mappedBetaM2.toFixed(1), this.posX, this.posY / 2 * 3);
                text("Cs137: " + this.mappedCs137M2.toFixed(1), this.posX, this.posY / 2 * 3 - lineSpace);
                text("Str90: " + this.mappedStr90M2.toFixed(1), this.posX, this.posY / 2 * 3 - lineSpace * 2);
                textAlign(RIGHT, CENTER);
                text("BQ/M2", this.posX - 10, this.posY / 2 * 3 - lineSpace);
                pop();



            }
        }
    }

    displayHovered()
    {
        if (!ukraineIsInActiveState)
        { // We only draw hover quad when it's not in clicked state
            push();
            noStroke();
            fill(255, 20, 1, 5); // Color when hovered (change as needed)

            quad(this.previousX, this.posY - this.previousMappedCs137M3,
                this.previousX, this.posY + this.previousMappedCs137M3,
                this.posX, this.posY + this.mappedCs137M3,
                this.posX, this.posY - this.mappedCs137M3);
            pop();
        }
    }

    display()
    {

        if (!ukraineIsInActiveState)
        {
            if (this.year >= 1984 && this.year <= 2011) 
            {
                if (this.previousMappedCs137M3 > 0 && this.mappedCs137M3 > 0)
                {
                    if (this.checkHover()) 
                    {
                        ukraineHovered = true;
                    }
                    strokeWeight(1);
                    stroke(255, 20, 1);
                    line(this.previousX, this.posY - this.previousMappedCs137M3,
                        this.posX, this.posY - this.mappedCs137M3);

                    line(this.previousX, this.posY + this.previousMappedCs137M3,
                        this.posX, this.posY + this.mappedCs137M3);


                }

            }
        }
    }
}

