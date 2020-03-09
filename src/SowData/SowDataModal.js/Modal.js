import React, {useContext,useRef} from 'react'
import styles from "./Modal.module.css";
import { SowInfoContext } from '../../providers/SowProvider';

function Modal(props) {
    
    const [sowInfo,setSowInfo] = useContext(SowInfoContext);
    const actionOptions = ["levering", "parallel pressing", "head to head knock", "Anal Genital nosing", "nose to body"];


    let perfID = useRef("");
    let recID = useRef("");
    let timePerf = useRef("");

    
    if(props.index > -1){

    }
    const returnDefaultObject = () =>{
        if(props.index >-1){
            return sowInfo.data[props.index]
        }
        return {p: "",r: "", t:"", a: "levering"}
        
    }

    let action =returnDefaultObject().a; 

    const AddSowInfo = (type) => {
        let newList= sowInfo.data;

        if(props.index > -1){
            newList[props.index]= {
                p: perfID.current.value,
                r:recID.current.value,
                t:timePerf.current.value,
                a:action
            }
        }
        else{
            newList.push({
                p: perfID.current.value,
                r:recID.current.value,
                t:timePerf.current.value,
                a:action
            })
        }
        setSowInfo({...sowInfo,data:newList})
        props.modalClose({type: "next"});
    }

    const DeleteSowInfo = () => {
        if (props.index !== -1) {
            let newList= sowInfo.data;
            newList.splice(props.index,1);
            setSowInfo({...sowInfo,data:newList});
        }
        props.modalClose({type: "next"});
    }

    const handleSelect = (value)=>{
        action = value.target.value;
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.firstDiv}>
                <label>enter time that the action was performed
                </label>
                <input type="text" defaultValue={returnDefaultObject().t} ref={timePerf}></input>
            </div>
            <div>
                <label>enter performer ID
                </label>
                <input type="text" defaultValue={returnDefaultObject().p} ref={perfID}></input>
            </div>
            <div>
                <label>enter reciever ID
                </label>
                <input type="text" defaultValue={returnDefaultObject().r} ref={recID}></input>
            </div>   
            <div>
                <label>select Action Performed
                </label>
                <select defaultValue={returnDefaultObject().a} onChange={handleSelect}>
                    {actionOptions.map((value)=>(
                        <option value={value} >{value}</option>
                    ))}
                </select>
            </div>
            <div className={styles.lastDiv}>
                <button onClick={e => AddSowInfo(e)}>add that boi</button>
                <button onClick={e => props.modalClose({type: "next"})}>Cancel that boi</button>
                <button onClick={e => DeleteSowInfo({type: "next"})}>delete that boi</button>
            </div>   
        </div>
    )
}

export default Modal
