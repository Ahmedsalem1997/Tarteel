import Translate from '../../helpers/Translate/Translate';
const HomeSubscribe = () => {
    return (
        <div className="home-subscribe">
            <p className="home-subscribe-text"><Translate id="subscribeSection.title"/></p>
            <div className="home-subscribe-input-group">
                <input className="home-subscribe-input" type="email" />
                <button className="home-subscribe-send-btn"><Translate id="button.send"/></button>
            </div>
        </div>
    )
}

export default HomeSubscribe;