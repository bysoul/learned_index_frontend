import {useRef} from "react";
import { LineChart, LineChartProps } from '@opd/g2plot-react';
import { DataSet } from '@antv/data-set';
import * as covid from './data/covid.js'
import * as libio from './data/libio.js'
import * as genome from './data/genome.js'
import * as osm from './data/osm.js'
import * as wtx00 from './data/1tx00.js'


function Wo(){


    const getCSV=(data)=>{
        const dv = new DataSet.DataView().source(data, {
            type: 'csv',
        });
        dv.transform({
            type: 'map',
            callback(row) {
                row.throughput = parseInt(row.throughput);
                return row;
            },
        });
        console.log(dv.rows);
        return dv.rows;
    }

    const cusConfig: LineChartProps = {
        padding: "auto",
        autoFit: true,
        xField: 'thread_num',
        yField: 'throughput',
        legend: {
            position: "right"
        },
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        tooltip: {
            title: (title)=>title+' threads',
            showCrosshairs: true,
            customItems:(items)=>{
                items.sort((a,b)=>{
                    return -a.data.throughput+b.data.throughput;
                })
                return items.map((i)=>{
                    i.value=i.value.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)+"| memory: "+i.data.memory_consumption;
                    return i;
                })
            }
        },
        seriesField: 'index_type',
        color:['#76cdd3','#00a854','#c17500','#919191','#f56a00','#6252cd','#6252cd'],
    }

    const chartRef = useRef()
    return (
        <section>
            <h1>COVID</h1>
            <h2>READ:WRITE=80:20</h2>
            <LineChart {...cusConfig} data={getCSV(covid.rw8020)} chartRef={chartRef}/>
            <h2>READ:WRITE=50:50</h2>
            <LineChart {...cusConfig} data={getCSV(covid.rw5050)} chartRef={chartRef}/>
            <h2>WRITE ONLY</h2>
            <LineChart {...cusConfig} data={getCSV(covid.wo)} chartRef={chartRef}/>
            <h1>LIBIO</h1>
            <h2>READ ONLY</h2>
            <LineChart {...cusConfig} data={getCSV(libio.ro)} chartRef={chartRef}/>
            <h2>READ:WRITE=80:20</h2>
            <LineChart {...cusConfig} data={getCSV(libio.rw8020)} chartRef={chartRef}/>
            <h2>READ:WRITE=50:50</h2>
            <LineChart {...cusConfig} data={getCSV(libio.rw5050)} chartRef={chartRef}/>
            <h2>WRITE ONLY</h2>
            <LineChart {...cusConfig} data={getCSV(libio.wo)} chartRef={chartRef}/>
            <h1>GENOME</h1>
            <h2>READ:WRITE=80:20</h2>
            <LineChart {...cusConfig} data={getCSV(genome.rw8020)} chartRef={chartRef}/>
            <h2>READ:WRITE=50:50</h2>
            <LineChart {...cusConfig} data={getCSV(genome.rw5050)} chartRef={chartRef}/>
            <h2>WRITE ONLY</h2>
            <LineChart {...cusConfig} data={getCSV(genome.wo)} chartRef={chartRef}/>
            <h1>OSM</h1>
            <h2>READ ONLY</h2>
            <LineChart {...cusConfig} data={getCSV(osm.ro)} chartRef={chartRef}/>
            <h2>READ:WRITE=80:20</h2>
            <LineChart {...cusConfig} data={getCSV(osm.rw8020)} chartRef={chartRef}/>
            <h2>READ:WRITE=50:50</h2>
            <LineChart {...cusConfig} data={getCSV(osm.rw5050)} chartRef={chartRef}/>
            <h2>WRITE ONLY</h2>
            <LineChart {...cusConfig} data={getCSV(osm.wo)} chartRef={chartRef}/>
            <h2>WRITE ONLY 1M TO 100M</h2>
            <LineChart {...cusConfig} data={getCSV(osm.w1t100)} chartRef={chartRef}/>
            <h2>COMPARE</h2>
            <LineChart {...cusConfig} data={getCSV(osm.comp)} chartRef={chartRef}/>
            <h2>COVID 1t200</h2>
            <LineChart {...cusConfig} data={getCSV(wtx00.covid1t200)} chartRef={chartRef}/>
            <h2>COVID 10t200</h2>
            <LineChart {...cusConfig} data={getCSV(wtx00.covid10t200)} chartRef={chartRef}/>
            <h2>COVID 50t200</h2>
            <LineChart {...cusConfig} data={getCSV(wtx00.covid50t200)} chartRef={chartRef}/>
            <h2>OSM 1t200</h2>
            <LineChart {...cusConfig} data={getCSV(wtx00.osm1t200)} chartRef={chartRef}/>
            <h2>OSM 10t200</h2>
            <LineChart {...cusConfig} data={getCSV(wtx00.osm10t200)} chartRef={chartRef}/>
            <h2>OSM 50t200</h2>
            <LineChart {...cusConfig} data={getCSV(wtx00.osm50t200)} chartRef={chartRef}/>
        </section>

    )
}

export default Wo;