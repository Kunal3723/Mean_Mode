import React, { useEffect, useState } from 'react'
import "../styles/dashboard.css";
function Dashboard() {
    //intialising array of numbers with numbers stored in local storage
    const initial = localStorage.getItem("numbers") !== null ? JSON.parse(localStorage.getItem("numbers")) : [];
    // num---> number we are going to add
    const [num, setnum] = useState(null);
    //array of numbers
    const [arr, setarray] = useState(initial);

    //intialising mean,median,mode,sd
    const initial2 = {
        mean: 0,
        mode: 0,
        median: 0,
        sd: 0
    }
    //values---> object containing mean,median,mode,sd
    const [values, setValues] = useState(initial2);

    function handleClick(e) {
        // setting num
        setnum(e.target.value);

    }
    useEffect(() => {

        if (num !== null)
            localStorage.setItem("numbers", JSON.stringify(arr));
        setnum(null);
        Calc_();
        document.getElementById("new").value = '';

    }, [arr])

    function handleSubmit() {
        //pushing num into array
        setarray(arr => [...arr, num]);
    }

    function Calc_() {
        let n = arr.length;

        let map = {}; //frequency map
        let sum = 0, sq_sum = 0;

        let sorted = [];//array that contain sorted numbers

        // loop to find frequency of numbers, sum of numbers, and sum of squares of numbers
        for (let i = 0; i < n; i++) {
            sum += parseFloat(arr[i]);
            sq_sum += parseFloat(arr[i]) * parseFloat(arr[i]);

            if (map[arr[i]]) {
                map[arr[i]]++;
            } else {
                map[arr[i]] = 1;
            }

            sorted.push(Number(arr[i]))// pushing numbers after converting from string to Number into sorted
        }

        let mean = sum / n;//finding mean
        mean = parseFloat(mean).toFixed(3);

        let max = -1;
        let mode = [];
        // these two loops will find mode
        for (let item in map) {

            if (parseFloat(map[item]) > max) {
                max = map[item];
            }
        }
        for (let item in map) {

            if (map[item] === max) {
                mode.push(item);
            }
        }


        let sd = parseFloat(Math.sqrt(sq_sum / n - mean * mean)).toFixed(3); //finding standard deviation

        let median;
        //code to find median
        sorted.sort(function (a, b) { return a - b });

        if (n % 2 === 0) {

            median = (parseFloat(sorted[parseInt(n / 2)]) + parseFloat(sorted[parseInt((n) / 2) - 1])) / 2.0;
        }
        else {
            median = parseFloat(sorted[parseInt(n / 2)]);
        }


        //finally setting values of all 4 things
        setValues({ mean, median, mode, sd });
    }
    return (
        <div id="container">
            <div id="tiles">
                <div id="mean">
                    <div id="title"><b>MEAN</b></div>
                    <div id="value">{values.mean}</div>
                </div>
                <div id="median"><div id="title"><b>MEDIAN</b></div>
                    <div id="value">{values.median}</div></div>
                <div id="mode"><div id="title"><b>MODE</b></div>
                    <div id="value">{values.mode.length &&
                        values.mode.map(function (item) {
                            return (<span>{item} &nbsp; </span>)
                        })}</div></div>
                <div id="sd"><div id="title"><b>STANDARD DEVIATION</b></div>
                    <div id="value">{values.sd}</div></div>
            </div>
            <div id="input">
                <div id="box"><input id="new" type="text" onChange={function (e) { handleClick(e) }} />
                    <button onClick={function () { handleSubmit() }}>Add</button></div>
            </div>

            <div id="display">{
                arr.length &&
                arr.map(function (item) {
                    return (<span>{item} ,</span>)
                })
            }</div>
        </div>
    )
}

export default Dashboard