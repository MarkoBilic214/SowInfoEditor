import React, { useContext } from 'react';
import styles from "./sow.module.css";
import { SowInfoContext } from '../providers/SowProvider';

const SowFileInfo = () => {


    const [SowInfo, setSowInfo] = useContext(SowInfoContext);


    const setBatchNumber = Bnum => {
        setSowInfo({ ...SowInfo, BatchNumber: Bnum.target.value, });
    }

    const setTimeStarted = Bnum => {
        setSowInfo({ ...SowInfo, TimeStarted: Bnum.target.value, });
    }

    const setTimeEnded = Bnum => {
        setSowInfo({ ...SowInfo, TimeEnded: Bnum.target.value, });
    }

    const setParity = Bnum => {
        setSowInfo({ ...SowInfo, Parity: Bnum.target.value, });
    }

    const fileHandler = file => {
        let reader = new FileReader();

        reader.onload = () => {
            loadStateFromFile(file.name, reader.result);

        };

        reader.onerror = function () {
            console.log(reader.error);
        };

        reader.readAsText(file);
    }

    const loadStateFromFile = (fileName, fileContents) => {
        let splitFileName = fileName.slice(0, -4).split(" ");
        let batchNum = splitFileName[0].split("-")[1];
        let parity = splitFileName[1].split("-")[1];
        let timeStarted = splitFileName[2].split("-")[1];
        let timeEnded = splitFileName[3].split("-")[1];

        setSowInfo({
            BatchNumber: batchNum,
            TimeStarted: timeStarted,
            TimeEnded: timeEnded,
            Parity: parity,
            data: readFileContents(fileContents)
        })
    }

    const readFileContents = (fileContents) => {
        let data = [];
        fileContents.split("\n").slice(1, -1).forEach(element => {
            let splitElement = element.split(",");
            data.push({ p: splitElement[0], r: splitElement[1], t: splitElement[3], a: splitElement[2] });
        });
        return data;
    }


    return (
        <div>
            <h2>Please Enter Sow file info</h2>
            <div className={styles.sowHeadContainer}>
                <div>
                    <div>
                        Batch number
                </div>
                    <input type="text" defaultValue={SowInfo.BatchNumber} onChange={setBatchNumber}></input>
                </div>
                <div>
                    <div>
                        Parity
                </div>
                    <input type="text" defaultValue={SowInfo.Parity} onChange={setParity}></input>
                </div>
                <div>
                    <div>
                        Time Started
                    </div>
                    <input type="text" defaultValue={SowInfo.TimeStarted} onChange={setTimeStarted}></input>
                </div>
                <div>
                    <div>
                        Time Ended
                </div>
                    <input type="text" defaultValue={SowInfo.TimeEnded} onChange={setTimeEnded}></input>
                </div>
                <div>
                    <div>
                        insert Previous File
                </div>
                    <input type="file" onChange={e => fileHandler(e.target.files[0])}></input>
                </div>
            </div>
        </div>
    );
}

export default SowFileInfo;
