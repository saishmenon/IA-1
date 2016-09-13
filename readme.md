## Synopsis

This is a project to visualize live data. It can visualize live data as well as static data in the form of a bar chart.

## Code Example

visualChart.transition()
        .attr('height', function(d){
                return yScale(d)
            })
        .attr('y', function(d){
                return height - yScale(d);
            })
        .delay(function(d,i){
            return i * 10;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)

## Motivation

The project was made to learn how to turn realtime raw data and represent it visually to make it more understandable to the users. The code was tried with a randomly generated static array,  data from a tsv file, and data from a json file. Live data stream from pubnub doesn't work as of yet.

## Installation

Open the "index.html" file in any browser and you should be good.

## API Reference

Pubnub API - https://www.pubnub.com/developers/realtime-data-streams/sensor-network/
Framework used : Data Driven Document - https://d3js.org/

## Contributors/References

Lynda.com - Lynda.com - https://www.lynda.com/D3js-tutorials

## License

RIT Licence
