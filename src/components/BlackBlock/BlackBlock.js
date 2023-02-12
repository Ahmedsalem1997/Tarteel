const BlackBlock = (props) => {
    // const styleWidth = props.width && `width: $props.width`;
    return (
        <div style={{width: props.width ? props.width: '450px'}} className="black-block">
            {props.children}
        </div>
    )
}

export default BlackBlock;