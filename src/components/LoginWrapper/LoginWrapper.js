import BlackBlock from "../BlackBlock/BlackBlock";

const LoginWrapper = (props) => {
    return (
        <div className="login-wrapper">
            <BlackBlock>
                {props.children}
            </BlackBlock>
        </div>
    )
}

export default LoginWrapper;