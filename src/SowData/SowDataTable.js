import React, { useContext, useState } from 'react'
import { SowInfoContext, SowProvider } from '../providers/SowProvider'
import styles from "./sowDataTable.module.css"
import Modal from './SowDataModal.js/Modal'

const SowDataTable = () => {

    const [sowInfo, setSowInfo] = useContext(SowInfoContext);

    const [state, setState] = useState({
        ShowModal: false,
        action: "add",
        index: -1,
    })

    const toggleModal = (action) => {
        if (action.type === "add") {
            setState({
                ShowModal: true,
                action: "add",
                index: -1
            });
        }
        else if (action.type === "update") {
            setState({
                ShowModal: true,
                action: "update",
                index: action.changeIndex
            });
        }
        else {
            setState({
                ShowModal: false,
                index: -1
            })
        }
    }

    const getdataString = () => {
        let string = "performer ID, Reciever ID, Action Performed,time Performed\n"
        sowInfo.data.forEach(value => {
            string += value.p + "," + value.r + "," + value.a + "," + value.t + "\n";
        });
        console.log(string);
        return string;
    }

    const downloadCSV = () => {
        const element = document.createElement("a");
        const file = new Blob([getdataString()], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `BN-${sowInfo.BatchNumber} PA-${sowInfo.Parity} TS-${sowInfo.TimeStarted} TE-${sowInfo.TimeEnded}.csv`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    const headers = ["performer ID", "Reciever ID", "Action Performed", "time Performed"];

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((value) => (
                            <th>{value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sowInfo.data.map((val, index) => (
                        <tr className={styles.entries} onClick={e => toggleModal({ type: "update", changeIndex: index })}>
                            <td>{val.p}</td>
                            <td>{val.r}</td>
                            <td>{val.a}</td>
                            <td>{val.t}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
                <button onClick={e => toggleModal({ type: "add" })}>add entry</button>
                <button onClick={e => downloadCSV()}>Export to CSV</button>
            </div>

            <Modal show={state.ShowModal} modalClose={toggleModal} index={state.index}>
            </Modal>


        </div>
    )
}

export default SowDataTable
