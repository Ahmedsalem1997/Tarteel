const BlackBlock = (props) => {
    return (
        <div style={{ width: props.width || '530px' }} className="black-block">
            {props.children}
        </div>
    )
}

export default BlackBlock;