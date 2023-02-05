import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import Translate from "../../helpers/Translate/Translate";

const NotFoundPage = () => {
  return (
    <LoginWrapper>
      <div className="page-not-found">
        <div className="page-not-found-content">
          <h2>404</h2>
          <h6><Translate id="notFound.title"/></h6>
          <p><Translate id="notFound.sorry"/></p>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default NotFoundPage;
