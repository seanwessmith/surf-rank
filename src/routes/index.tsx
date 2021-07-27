import {
  Switch,
  Route,
  Router,
} from 'react-router-dom';
import LandingPage from '../containers/landing-page';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const StarterRouter = () => {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
      </Switch>
    </Router>
  );
};

export default StarterRouter;
