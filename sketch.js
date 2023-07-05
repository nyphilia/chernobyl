// OBJECT ARRAYS
let rates = [];
let lines = [];
let helpers = [];
let radiations = [];
let ukraines = [];

// TABLES
let thyroid, helperValue, cs137, ukraine;

// INTERACTIVITY STUFF
let ukraineIsInActiveState = false;
let ukraineHovered = false;
let ukraineClicked = false;
let helperHovered = false;
let timeOutID;
let inactivity = true;

// FONT STUFF
let font;
let lineSpace;
let titleSize;
let valueSize;
let descriptionSize;

// POSITION STUFF
let marginX = 0;
let radiationPosY;
let ratesPosY;

function preload()
{
  helperValue = loadTable('data/used/chernobyl-helpers.csv', 'csv', 'header');
  thyroid = loadTable('data/used/thyroid-cancer.csv', 'csv', 'header');
  cs137 = loadTable('data/used/cs137-levels.csv', 'csv', 'header');
  ukraine = loadTable('data/used/ukraine-radiation.csv', 'csv', 'header');
  font = loadFont('fonts/KTFRublenaTrial-Solid.otf');
}

function setup()
{
  cursor(ARROW);
  createCanvas(windowWidth, windowHeight/*, SVG*/);
  pixelDensity(3.5);
  // radiationPosY = height / 12 * 4.5;
  radiationPosY = height / 2;
  ratesPosY = height / 12 * 9;


  // minMax();
  rateCalc();
  helperObjects();
  ukrainePush();
  radiationsPush();
  startTimer();
}



function draw()
{
  // let time = millis();
  // rotateX(time / 1000);
  // rotateZ(time / 1234);
  // rotateY(time / 2345);
  clear();
  background('black');

  // let shadeValue = mouseX; 

  textFont(font);
  lineSpace = width / 80;
  titleSize = width / 10;
  valueSize = width / 80;
  descriptionSize = width / 50;

  if (inactivity)
  {

    push();
    textSize(titleSize);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255, 20, 1);
    if (mouseX < width / 2)
    {
      text("CHERNOBYL", width / 2, height / 2);
      pop();
    }
    else
    {
      push();
      text("ЧОРНОБИЛЬ", width / 2, height / 2);
      pop();
    }
  }

  if (!inactivity)
  {



    textSize(25);

    // TITLES
    if (!ukraineIsInActiveState)
    {
      if (mouseY < height / 2)
      {
        noStroke();
        fill(255, 20, 1);
        textSize(descriptionSize);
        textAlign(CENTER, CENTER);
        text("Caesium-137 Werte in BQ/M3", width / 2, height / 15)
        textAlign(LEFT, CENTER);
      }

      if (mouseY > radiationPosY && mouseX > width / 3.3)
      {
        // noStroke();
        stroke('black');
        fill(0, 100, 2552);
        textSize(descriptionSize);
        textAlign(CENTER, CENTER);
        text("Faelle von Schilddruesenkrebs pro 100.000 Menschen", width / 2, height / 15);
      }
    }

    if (ukraineIsInActiveState)
    {
      noStroke();
      fill(255, 20, 1);
      textSize(descriptionSize);
      textAlign(CENTER, CENTER);
      text("Strahlungswerte der Chernobyl Meteorological Station", width / 2, height / 15);
    }

    // UKRAINE
    textAlign(LEFT, CENTER);
    ukraines.forEach(ukraine => 
    {
      ukraine.display();

      ukraines.forEach(ukraine =>
      {
        if (ukraineHovered) 
        {
          ukraine.displayHovered();
        }
      })
      if (ukraineIsInActiveState)
      {
        ukraine.displayClicked();
      }
    });

    // RADIATIONS
    if (!ukraineIsInActiveState)
    {
      radiations.forEach(radiation =>
      {
        radiation.display();
      })
    }

    //HELPERS
    if (!ukraineIsInActiveState)
    {
      helpers.forEach(helper =>
      {
        helper.display();
      })
      if (helperHovered)
      {
        helpers.forEach(helper =>
        {
          helper.displayHovered();
        })
      }
    }

    // RATES
    if (!ukraineIsInActiveState)
    {
      rates.forEach(rate =>
      {
        rate.display();
      })
    }
  }

  helperHovered = false;
  ukraineHovered = false;
  // save("mySVG.svg"); // give file name
  // print("saved svg");
  // noLoop(); // we just want to export once
}

function mouseClicked()
{
  let ukraineIsClicked = false;

  // Then handle click event for each quad
  ukraines.forEach(ukraine =>
  {
    if (ukraine.mouseClicked())
    {
      ukraineIsClicked = true;
    }
  });

  if (ukraineIsInActiveState)
  {
    ukraineIsInActiveState = false;
  } else if (!ukraineIsInActiveState && ukraineIsClicked)
  {
    ukraineIsInActiveState = true;
  }

  inactivity = false;

  clearTimeout(timeoutID);

  startTimer();
}

function mouseMoved()
{

  if (!inactivity)
  {
    clearTimeout(timeoutID);

    startTimer();
  }
}


function startTimer()
{
  timeoutID = window.setTimeout(goInactive, 60000);
}

// INACTIVITY TOGGLE
function goInactive()
{
  inactivity = true;
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}

function minMax() 
{
  let globalMin = Number.MAX_VALUE;
  let globalMax = Number.MIN_VALUE;
  let countryMinMax = {};

  for (let i = 0; i < cs137.getRowCount(); i++) 
  {
    const country = cs137.get(i, 'Country');
    const value = parseFloat(cs137.get(i, 'Average Value'));

    if (country !== 'Germany' && !isNaN(value)) 
    {
      if (!countryMinMax[country])
      {
        countryMinMax[country] = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
      }

      if (value < countryMinMax[country].min)
      {
        countryMinMax[country].min = value;
      }

      if (value > countryMinMax[country].max)
      {
        countryMinMax[country].max = value;
      }

      if (value < globalMin)
      {
        globalMin = value;
      }

      if (value > globalMax)
      {
        globalMax = value;
      }
    }
  }

  for (let country in countryMinMax) 
  {
    countryMinMax[country].min = countryMinMax[country].min.toFixed(5);
    countryMinMax[country].max = countryMinMax[country].max.toFixed(5);
  }

  globalMin = globalMin.toFixed(5);
  globalMax = globalMax.toFixed(5);

  // console.log('Country Minimum and Maximum Values:');
  // console.log(countryMinMax);
  console.log('Global Minimum and Maximum Values:');
  console.log('Min:', globalMin);
  console.log('Max:', globalMax);
}

function helperObjects()
{
  for (let i = 0; i < helperValue.getRowCount(); i++)
  {
    let year = helperValue.get(i, 'Year');
    let value = helperValue.get(i, 'helpers');

    helpers.push(new Helper(year, value, marginX, radiationPosY, valueSize, descriptionSize, lineSpace));
  }
}

function radiationsPush()
{
  for (let i = 0; i < cs137.getRowCount(); i++)
  {
    let year = cs137.get(i, 'Year');
    let country = cs137.get(i, 'Country');
    let unit = cs137.get(i, 'Unit');
    let value = cs137.getNum(i, 'Average Value');
    let previousRow = cs137.getRow(i - 1);

    if (previousRow)
    {
      let previousYear = previousRow.getNum('Year');
      let previousValue = previousRow.getNum('Average Value');
      let previousCountry = previousRow.get('Country');
      let previousUnit = previousRow.get('Unit');
      radiations.push(new Radiation(year, country, unit, value, previousYear, previousValue, previousCountry, previousUnit, marginX, radiationPosY, valueSize, lineSpace));
    }

    else
    {
      radiations.push(new Radiation(year, country, unit, value, 0, 0, 0, 0, marginX, radiationPosY, valueSize, lineSpace));
    }
  }
}

function ukrainePush() 
{
  for (let i = 0; i < ukraine.getRowCount(); i++)
  {
    let year = ukraine.get(i, 'year');
    let microRoentgenPerHour = ukraine.get(i, 'power of the exposure dose of gamma radiation at a height of 1 m from the earths surface_µR/hour');
    let betaM3 = ukraine.get(i, 'volumetric activity_total beta activity');
    let cs137M3 = ukraine.get(i, 'volumetric activity_radionuclide caesium-137');
    let str90M3 = ukraine.get(i, 'volumetric activity_radionuclide strontium-90');
    let betaM2 = ukraine.get(i, 'density of atmospheric fallout_total beta activity_Bk/m2 per day');
    let cs137M2 = ukraine.get(i, 'density of atmospheric fallout_caesium-137_Bk/m2 per month');
    let str90M2 = ukraine.get(i, 'density of atmospheric fallout_total beta activity_radionuclide strontium-90');
    let previousRow = ukraine.getRow(i - 1);
    if (previousRow)
    {
      let previousYear = previousRow.get('year');
      let previousMicroRoentgenPerHour = previousRow.get('power of the exposure dose of gamma radiation at a height of 1 m from the earths surface_µR/hour');
      let previousBetaM3 = previousRow.get('volumetric activity_total beta activity');
      let previousCs137M3 = previousRow.get('volumetric activity_radionuclide caesium-137');
      let previousStr90M3 = previousRow.get('volumetric activity_radionuclide strontium-90');
      let previousBetaM2 = previousRow.get('density of atmospheric fallout_total beta activity_Bk/m2 per day');
      let previousCs137M2 = previousRow.get('density of atmospheric fallout_caesium-137_Bk/m2 per month');
      let previousStr90M2 = previousRow.get('density of atmospheric fallout_total beta activity_radionuclide strontium-90');

      ukraines.push(new Ukraine(
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
        marginX,
        radiationPosY,
        valueSize,
        lineSpace,

      ));
    }
    else
    {
      ukraines.push(new Ukraine(
        year,
        microRoentgenPerHour,
        betaM3,
        cs137M3,
        str90M3,
        betaM2,
        cs137M2,
        str90M2,
        0, 0, 0, 0, 0, 0, 0, 0,
        marginX,
        radiationPosY,
        valueSize,
        lineSpace
      ));
    }
  }
}

function rateCalc()
{
  let rowCount = thyroid.getRowCount();

  let newTable = {};

  for (let i = 0; i < rowCount; i++)
  {
    let year = thyroid.get(i, 'Year');
    let country = thyroid.get(i, 'Country label');
    let sex = thyroid.get(i, 'Sex');

    if (country == "Belarus") 
    {
      country = 1;
    }
    else if (country == "Latvia") 
    {
      country = 3;
    }
    else if (country == "Lithuania") 
    {
      country = 2;
    }

    if (!newTable[country])
    {
      newTable[country] = {};
    }

    if (!newTable[country][year])
    {
      newTable[country][year] = {
        sum: 0
      };
    }
    newTable[country][year].sum += total = thyroid.getNum(i, 'Total');
  }

  for (let country in newTable)
  {
    for (let year in newTable[country])
    {
      let sum = newTable[country][year].sum;
      let previousSum = 0;
      let previousYear = 0;
      let previousCountry = 0;

      if (rates.at(-1) != undefined)
      {
        previousSum = rates.at(-1).value;
        previousYear = rates.at(-1).year;
        previousCountry = rates.at(-1).country;
      }
      rates.push(new Rate(year, country, sum, marginX, ratesPosY, previousSum, previousYear, previousCountry, radiationPosY, valueSize, lineSpace));
      lines.push(new Line(year, marginX));
    }
  }
}

