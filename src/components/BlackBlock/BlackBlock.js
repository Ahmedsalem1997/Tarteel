const BlackBlock = (props) => {
    // const styleWidth = props.width && `width: $props.width`;
    return (
        <div style={{ width: props.width ? props.width : '530px' }} className="black-block">
            {
                props.showClose && <div className="close-btn" onClick={ props.onClose }>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            }
            {props.children}
        </div>
    )
}

export default BlackBlock;