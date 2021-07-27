import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './containers/landing-page/index';
import { SurfProvider } from './store/surfContext';

import './index.scss';

function App(): JSX.Element {
  return (
    <div className='App'>
      <SurfProvider>
        <Router>
          <Switch>
            {/* <Route path='/view-pgn' component={ViewPgn} /> */}
            <Route path='/' component={LandingPage} />
          </Switch>
        </Router>
      </SurfProvider>
    </div>
  );
}

export default App;
