const data = [
  {
    "id": "Coordinates",
    "color": "hsl(78, 70%, 50%)",
    "data": 
    [
    ]
  }
]

function GenerateData() {  
  let goesUp = 1;
  let pointsToMove = 5;
  let force = 1;
  let y = 0;

  for (let x = 0; x < 100; x++) {
    if (pointsToMove === 0) {
      goesUp = getRandomInt(0, 2);
      pointsToMove = getRandomInt(1, 6);      
    }

    force = getRandomInt(1, 6);

    y += goesUp ? force : -force;
    pointsToMove -= 1;

    data[0].data.push({"x": x, "y": y});
  }

  return data;
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default GenerateData();