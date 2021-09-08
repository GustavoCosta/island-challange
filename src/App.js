import './App.css';
import { ResponsiveLine } from '@nivo/line'
import data from './dataviz/data';

function App() {
  let islands = CalculateIslands();

  return (
    <div className="App" style={{height: 400}}>
      <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'transportation',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'count',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          pointSize={3}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
      />
      <div>
        Islands:
          {islands.map((island, index) => 
            <div key={index}>
              Island { index } :
                From { JSON.stringify(ArrayMin(island)) } To { JSON.stringify(ArrayMax(island)) } Nodes: ({ island.length })
            </div>
          )}
      </div>
    </div>
  );
}

function CalculateIslands() {
  let dataInfo = data[0].data;
  let workData = [];
  let islands = [];
  
  let threshold = 0;
  let islandDistance = dataInfo.length * 0.05;
  console.log("islandDistance:", islandDistance);

  // Mounting workData
  for (let x = 0; x < dataInfo.length; x++) {
    const node = dataInfo[x];

    if (node.y >= threshold) {
      workData.push(node);
    }    
  }

  // Sort by maximum values (Y axis)
  let sortedByY = SortByY(workData);
    
  for (let x = 0; x < sortedByY.length; x++) {
    const node = sortedByY[x];
    
    if (islands.length === 0) {
      islands[islands.length] = [node];
      continue;
    }

    let found;
    for (let y = 0; y < islands.length; y++) {
      const island = islands[y];

      found = island.find(n => Math.abs(n.x - node.x) <= islandDistance);
      if (found) {
        // console.log(node, found, found.x - node.x);
        islands[y].push(node);
        break;
      }
    }

    // console.log(found);
    if (!found) {
      // console.log("Not Found", found);
      islands[islands.length] = [node];
    }
  }
  
  console.log(workData);
  console.log(islands);

  return islands;
}

function SortByY(data){
  return data.sort((a, b) => (a.y < b.y) ? 1 : -1);
}

function ArrayMin(arr) {
  return arr.reduce(function (p, v) {
    return ( p.x < v.x ? p : v );
  });
}

function ArrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p.x > v.x ? p : v );
  });
}

export default App;
