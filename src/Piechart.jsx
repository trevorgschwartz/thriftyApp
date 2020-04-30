import React from "react";
import DrilldownPie from './DrilldownPie.js'
import * as d3 from "d3";
import faker from 'faker';

function generateData(level) {
    const N = d3.randomUniform(1, 10)();
    return d3.range(N).map(i => ({
        value: Math.abs(d3.randomNormal()()),
        id: `${level}-${i}`,
        index: i,
        name: faker.internet.userName(),
        children: level > 0 ? generateData(level - 1) : []
    }));
}

function Piechart() {
    const data = generateData(4)
    console.log(data);
    
    
    return (
        <div>
            <svg width="500" height="500">
                <DrilldownPie data={data}  x={250} y={250}/>
            </svg>
        </div>
    )
}

export default Piechart;