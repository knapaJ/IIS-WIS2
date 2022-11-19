import './Popup.css';

type Props = {
    triggered:any
    setTrigger:any
    children?: JSX.Element | JSX.Element[];
}

const onPopupEvent = (event:any) => {
    var blurables = document.getElementsByClassName('blurable');
    for (var i = 0; i < blurables.length; i++) {
        var blurable = blurables[i];
        blurable.classList.toggle('blur');
    }
}

function Popup({triggered, setTrigger, children}:Props) {
    console.log(triggered);
    return (triggered) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="popup-close-btn" onClick={(event) => {setTrigger(false); onPopupEvent(event)}}>Close</button>
                {children}
            </div>
        </div>
    ) : ( <></>);
}

export {Popup, onPopupEvent};