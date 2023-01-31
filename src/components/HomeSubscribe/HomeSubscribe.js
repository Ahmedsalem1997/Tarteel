const HomeSubscribe = () => {
    return (
        <div className="home-subscribe">
            <p className="home-subscribe-text">ادخل رقم جوالك للاشتراك</p>
            <div className="home-subscribe-input-group">
                <input className="home-subscribe-input" type="email" />
                <button className="home-subscribe-send-btn">ارسل</button>
            </div>
        </div>
    )
}

export default HomeSubscribe;